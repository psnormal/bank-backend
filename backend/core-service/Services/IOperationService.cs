using core_service.DTO;

namespace core_service.Services
{
    public interface IOperationService
    {
        Task CreateOperation(CreateOperationDTO model);
        InfoOperationsDTO GetOperations(Guid UserID, int accountNumber, int page);
    }
}
