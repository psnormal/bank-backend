using Microsoft.AspNetCore.Identity;

namespace authentication_service.Storage
{
    public class Role
    {
        public Guid RoleId { get; set; }
        public RoleType Type { get; set; }
    }
}
