using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace core_service.Models
{
    public class Operation
    {
        public Guid Id { get; set; }
        public Account Account { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10)]
        [ForeignKey("Account")]
        public string AccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
        public decimal? TransactionFee { get; set; }
    }
}
