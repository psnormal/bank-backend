using System;
namespace user_service.Models
{
	public class Role
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public List<User> Users { get; set; }
		public Role()
		{
			Users = new List<User>();
		}
	}
}

