using System.ComponentModel.DataAnnotations;

namespace authentication_service.Storage
{
    public class AccessForRoles
    {
        [Required]
        public bool IsForClient { get; set; }
        [Required]
        public bool IsForEmployee { get; set; }
    }
}
