using Autoquit.Packaging.Objects;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;

namespace Autoquit.Packaging
{
    public class AlibFactory : IDisposable
    {
        private const string MAIN_PATH = "module";
        private const string MAIN_PATH_LOOKUP = "module\\";
        private const string REF_PATH = "dependencies";
        private const string REF_PATH_LOOKUP = "dependencies\\";
        private const string LOCA_PATH = "localization";
        private const string LOCA_PATH_LOOKUP = "localization\\";
        private const string MAP_FILE = "map.xml";

        private static AlibFactory _instance;
        public static AlibFactory Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new AlibFactory();
                return _instance;
            }
        }

        public AlibFile Create(string filePath, string mainModule, params string[] dependencies)
        {
            if (File.Exists(filePath))
                File.Delete(filePath);
            if (!File.Exists(mainModule))
                return null;
            var map = new AlibMap();
            var list = new List<AlibMapItem>();
            list.Add(new AlibMapItem(mainModule).MapToNewPath(MAIN_PATH));
            foreach (var dp in dependencies)
                if (File.Exists(dp))
                {
                    list.Add(new AlibMapItem(dp).MapToNewPath(REF_PATH));
                }
            map.Map = list.ToArray();
            var alibFile = new AlibFile(filePath);
            foreach (var item in map.Map)
                alibFile.Set(item.Path, item.Data);
            using (var ms = new MemoryStream())
            {
                var serializer = new XmlSerializer(typeof(AlibMap));
                serializer.Serialize(ms, map);
                alibFile.Set(MAP_FILE, ms.ToArray());
            }
            return alibFile;
        }
        public AlibFile Create(string filePath, string mainModule, string[] dependencies, string[] localization)
        {
            if (File.Exists(filePath))
                File.Delete(filePath);
            if (!File.Exists(mainModule))
                return null;
            var map = new AlibMap();
            var list = new List<AlibMapItem>();
            list.Add(new AlibMapItem(mainModule).MapToNewPath(MAIN_PATH));
            foreach (var dp in dependencies)
            {
                if (File.Exists(dp))
                {
                    list.Add(new AlibMapItem(dp).MapToNewPath(REF_PATH));
                }
            }
            foreach (var l in localization)
            {
                if (File.Exists(l))
                {
                    list.Add(new AlibMapItem(l).MapToNewPath(LOCA_PATH));
                }
            }
            map.Map = list.ToArray();
            var alibFile = new AlibFile(filePath);
            foreach (var item in map.Map)
                alibFile.Set(item.Path, item.Data);
            using (var ms = new MemoryStream())
            {
                var serializer = new XmlSerializer(typeof(AlibMap));
                serializer.Serialize(ms, map);
                alibFile.Set(MAP_FILE, ms.ToArray());
            }
            return alibFile;
        }

        public string GetMainFiles(AlibFile alib) => alib.Files.Where(x => x.StartsWith(MAIN_PATH_LOOKUP)).FirstOrDefault();
        public IEnumerable<string> GetReferencedFiles(AlibFile alib) => alib.Files.Where(x => x.StartsWith(REF_PATH_LOOKUP));

        public void Dispose()
        {
        }
    }
}
