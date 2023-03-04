using SevenZip;
using System;
using System.IO;

namespace Autoquit.Packaging.LZMA
{
    public enum ArchiveFormat
    {
        SevenZip = 0,
        GZip = 2,
        BZip2 = 3,
        Tar = 4
    }
    public class LZMAStreamCompressor : IDisposable
    {
        private SevenZipCompressor _compressor;
        private bool _disposed;
        public LZMAStreamCompressor(ArchiveFormat format)
        {
            _compressor = new SevenZipCompressor();
            _compressor.ArchiveFormat = (OutArchiveFormat)format;
            _compressor.CompressionLevel = CompressionLevel.Normal;
            _compressor.CompressionMethod = CompressionMethod.Lzma2;
            _compressor.CompressionMode = CompressionMode.Create;
        }

        public byte[] Compress(byte[] input, string password = "")
        {
            using (var ms = new MemoryStream(input))
            using (var output = new MemoryStream())
            {
                _compressor.CompressStream(ms, output, password);
                return output.ToArray();
            }
        }

        ~LZMAStreamCompressor()
        {
            Dispose();
        }

        public void Dispose()
        {
            if (_disposed)
                return;
            _compressor = null;
            _disposed = true;
        }
    }
}
