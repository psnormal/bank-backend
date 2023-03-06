using System.ComponentModel.DataAnnotations;
using core_service.Models;

namespace core_service.DTO
{
    public class InfoOperationDTO
    {
        [Required]
        public int AccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
        public decimal? TransactionFee { get; set; }

        public InfoOperationDTO(Operation model)
        {
            AccountNumber = model.AccountNumber;
            DateTime = model.DateTime;
            TransactionAmount = model.TransactionAmount;
            TransactionFee = model.TransactionFee;
        }
    }
}
