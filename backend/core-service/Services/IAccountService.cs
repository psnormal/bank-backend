using core_service.DTO;
using core_service.Models;

namespace core_service.Services
{
    public interface IAccountService
    {
        Task<int> CreateAccount(CreateAccountDTO model);
        DetailInfoAccount GetInfoAccount(Guid UserID, int accountNumber);
        Task EditAccount(Guid UserID, int accountNumber, AccountState accountState);
        InfoAccountsDTO GetAllUserAccounts(Guid UserID);
    }
}
