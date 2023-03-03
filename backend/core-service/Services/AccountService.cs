using core_service.DTO;
using core_service.Models;
using System.ComponentModel.DataAnnotations;

namespace core_service.Services
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;

        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAccount(CreateAccountDTO model)
        {
            var newModel = new Account
            {
                UserID = model.UserID,
                Balance = 0,
                State = 0,
                Type = model.Type
            };
            await _context.Accounts.AddAsync(newModel);
            await _context.SaveChangesAsync();

            return newModel.AccountNumber;
        }

        public InfoAccountDTO GetInfoAccount(Guid UserID, int accountNumber)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == UserID && x.AccountNumber == accountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            return new InfoAccountDTO(infoAccount);
        }
    }
}
