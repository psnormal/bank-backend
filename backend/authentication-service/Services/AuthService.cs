using authentication_service.Storage;
using System.ComponentModel.DataAnnotations;

namespace authentication_service.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Register(RegisterDto model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Login == model.Login);
            if (user is not null)
            {
                throw new ValidationException("A user with the same login already exists");
            }

            var newUser = new User
            {
                UserId = Guid.NewGuid(),
                Login = model.Login,
                Password = model.Password
            };
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            var employee = _context.Roles.FirstOrDefault(x => x.Type == RoleType.Employee);
            var clients = _context.Roles.FirstOrDefault(x => x.Type == RoleType.Client);

            if (model.Role == RoleType.Employee)
            {
                await _context.UserRoles.AddAsync(new UserRole
                {
                    UserId = newUser.UserId,
                    RoleId = employee.RoleId
                });
                await _context.SaveChangesAsync();

                var userForService = new RegisterUserDto { Name = model.Name, Lastname = model.Lastname, UserId = newUser.UserId};
                var url = $"https://localhost:7099/api/User/EmployeeRegistration";
                using var client = new HttpClient();
                JsonContent content = JsonContent.Create(userForService);
                await client.PostAsync(url, content);
            }
            else if (model.Role == RoleType.Client)
            {
                await _context.UserRoles.AddAsync(new UserRole
                {
                    UserId = newUser.UserId,
                    RoleId = clients.RoleId
                });
                await _context.SaveChangesAsync();

                var userForService = new RegisterUserDto { Name = model.Name, Lastname = model.Lastname, UserId = newUser.UserId };
                var url = $"https://localhost:7099/api/User/ClientRegistration";
                using var client = new HttpClient();
                JsonContent content = JsonContent.Create(userForService);
                await client.PostAsync(url, content);
            }
        }
    }
}
