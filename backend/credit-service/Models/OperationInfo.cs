using System;
using System.ComponentModel.DataAnnotations;

namespace credit_service.Models
{
	public class OperationInfo
	{
        public Guid UserID { get; set; }
        public int AccountNumber { get; set; }
        public DateTime DateTime { get; set; }
        public decimal TransactionAmount { get; set; }
        public OperationInfo(Guid userId,int accountNum, decimal amount)
		{
            UserID = userId;
            AccountNumber = accountNum;
            DateTime = DateTime.Now;
            TransactionAmount = amount;
		}
	}
}

