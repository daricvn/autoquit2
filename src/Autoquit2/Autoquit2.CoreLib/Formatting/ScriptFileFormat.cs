using Autoquit.Packaging.LZMA;
using Autoquit2.CoreLib.Models;
using CommunityToolkit.HighPerformance.Buffers;
using System.Text;
using System.Text.Json;

namespace Autoquit2.CoreLib.Formatting
{
    internal class ScriptFileFormat
    {
        private const string Extension = ".script";
        public static string Save(Script script, string path, string password = "")
        {
            ReadOnlySpan<char> contents = JsonSerializer.Serialize(script).AsSpan();
            var byteCount = Encoding.UTF8.GetByteCount(contents);
            using (var buffer = SpanOwner<byte>.Allocate(byteCount))
            using (var compressor = new LZMAStreamCompressor(ArchiveFormat.SevenZip))
            using (var fs = new FileStream(Path.ChangeExtension(path, Extension), FileMode.Create, FileAccess.Write))
            {
                var input = buffer.Span.Slice(0, byteCount);
                Encoding.UTF8.GetBytes(contents, input);
                var output = compressor.Compress(input, password);
                fs.Write(output);
                fs.Flush();
                return path;
            }
        }

        public static Script? Load(string path, string password = "")
        {
            using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
            using (var buffer = SpanOwner<byte>.Allocate((int)fs.Length))
            {
                Span<byte> bytes = buffer.Span.Slice(0, (int)fs.Length);
                fs.Read(bytes);
                var result = LZMADecompressor.Decompress(bytes, password);
                if (result != null && result.Length > 0)
                {
                    var content = Encoding.UTF8.GetString(result);
                    return JsonSerializer.Deserialize<Script>(content)!;
                }
            }
            return null;
        }
    }
}
