using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace core_service.Models
{
    public class Operation
    {
        [Required]
        public Guid Id { get; set; }
        public Account Account { get; set; }
        [Required]
        [ForeignKey("Account")]
        public int AccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
        public decimal? TransactionFee { get; set; }
    }
}
