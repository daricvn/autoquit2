using System.Collections.Generic;
using System.Xml.Serialization;

namespace Autoquit.Packaging.Objects
{
    [XmlRoot("AlibMap")]
    [XmlInclude(typeof(AlibMapItem))]
    public class AlibMap
    {
        [XmlArray("MapList")]
        [XmlArrayItem("MapItem")]
        public AlibMapItem[] Map { get; set; }
    }
}
