using System;
namespace user_service.Models
{
	public class ClientProfileModel
	{
        public string Name { get; set; }
        public string Lastname { get; set; }
        public Roles Role { get; set; }

        public ClientProfileModel(User user)
        {
            this.Name = user.Name;
            this.Lastname = user.Lastname;
            this.Role = user.Role;
        }
    }
}

