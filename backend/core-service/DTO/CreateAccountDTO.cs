using core_service.Models;
using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
{
    public class CreateAccountDTO
    {
        [Required]
        public Guid UserID { get; set; }
        [Required]
        public AccountType Type { get; set; }
    }
}
