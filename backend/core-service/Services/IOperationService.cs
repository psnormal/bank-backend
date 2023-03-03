using core_service.DTO;

namespace core_service.Services
{
    public interface IOperationService
    {
        Task CreateOperation(CreateOperationDTO model);
    }
}
