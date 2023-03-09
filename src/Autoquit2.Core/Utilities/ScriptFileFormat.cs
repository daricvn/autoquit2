using Autoquit.Packaging.LZMA;
using Autoquit2.Core.Models;
using System;
using System.IO;
using System.Text;
using System.Text.Json;

namespace Autoquit2.Core.Utilities
{
    internal class ScriptFileFormat
    {
        private const string EXTENSION = ".script";
        public static string Save(Script script, string path, string password = "")
        {
            ReadOnlySpan<char> contents = JsonSerializer.Serialize(script).AsSpan();
            var byteCount = Encoding.UTF8.GetByteCount(contents);
            Span<byte> input = stackalloc byte[byteCount];
            Encoding.UTF8.GetBytes(contents, input);
            using (var compressor = new LZMAStreamCompressor(ArchiveFormat.SevenZip))
            using (var fs = new FileStream(path, FileMode.Create, FileAccess.Write))
            {
                var output = compressor.Compress(input.ToArray(), password).AsSpan();
                fs.Write(output);
                fs.Flush();
                return path;
            }
        }
        public static Script Load(string path, string password = "")
        {
            using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                Span<byte> bytes = stackalloc byte[(int)fs.Length];
                fs.Read(bytes);
                var result = LZMADecompressor.Decompress(bytes.ToArray(), password);
                if (result != null && result.Length > 0)
                {
                    var content = Encoding.UTF8.GetString(result);
                    return JsonSerializer.Deserialize<Script>(content);
                }
            }
            return null;
        }
    }
}
