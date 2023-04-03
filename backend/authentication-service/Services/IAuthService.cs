using authentication_service.Storage;

namespace authentication_service.Services
{
    public interface IAuthService
    {
        Task Register(RegisterDto model);
    }
}
