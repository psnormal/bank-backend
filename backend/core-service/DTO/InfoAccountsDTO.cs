namespace core_service.DTO
{
    public class InfoAccountsDTO
    {
        public List<InfoAccountDTO> Accounts { get; set; }

        public InfoAccountsDTO(List<InfoAccountDTO> accounts)
        {
            Accounts = accounts;
        }
    }
}
