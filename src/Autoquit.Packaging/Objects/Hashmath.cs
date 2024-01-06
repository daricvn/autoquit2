using System;
using System.Buffers;
using System.Text;

namespace Autoquit2.Security
{
    public class Hashmath
    {
        private static Hashmath? _instance;
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
            var byteCount = Encoding.UTF8.GetByteCount(origin);
            var hashPool = ArrayPool<byte>.Shared.Rent(32);
            var pool = ArrayPool<byte>.Shared.Rent(byteCount);
            try
            {
                using (System.Security.Cryptography.MD5 hash = System.Security.Cryptography.MD5.Create())
                {
                    var inputBytes = pool.AsSpan().Slice(0, byteCount);
                    var hashSpan = hashPool.AsSpan();
                    Encoding.UTF8.GetBytes(origin, inputBytes);
                    if (!hash.TryComputeHash(inputBytes, hashSpan, out var bytesWritten))
                    {
                        throw new Exception("Cannot perfom md5 hash");
                    }
                    var sb = new StringBuilder();
                    for (var i = 0; i < bytesWritten; i++)
                        sb.Append(hashSpan[i].ToString("x2"));
                    return sb.ToString();
                }
            }
            finally
            {
                ArrayPool<byte>.Shared.Return(pool);
                ArrayPool<byte>.Shared.Return(hashPool);
            }
        }

        public string sha256(string origin)
        {
            var byteCount = Encoding.UTF8.GetByteCount(origin);
            var hashPool = ArrayPool<byte>.Shared.Rent(32);
            var pool = ArrayPool<byte>.Shared.Rent(byteCount);
            try
            {
                using (System.Security.Cryptography.SHA256 hash = System.Security.Cryptography.SHA256.Create())
                {
                    var inputBytes = pool.AsSpan().Slice(0, byteCount);
                    var hashSpan = hashPool.AsSpan();
                    Encoding.UTF8.GetBytes(origin, inputBytes);
                    if (!hash.TryComputeHash(inputBytes, hashSpan, out var bytesWritten))
                    {
                        throw new Exception("Cannot perfom md5 hash");
                    }
                    var sb = new StringBuilder();
                    for (var i = 0; i < bytesWritten; i++)
                        sb.Append(hashSpan[i].ToString("x2"));
                    return sb.ToString();
                }
            }
            finally
            {
                ArrayPool<byte>.Shared.Return(pool);
                ArrayPool<byte>.Shared.Return(hashPool);
            }
        }
    }
}
