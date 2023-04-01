using System;
using System.Text.Json.Serialization;
using Azure;
using credit_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace credit_service.Services
{
	public interface IUserCreditService
	{
        public Task<Credit> AddNewCredit(Guid creditRateId, Guid userId, int accountNum, CreditTakingDto model);
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

        public async Task<Credit> AddNewCredit(Guid creditRateId, Guid userId, int accountNum, CreditTakingDto model)
        {
            var creditRate = await _context.CreditRates.Where(x => x.CreditRateId == creditRateId).SingleOrDefaultAsync();
            if (creditRate == null)
            {
                throw new Exception("Unable to create credit");
            }
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
            var creditPayment = new CreditPayment(credit);
            credit.LoanBalance -= credit.PayoutAmount;
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

