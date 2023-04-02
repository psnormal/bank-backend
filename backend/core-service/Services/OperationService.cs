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
