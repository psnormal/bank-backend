namespace bff_client_service.AccountDTO
{
    public class AccountInfo
    {
        public int AccountNumber { get; set; }
        public decimal Balance { get; set; }
        public int State { get; set; }
        public int Type { get; set; }
        public AccountInfo()
        {
        }
    }
}
