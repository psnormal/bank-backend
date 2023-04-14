using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
{
    public class CreateTransactionDto
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
    }
}
