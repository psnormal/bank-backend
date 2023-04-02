using System;
namespace user_service.Models
{
	public class ClientProfileModel
	{
        public Guid UserID { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public Roles Role { get; set; }
        public UserStatus Status { get; set; }

        public ClientProfileModel(User user)
        {
            UserID = user.UserId;
            this.Name = user.Name;
            this.Lastname = user.Lastname;
            this.Role = user.Role;
            Status = user.Status;
        }
    }
}

