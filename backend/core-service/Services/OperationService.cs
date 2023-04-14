using core_service.DTO;
using core_service.Models;
using System.ComponentModel.DataAnnotations;

namespace core_service.Services
{
    public class OperationService : IOperationService
    {
        private readonly ApplicationDbContext _context;

        public OperationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateOperation(CreateOperationDTO model)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == model.UserID && x.AccountNumber == model.AccountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            if (infoAccount.State == AccountState.Closed)
            {
                throw new ValidationException("This account is closed");
            }

            if ((infoAccount.Balance + model.TransactionAmount) < 0)
            {
                throw new ValidationException("Not enough money");
            }

            var newModel = new Operation
            {
                AccountNumber = model.AccountNumber,
                DateTime = model.DateTime,
                TransactionAmount = model.TransactionAmount,
                TransactionFee = 0
            };
            await _context.Operations.AddAsync(newModel);
            await _context.SaveChangesAsync();

            await ChangeBalance(model);
        }

        private async Task ChangeBalance(CreateOperationDTO model)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == model.UserID && x.AccountNumber == model.AccountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            infoAccount.Balance += model.TransactionAmount;
            await _context.SaveChangesAsync();
        }

        public async Task<Guid> CreateTransaction(CreateTransactionDto model)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == model.UserID && x.AccountNumber == model.SenderAccountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            if (infoAccount.State == AccountState.Closed)
            {
                throw new ValidationException("This account is closed");
            }

            if (model.TransactionAmount < 0)
            {
                throw new ValidationException("Incorrect operation");
            }

            if ((infoAccount.Balance - model.TransactionAmount) < 0)
            {
                throw new ValidationException("Not enough money");
            }

            var infoRecipient = _context.Accounts.FirstOrDefault(x => x.AccountNumber == model.RecipientAccountNumber);

            if (infoRecipient == null)
            {
                throw new ValidationException("Recipient account does not exist");
            }

            var transactionForSender = new Operation
            {
                AccountNumber = model.SenderAccountNumber,
                RecipientAccountNumber = model.RecipientAccountNumber,
                DateTime = model.DateTime,
                TransactionAmount = -1 * model.TransactionAmount,
                TransactionFee = 0
            };
            await _context.Operations.AddAsync(transactionForSender);
            await _context.SaveChangesAsync();

            await ChangeBalance(new CreateOperationDTO
            {
                UserID = model.UserID,
                AccountNumber = model.SenderAccountNumber,
                DateTime = model.DateTime,
                TransactionAmount = -1 * model.TransactionAmount
            });

            var transactionForRecipient = new Operation
            {
                AccountNumber = model.RecipientAccountNumber,
                SenderAccountNumber = model.SenderAccountNumber,
                DateTime = model.DateTime,
                TransactionAmount = model.TransactionAmount,
                TransactionFee = 0
            };
            await _context.Operations.AddAsync(transactionForRecipient);
            await _context.SaveChangesAsync();

            await ChangeBalance(new CreateOperationDTO
            {
                UserID = infoRecipient.UserID,
                AccountNumber = model.RecipientAccountNumber,
                DateTime = model.DateTime,
                TransactionAmount = model.TransactionAmount
            });

            return infoRecipient.UserID;
        }

        public InfoOperationsDTO GetOperations(Guid UserID, int accountNumber)
        {
            //int pageSize = 5;
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == UserID && x.AccountNumber == accountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            List<Operation> operations = _context.Operations.Where(x => x.AccountNumber == accountNumber).ToList();

            /*var count = operations.Count() / pageSize;
            if (operations.Count() % pageSize != 0) count++;
            if (page > count)
            {
                throw new ValidationException("This page does not exist");
            }

            var someOperations = operations.Skip((page - 1) * pageSize).Take(pageSize).ToList();*/

            List<InfoOperationDTO> infoOperations = new List<InfoOperationDTO>();
            foreach (Operation operation in operations)
            {
                InfoOperationDTO currentOperation = new InfoOperationDTO(operation);
                infoOperations.Add(currentOperation);
            }

            return new InfoOperationsDTO
            {
                /*PageInfo = new PageInfoDTO
                {
                    PageSize = pageSize,
                    PageCount = count,
                    CurrentPage = page
                },*/
                Operations = infoOperations
            };
        }
    }
}
