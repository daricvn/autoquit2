using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Autoquit.Packaging.Objects
{
    class AlibMapItem
    {
        [XmlAttribute]
        public string Path { get; private set; }
        [XmlElement(IsNullable = false)]
        public string AssemblyName { get; private set; }

        [XmlIgnore]
        public byte[] Data { get; }

        public AlibMapItem(string path)
        {
            Path = path;
            Data = System.IO.File.ReadAllBytes(path);
            AssemblyName = System.Reflection.AssemblyName.GetAssemblyName(path).FullName;
        }

        public AlibMapItem MapToNewPath(string expectedPath)
        {
            var fileName = System.IO.Path.GetFileName(Path);
            Path = System.IO.Path.Combine(expectedPath, fileName);
            return this;
        }
    }
}
