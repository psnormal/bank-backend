using core_service.Models;
using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
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

        public InfoAccountDTO(Account model)
        {
            AccountNumber = model.AccountNumber;
            Balance = model.Balance;
            State = model.State;
            Type = model.Type;
        }
    }
}
