using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Autoquit.Packaging.Objects
{
    public class sha256 : IDisposable
    {
        private SHA256 _instance;
        public sha256()
        {
            _instance = SHA256.Create();
        }

        public string Compute(string source)
        {
            var bytes = Encoding.UTF8.GetBytes(source);
            var res = _instance.ComputeHash(bytes);
            var sb = new StringBuilder();
            for (var i = 0; i < res.Length; i++)
                sb.Append(res[i].ToString("x2"));
            return sb.ToString();
        }

        public void Dispose()
        {
            _instance?.Dispose();
        }
    }
}
