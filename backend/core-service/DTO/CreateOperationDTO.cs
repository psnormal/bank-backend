using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
{
    public class CreateOperationDTO
    {
        [Required]
        public Guid UserID { get; set; }
        [Required]
        public int AccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
    }
}
