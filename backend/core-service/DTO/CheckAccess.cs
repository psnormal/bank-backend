using System.ComponentModel.DataAnnotations;

namespace core_service.DTO
{
    public class CheckAccess
    {
        [Required]
        public bool IsForClient { get; set; }
        [Required]
        public bool IsForEmployee { get; set; }

        public CheckAccess(bool isForClient, bool isForEmployee)
        {
            IsForClient = isForClient;
            IsForEmployee = isForEmployee;
        }
    }
}
