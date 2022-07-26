using System.Collections.Generic;

namespace Autoquit2.Core.Models
{
    class Script
    {
        public IList<ScriptItem> Scripts { get; set; }
        public string Settings { get; set; }
    }
}
