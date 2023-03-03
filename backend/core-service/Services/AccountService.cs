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

        public DetailInfoAccount GetInfoAccount(Guid UserID, int accountNumber)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == UserID && x.AccountNumber == accountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            List<Operation> operations = _context.Operations.Where(x => x.AccountNumber == accountNumber).ToList();
            List<InfoOperationDTO> infoOperations = new List<InfoOperationDTO>();
            foreach (Operation operation in operations)
            {
                InfoOperationDTO currentOperation = new InfoOperationDTO(operation);
                infoOperations.Add(currentOperation);
            }
            DetailInfoAccount result = new DetailInfoAccount(infoAccount)
            {
                Operations = infoOperations
            };
            return result;
        }

        public async Task EditAccount(Guid UserID, int accountNumber, AccountState accountState)
        {
            var infoAccount = _context.Accounts.FirstOrDefault(x => x.UserID == UserID && x.AccountNumber == accountNumber);

            if (infoAccount == null)
            {
                throw new ValidationException("This account does not exist");
            }

            infoAccount.State = accountState;
            await _context.SaveChangesAsync();
        }

        public InfoAccountsDTO GetAllUserAccounts(Guid UserID)
        {
            List<Account> accounts = _context.Accounts.Where(x => x.UserID == UserID).ToList();
            List<InfoAccountDTO> result = new List<InfoAccountDTO>();
            foreach (var account in accounts)
            {
                InfoAccountDTO currentAccount = new InfoAccountDTO(account);
                result.Add(currentAccount);
            }

            InfoAccountsDTO allAccounts = new InfoAccountsDTO(result);
            return allAccounts;
        }
    }
}
