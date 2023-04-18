using System;
using System.ComponentModel.DataAnnotations;

namespace bff_client_service.AccountDTO
{
	public class InfoAccountDTO
	{
        [Required]
        public int AccountNumber { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public AccountState State { get; set; }
        [Required]
        public AccountType Type { get; set; }
        public InfoAccountDTO()
		{
		}
	}
}

