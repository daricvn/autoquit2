using SevenZip;
using System;
using System.IO;

namespace Autoquit.Packaging.LZMA
{
    public class LZMADecompressor : IDisposable
    {
        private string fileName;
        private string password;
        public LZMADecompressor(string fileName, string password)
        {
            this.fileName = fileName;
            this.password = password;
        }

        public LZMADecompressor(string fileName) : this(fileName, string.Empty)
        {

        }

        public void Dispose()
        {
        }

        public void ExtractTo(string folder)
        {
            SevenZipExtractor.SetLibraryPath("7z.dll");
            using (var extractor = new SevenZipExtractor(fileName, password))
            {
                extractor.ExtractArchive(folder);
            }
        }
        public static byte[] Decompress(byte[] input, string password)
        {
            SevenZipExtractor.SetLibraryPath("7z.dll");
            using (var ms = new MemoryStream(input))
            using (var output = new MemoryStream())
            using (var extractor = new SevenZipExtractor(ms, password))
            {
                if (!extractor.Check())
                    throw new BadImageFormatException("Wrong password or corrupted file.");
                extractor.ExtractFile(0, output);
                return output.ToArray();
            }
        }
    }
}
