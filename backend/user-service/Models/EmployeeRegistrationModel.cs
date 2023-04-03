using System;
namespace user_service.Models
{
	public class EmployeeRegistrationModel
	{
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
    }
}

