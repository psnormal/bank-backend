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
    }
}
