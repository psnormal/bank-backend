using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace authentication_service.Storage
{
    public class JwtConfigurations
    {
        public const string Issuer = "authService"; // издатель токена
        public const string Audience = "Client"; // потребитель токена
        private const string Key = "SuperSecretKey4815162342";   // ключ для шифрации
        public static readonly TimeSpan Lifetime = new(0, 30, 0);

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
