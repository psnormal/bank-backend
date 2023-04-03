using System;
using Microsoft.EntityFrameworkCore;
using user_service.Models;

namespace user_service.Services
{
    public interface IUserService
    {
        public Task<User> AddNewClient(ClientRegistrationModel model);
        public Task<User> AddNewEmployee(EmployeeRegistrationModel model);

        public Task<List<ClientProfileModel>> GetAllUsers();
    }

    public class UserService: IUserService
    {   
        private Context _context;
        private IHashService _hashService;
        public UserService(Context context, IHashService hashService)
        {
            _context = context;
            _hashService = hashService;
        }

        public async Task<User> AddNewClient(ClientRegistrationModel model)
        {
            /*string newPass = _hashService.HashPassword(model.Password);
            model.Password = newPass;*/
            User newUser = new User(model);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            var curUser = await _context.Users.Where(x => x.UserId == newUser.UserId).SingleOrDefaultAsync();
            if (curUser == null)
            {
                throw new Exception("Unable to create User");
            }
            return curUser;
        }

        public async Task<User> AddNewEmployee(EmployeeRegistrationModel model)
        {
            /*string newPass = _hashService.HashPassword(model.Password);
            model.Password = newPass;*/
            User newUser = new User(model);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            var curUser = await _context.Users.Where(x => x.UserId == newUser.UserId).SingleOrDefaultAsync();
            if (curUser == null)
            {
                throw new Exception("Unable to create User");
            }
            return curUser;
        }

        public async Task<List<ClientProfileModel>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            var usersInfo = new List<ClientProfileModel>();
            for (int i = 0; i < users.Count(); i++)
            {
                var userInfo = new ClientProfileModel(users[i]);
                usersInfo.Add(userInfo);
            }
            return usersInfo;
        }
    
	}
}

