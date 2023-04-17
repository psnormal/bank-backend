using System;
using System.ComponentModel.DataAnnotations;

namespace bff_client_service.AccountDTO
{
	public class CreateAccountDTO
	{
        [Required]
        public Guid UserID { get; set; }
        [Required]
        public AccountType Type { get; set; }
    }
}

