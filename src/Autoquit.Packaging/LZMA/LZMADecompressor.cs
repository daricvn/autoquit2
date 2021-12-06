using SevenZip;
using System;

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
    }
}
