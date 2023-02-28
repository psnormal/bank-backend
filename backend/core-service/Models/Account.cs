using System.ComponentModel.DataAnnotations;

namespace core_service.Models
{
    public class Account
    {
        public Guid UserID { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10)]
        [Key]
        public string AccountNumber { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public AccountState State { get; set; }
        [Required]
        public AccountType Type { get; set; }
        public List<Operation>? Operations { get; set; }
    }
}
