using System;
using System.ComponentModel.DataAnnotations;

namespace credit_service.Models
{
	public class OperationInfo
	{
        public int AccountNumber { get; set; }
        public DateTime DateTime { get; set; }
        public decimal TransactionAmount { get; set; }
        public decimal? TransactionFee { get; set; }
        public OperationInfo(int accountNum, decimal amount)
		{
            AccountNumber = accountNum;
            DateTime = DateTime.Now;
            TransactionAmount = amount;
            TransactionFee = 0;
		}
	}
}

