using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace authentication_service
{
    public class JwtConfiguration
    {
        public const string Issuer = "bank-backend";
        public const string Audience = "Clients";
        private const string Key = "veryhardkey123";
        public const int Lifetime = 10000;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }

    }
}
