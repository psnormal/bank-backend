using System;
using System.Net.Http.Json;
using System.Security.Policy;
using System.Text;
using System.Text.Json.Serialization;
using Azure;
using credit_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace credit_service.Services
{
	public interface IUserCreditService
	{
        public Task<Credit> AddNewCredit(Guid creditRateId, Guid userId,  CreditTakingDto model);
        public Task<List<ShortCreditModel>> GetAllCredits(Guid userID);
        public Task<Credit> MakeRegularPayment(Guid creditId);
        public Task<Credit> MakeLastPayment(Guid creditId, decimal paymentAmount);
        public Task<Credit> CloseCredit(Guid creditId);
        public Task MakeAllRegularPayments();

    }

	public class UserCreditService: IUserCreditService
    {
        private Context _context;

        public UserCreditService(Context context)
        {
            _context = context;
        }

        public async Task<Credit> AddNewCredit(Guid creditRateId, Guid userId, CreditTakingDto model)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).SingleOrDefaultAsync();
            if (creditRate == null)
            {
                throw new Exception("Unable to create credit");
            }
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

            channel.QueueDeclare(queue: "accounts-operations",
                                durable: true,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

            var url = $"https://localhost:7139/api/account/create";
            using var client = new HttpClient();
            var account = new CreatingAccount(userId);
            JsonContent content = JsonContent.Create(account);
            var response = await client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var resultContent = await response.Content.ReadFromJsonAsync<AccountInfo>();

                Credit newCredit = new Credit(userId, creditRateId, resultContent.AccountNumber, creditRate.InterestRate, model);
                _context.Credit.Add(newCredit);

                await _context.SaveChangesAsync();
                var credit = await _context.Credit.Where(x => x.CreditId == newCredit.CreditId).SingleOrDefaultAsync();
                if (credit == null)
                {
                    throw new Exception("Unable to create credit");
                }

                var operation = new OperationInfo(credit.UserId, credit.AccountNum, credit.LoanAmount);
                var json = JsonConvert.SerializeObject(operation);
                var body = Encoding.UTF8.GetBytes(json);
                channel.BasicPublish(exchange: "",
                                     routingKey: "accounts-operations",
                                     basicProperties: null,
                                     body: body);

                return credit;
            }
            else
            {
                throw new Exception("Unable to create credit account");
            }

        }

        public async Task<List<ShortCreditModel>> GetAllCredits(Guid userID)
        {
            var credits = await _context.Credit.Where(x=> x.UserId == userID).ToListAsync();
            var creditsInfo = new List<ShortCreditModel>();
            for (int i = 0; i < credits.Count(); i++)
            {
                var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == credits[i].CreditRateId).FirstOrDefaultAsync();
                var creditInfo = new ShortCreditModel(credits[i], creditRate.Title, creditRate.InterestRate);
                creditsInfo.Add(creditInfo);
            }
            return creditsInfo;
        }

        public async Task MakeAllRegularPayments()
        {
            var credits = await _context.Credit.Where(x => x.Status == CreditStatus.notRepaid).ToListAsync();
            for(int i = 0; i < credits.Count; i++)
            {
                if (credits[i].Status == CreditStatus.notRepaid)
                {
                    await MakeRegularPayment(credits[i].CreditId);
                }

            }
        }

        public async Task<Credit> MakeRegularPayment(Guid creditId)
        {
            var credit = await _context.Credit.Where(x => x.CreditId == creditId).FirstOrDefaultAsync();
            CreditPayment creditPayment;
            var url1 = $"https://localhost:7139/api/account/{credit.AccountNum}?UserID={credit.UserId}";
            var url2 = "https://localhost:7139/api/operation/create";
            using var client = new HttpClient();
            //RabbitMQ connection 
            var factory = new ConnectionFactory { HostName = "localhost" };
            using var connection1 = factory.CreateConnection();
            using var channel = connection1.CreateModel();

            channel.QueueDeclare(queue: "accounts-operations",
                                durable: true,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);


            if (credit.NumOfOverduePayouts > 0)
            {

                for(int j = credit.NumOfOverduePayouts; j>0; j--)
                {
                    var overdueCreditPayment = new CreditPayment(credit);
                    //creditPayment.IsOverdue = true;
                    //снимаем деньги
                    //проверка того, что деньги снялись успешно
                    var response0 = await client.GetAsync(url1);
                    if (response0.IsSuccessStatusCode)
                    {
                        var resultContent = await response0.Content.ReadFromJsonAsync<AccountInfo>();
                        if (resultContent.Balance >= overdueCreditPayment.PayoutAmount)
                        {
                            var operation = new OperationInfo(credit.UserId, credit.AccountNum, -1*(overdueCreditPayment.PayoutAmount));
                            var json = JsonConvert.SerializeObject(operation);
                            var body = Encoding.UTF8.GetBytes(json);
                            channel.BasicPublish(exchange: "",
                                                 routingKey: "accounts-operations",
                                                 basicProperties: null,
                                                 body: body);
                            //JsonContent content = JsonContent.Create(operation);
                            //var response2 = await client.PostAsync(url2, content);
                            /*if (response2.IsSuccessStatusCode)
                            {*/
                                credit.LoanBalance = credit.LoanBalance - overdueCreditPayment.PayoutAmount;
                                overdueCreditPayment.IsOverdue = true;
                                overdueCreditPayment.IsSuccessful = true;
                                credit.NumOfOverduePayouts--;
                            /*}
                            else
                            {
                                overdueCreditPayment.IsSuccessful = false;
                            }*/
                            _context.CreditPayments.Add(overdueCreditPayment);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }

            if (credit.LoanBalance <= credit.PayoutAmount)
            {
                creditPayment = new CreditPayment(credit, credit.LoanBalance);
            }
            else
            {
                creditPayment = new CreditPayment(credit);
            }
            //операция через брокер
            /*var json = JsonConvert.SerializeObject(op);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange: "",
                                routingKey: "accounts-operations",
                                basicProperties: null,
                                body: body);*/
            var response = await client.GetAsync(url1);
            if (response.IsSuccessStatusCode)
            {
                var resultContent = await response.Content.ReadFromJsonAsync<AccountInfo>();
                if (resultContent.Balance >= creditPayment.PayoutAmount)
                {
                    var operation = new OperationInfo(credit.UserId, credit.AccountNum, -1*(creditPayment.PayoutAmount));
                    var json = JsonConvert.SerializeObject(operation);
                    var body = Encoding.UTF8.GetBytes(json);
                    channel.BasicPublish(exchange: "",
                                         routingKey: "accounts-operations",
                                         basicProperties: null,
                                         body: body);
                    //JsonContent content = JsonContent.Create(operation);
                    //var response2 = await client.PostAsync(url2, content);


                    /*if (response2.IsSuccessStatusCode)
                    {*/
                        credit.LoanBalance = credit.LoanBalance - creditPayment.PayoutAmount;
                        creditPayment.IsOverdue = false;
                        creditPayment.IsSuccessful = true;


                    /*}
                    else
                    {
                        creditPayment.IsSuccessful = false;
                        credit.NumOfOverduePayouts++;
                    }*/

                }
                else
                {
                    creditPayment.IsSuccessful = false;
                    credit.NumOfOverduePayouts++;
                }
            }
            else
            {
                throw new Exception("Unable to create credit account");
            }

            if (credit.LoanBalance <= 0)
            {
                credit.Status = CreditStatus.repaid;
                creditPayment.IsLast = true;
            }
            _context.CreditPayments.Add(creditPayment);
            await _context.SaveChangesAsync();
            return credit;
        }

        public async Task<Credit> MakeLastPayment(Guid creditId, decimal paymentAmount)
        {
            var credit = await _context.Credit.Where(x => x.CreditId == creditId).FirstOrDefaultAsync();
            if (credit == null)
            {
                throw new Exception("Unable to make last payment");
            }
            if (credit.LoanBalance != paymentAmount)
            {
                throw new Exception("Unable to make last payment, because amount of the payment does not cover the debt");
            }
            credit.LoanBalance = 0;
            await _context.SaveChangesAsync();
            return credit;
        }

        public async Task<Credit> CloseCredit(Guid creditId)
        {
            var credit = await _context.Credit.Where(x => x.CreditId == creditId).FirstOrDefaultAsync();
            if (credit == null)
            {
                throw new Exception("Unable to make last payment");
            }
            if (credit.LoanBalance != 0)
            {
                throw new Exception("Unable to make last payment, because there is a debt left");
            }
            credit.Status = CreditStatus.repaid;
            await _context.SaveChangesAsync();
            return credit;
        }
    }
}

