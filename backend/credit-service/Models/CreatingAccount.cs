using System;
using System.ComponentModel.DataAnnotations;

namespace credit_service.Models
{
	public class CreatingAccount
	{
        public Guid UserID { get; set; }
        public int Type { get; set; }

        public CreatingAccount(Guid userId)
        {
            UserID = userId;
            Type = 1;
        }
    }
}

