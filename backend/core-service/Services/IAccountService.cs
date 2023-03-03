using core_service.DTO;

namespace core_service.Services
{
    public interface IAccountService
    {
        Task<int> CreateAccount(CreateAccountDTO model);
        InfoAccountDTO GetInfoAccount(Guid UserID, int accountNumber);
    }
}
