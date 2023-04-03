using System;
namespace user_service.Models
{
	public class User
	{
		public Guid UserId { get; set; }
		public string Name { get; set; }
        public string Lastname { get; set; }
		public Roles Role { get; set; }
        public UserStatus Status { get; set; }

        public User()
		{

		}

		public User(ClientRegistrationModel model)
		{
			UserId = model.UserId;
			this.Name = model.Name;
			this.Lastname = model.Lastname;
			this.Role = Roles.Client;
			this.Status = UserStatus.Active;
		}

		public User(EmployeeRegistrationModel model)
		{
			UserId = model.UserId;
            this.Name = model.Name;
            this.Lastname = model.Lastname;
            this.Role = Roles.Employee;
            this.Status = UserStatus.Active;
        }
    }
}

