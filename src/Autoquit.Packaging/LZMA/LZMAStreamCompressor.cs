using Microsoft.IO;
using SevenZip;
using System;

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
        private static readonly RecyclableMemoryStreamManager _streamManager = new RecyclableMemoryStreamManager();

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
            using (var ms = _streamManager.GetStream(input))
            using (var output = _streamManager.GetStream())
            {
                _compressor.CompressStream(ms, output, password);
                return output.ToArray();
            }
        }

        public Span<byte> Compress(ReadOnlySpan<byte> input, string password = "")
        {
            using (var ms = _streamManager.GetStream(input))
            using (var output = _streamManager.GetStream())
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
