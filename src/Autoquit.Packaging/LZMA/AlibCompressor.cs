using SevenZip;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Autoquit.Packaging.LZMA
{
    class AlibCompressor
    {
        private static AlibCompressor _singletonInstance;
        public static AlibCompressor Instance
        {
            get
            {
                if (_singletonInstance == null)
                    _singletonInstance = new AlibCompressor();
                return _singletonInstance;
            }
        }
        public IReadOnlyDictionary<string, byte[]> LoadArchive(Stream fs, string password = "")
        {
            SevenZipExtractor.SetLibraryPath("7z.dll");
            using (var extractor = new SevenZipExtractor(fs, password))
            {
                var res = new Dictionary<string, byte[]>();
                var data = extractor.ArchiveFileData;
                    for (var i = 0; i < data.Count; i++)
                        if (!data[i].IsDirectory)
                        using (var ms = new MemoryStream())
                        {
                            extractor.ExtractFile(data[i].FileName, ms);
                            res.Add(data[i].FileName, ms.ToArray());
                        }
                return res;
            }
        }

        public bool Compress(IDictionary<string, Stream> contents, Stream output, string password)
        {
            if (contents == null || contents.Count == 0)
                return false;
            SevenZipCompressor.SetLibraryPath("7z.dll");
            SevenZipCompressor compressor = new SevenZipCompressor();
            compressor.ArchiveFormat = OutArchiveFormat.SevenZip;
            compressor.CompressionLevel = CompressionLevel.High;
            compressor.CompressionMethod = CompressionMethod.Lzma2;
            compressor.CompressionMode = CompressionMode.Create;
            compressor.CompressStreamDictionary(contents, output, password);
            return true;
        }
    }
}
