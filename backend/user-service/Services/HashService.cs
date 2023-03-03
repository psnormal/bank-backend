using System;
using System.Security.Cryptography;
using System.Text;


namespace user_service.Services
{
    public interface IHashService
    {
        string HashPassword(string password);
    }

    public class HashService : IHashService
    {
        public string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hash;
            }
        }
    }
}


