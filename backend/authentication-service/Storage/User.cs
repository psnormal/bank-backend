using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace authentication_service.Storage
{
    public class User
    {
        public Guid UserId { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
