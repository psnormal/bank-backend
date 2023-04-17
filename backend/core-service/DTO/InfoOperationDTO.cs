using System.ComponentModel.DataAnnotations;
using core_service.Models;

namespace core_service.DTO
{
    public class InfoOperationDTO
    {
        [Required]
        public int AccountNumber { get; set; }
        public int SenderAccountNumber { get; set; }
        public int RecipientAccountNumber { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public decimal TransactionAmount { get; set; }
        public decimal? TransactionFee { get; set; }

        public InfoOperationDTO(Operation model)
        {
            SenderAccountNumber = model.SenderAccountNumber;
            RecipientAccountNumber = model.RecipientAccountNumber;
            AccountNumber = model.AccountNumber;
            DateTime = model.DateTime;
            TransactionAmount = model.TransactionAmount;
            TransactionFee = model.TransactionFee;
        }
    }
}
