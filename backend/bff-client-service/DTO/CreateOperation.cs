using System;
using System.ComponentModel.DataAnnotations;

namespace bff_client_service.DTO
{
	public class CreateOperation
	{
        [Required]
        public Guid UserID { get; set; }
        [Required]
        public int AccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
        public CreateOperation()
		{
		}
	}
}

