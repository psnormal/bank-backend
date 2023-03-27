using authentication_service.Models;
using System.Security.Claims;

namespace authentication_service.Services
{
    public interface IAccessService
    {
        ClaimsIdentity Login(LoginViewModel model);
    }
}
