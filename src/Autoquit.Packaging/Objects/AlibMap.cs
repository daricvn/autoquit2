using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Autoquit.Packaging.Objects
{
    [XmlRoot("AlibMap")]
    class AlibMap
    {
        public IList<AlibMapItem> Map { get; set; } = new List<AlibMapItem>();
    }
}
