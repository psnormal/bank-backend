using System.ComponentModel.DataAnnotations;

namespace authentication_service.Storage
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public RoleType Role { get; set; }
    }
}
