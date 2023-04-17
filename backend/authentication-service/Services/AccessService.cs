using authentication_service.Models;
using authentication_service.Storage;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace authentication_service.Services
{
    public class AccessService : IAccessService
    {
        private readonly ApplicationDbContext _context;

        public AccessService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ClaimsIdentity Login(LoginViewModel model)
        {
            var identity = GetIdentity(model.Login, model.Password);
            if (identity == null)
            {
                throw new ValidationException("Invalid login or password");
            }
            return identity;
        }

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            var user = _context.Users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user == null)
            {
                throw new ValidationException("Invalid login or password");
            }

            bool employeeRole = false;
            var employee = _context.Roles.FirstOrDefault(x => x.Type == RoleType.Employee);
            var role0 = _context.UserRoles.FirstOrDefault(x => x.UserId == user.UserId && x.RoleId == employee.RoleId);
            if (role0 != null)
            {
                employeeRole = true;
            }

            bool clientRole = false;
            var client = _context.Roles.FirstOrDefault(x => x.Type == RoleType.Client);
            var role1 = _context.UserRoles.FirstOrDefault(x => x.UserId == user.UserId && x.RoleId == client.RoleId);
            if (role1 != null)
            {
                clientRole = true;
            }

            var claims = new List<Claim> { };
            if (employeeRole == true && clientRole == false)
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Login),
                    new Claim(ClaimTypes.Role, "Employee")
                };
            }
            else if (employeeRole == false && clientRole == true)
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Login),
                    new Claim(ClaimTypes.Role, "Client")
                };
            }
            else if (employeeRole == true && clientRole == true)
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Login),
                    new Claim(ClaimTypes.Role, "Client"),
                    new Claim(ClaimTypes.Role, "Employee")
                };
            }
            else
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Login)
                };
            }

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            return claimsIdentity;
        }
    }
}
