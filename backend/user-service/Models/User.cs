using System;
namespace user_service.Models
{
	public class User
	{
		public Guid UserId { get; set; }
		public string Name { get; set; }
        public string Lastname { get; set; }
		public string Password { get; set; }
		public Roles Role { get; set; }
        public UserStatus Status { get; set; }

        public User()
		{

		}

		public User(ClientRegistrationModel model)
		{
			this.Name = model.Name;
			this.Lastname = model.Lastname;
			this.Password = model.Password;
			this.Role = Roles.Client;
			this.Status = UserStatus.Active;
		}
    }
}

