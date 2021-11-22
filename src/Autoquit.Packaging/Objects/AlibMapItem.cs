using System.Xml.Serialization;

namespace Autoquit.Packaging.Objects
{
    [XmlType("MapItem")]
    public class AlibMapItem
    {
        [XmlAttribute]
        public string Path { get; set; }
        [XmlElement(IsNullable = false)]
        public string AssemblyName { get; set; }

        [XmlIgnore]
        public byte[] Data { get; }

        public AlibMapItem()
        {

        }

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
