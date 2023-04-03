using System.ComponentModel.DataAnnotations;

namespace authentication_service.Storage
{
    public class RegisterUserDto
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
    }
}
