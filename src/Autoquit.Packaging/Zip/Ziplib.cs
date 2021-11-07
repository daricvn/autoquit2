using System.IO;
using System.IO.Compression;

namespace Autoquit.Packaging.Zip
{
    class Ziplib
    {
        private static Ziplib _instance;
        public static Ziplib Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new Ziplib();
                return _instance;
            }
        }

        public byte[] Zip(byte[] contents)
        {
            using (var ms = new MemoryStream())
            using (var deflater = new DeflateStream(ms, CompressionMode.Compress))
            {
                deflater.Write(contents, 0, contents.Length);
                deflater.Flush();
                return ms.ToArray();
            }
        }
        public byte[] UnZip(byte[] contents)
        {
            using (var res = new MemoryStream())
            using (var ms = new MemoryStream(contents))
            using (var deflater = new DeflateStream(ms, CompressionMode.Decompress))
            {
                deflater.CopyTo(res);
                deflater.Flush();
                return res.ToArray();
            }
        }
    }
}
