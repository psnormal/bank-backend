using System;
using System.ComponentModel.DataAnnotations;

namespace bff_client_service.DTO
{
	public class CreateTransactionDTO
	{
        [Required]
        public Guid UserID { get; set; }
        [Required]
        public int SenderAccountNumber { get; set; }
        [Required]
        public int RecipientAccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }

        public CreateTransactionDTO()
		{
		}
	}
}

