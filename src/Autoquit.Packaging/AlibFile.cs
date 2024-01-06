using Autoquit.Packaging.LZMA;
using Autoquit.Packaging.Objects;
using Autoquit.Packaging.Zip;
using Autoquit2.Security;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace Autoquit.Packaging
{
    public class AlibFile : IDisposable
    {
        private const string MapFileName = "map.xml";
        private const string FileExtension = ".alib";
        private static readonly Lazy<XmlSerializer> _xmlSerializer = new Lazy<XmlSerializer>(() => new XmlSerializer(typeof(AlibMap)));

        private IDictionary<string, byte[]> _inlineContents;

        public string Id { get; private set; }
        public IEnumerable<string> Files => _inlineContents.Keys;
        public string FilePath { get; private set; }
        public AlibFile(string filePath)
        {
            if (!FileExtension.Equals(Path.GetExtension(filePath), StringComparison.OrdinalIgnoreCase))
                throw new NotSupportedException(ErrorCodes.UnsupportedFile);
            FilePath = filePath;
            if (!File.Exists(filePath))
            {
                Id = Guid.NewGuid().ToString();
                _inlineContents = new Dictionary<string, byte[]>();
            }
            else
            {
                Load();
            }
        }

        public void Set(string filePath, byte[] content)
        {
            _inlineContents[filePath] = content;
        }

        public void BatchSet(params string[] filePath)
        {
            foreach (var file in filePath)
                if (File.Exists(file))
                {
                    Set(file, File.ReadAllBytes(file));
                }
        }

        public byte[] Get(string filePath)
            => _inlineContents?.ContainsKey(filePath) == true ? _inlineContents[filePath] : Array.Empty<byte>();

        public void Save()
        {
            if (File.Exists(FilePath))
                File.Delete(FilePath);
            Id = CreateHash();
            using (var fs = new FileStream(FilePath, FileMode.Create, FileAccess.Write))
            {
                var contents = _inlineContents.ToDictionary(x => x.Key, v => new MemoryStream(v.Value) as Stream);
                var id = Ziplib.Instance.Zip(Encoding.UTF8.GetBytes(Id)).AsSpan();
                var idSize = BitConverter.GetBytes(id.Length);
                fs.Write(idSize, 0, 4);
                fs.Write(id);
                _ = AlibCompressor.Instance.Compress(contents, fs, Id);
            }
        }

        private void Load()
        {
            if (!File.Exists(FilePath))
            {
                throw new FileNotFoundException(ErrorCodes.FileNotFound);
            }
            var content = File.ReadAllBytes(FilePath).AsSpan();
            var size = BitConverter.ToInt32(content.Slice(0, 4));
            var id = Encoding.UTF8.GetString(Ziplib.Instance.UnZip(content.Slice(4, size).ToArray()));
            try
            {
                using (var ms = new MemoryStream(content.Slice(4 + size).ToArray()))
                {
                    _inlineContents = AlibCompressor.Instance.LoadArchive(ms, id).ToDictionary(x => x.Key, v => v.Value);
                }
                var checksumHash = CreateHash();
                if (id == checksumHash)
                    Id = id;
                else throw new FormatException(ErrorCodes.WrongFileFormat);
            }
            catch (Exception)
            {
                _inlineContents = new Dictionary<string, byte[]>();
                throw new FileLoadException(ErrorCodes.WrongFileFormat);
            }
        }

        private string CreateHash()
        {
            var srcString = new StringBuilder();
            foreach (var pair in _inlineContents.OrderBy(x => x.Key))
            {
                _ = srcString.Append(pair.Key).Append(':').Append(pair.Value.Length).Append(':');
            }
            return Hashmath.Instance.sha256(srcString.ToString());
        }

        public IImmutableDictionary<string, string> LoadMap()
        {
            if (!_inlineContents.TryGetValue(MapFileName, out var content) || content == null || content.Length == 0)
            {
                return null;
            }
            using (var ms = new MemoryStream(content))
            {
                var result = _xmlSerializer.Value.Deserialize(ms) as AlibMap;
                if (result == null)
                {
                    return null;
                }
                return result.Map.ToImmutableDictionary(x => x.AssemblyName, v => v.Path);
            }
        }

        public void Dispose()
        {
            _inlineContents?.Clear();
            _inlineContents = null;
        }
    }
}
