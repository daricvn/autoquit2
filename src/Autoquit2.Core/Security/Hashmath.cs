using System.Linq;
using System.Text;

namespace Autoquit2.Core.Security
{
    public class Hashmath
    {
        private static Hashmath _instance;
        public static Hashmath Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new Hashmath();
                return _instance;
            }
        }

        public string md5(string origin)
        {
            using (System.Security.Cryptography.MD5 hash = System.Security.Cryptography.MD5.Create())
            {
                var sb = new StringBuilder();
                var hashBytes = hash.ComputeHash(Encoding.UTF8.GetBytes(origin));
                for (var i = 0; i < hashBytes.Length; i++)
                    sb.Append(hashBytes[i].ToString("x2"));
                return sb.ToString();
            }
        }

        public string sha256(string origin)
        {
            using (System.Security.Cryptography.SHA256 hash = System.Security.Cryptography.SHA256.Create())
            {
                var sb = new StringBuilder();
                var hashBytes = hash.ComputeHash(Encoding.UTF8.GetBytes(origin));
                for (var i = 0; i < hashBytes.Length; i++)
                    sb.Append(hashBytes[i].ToString("x2"));
                return sb.ToString();
            }
        }
    }
}
