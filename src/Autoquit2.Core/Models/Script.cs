using System.Collections.Generic;
using System.Drawing;

namespace Autoquit2.Core.Models
{
    class Script
    {
        /// <summary>
        /// Author of the script
        /// </summary>
        public string Author { get; set; }
        /// <summary>
        /// The application name
        /// </summary>
        public string AppName { get; set; }
        /// <summary>
        /// The application executable
        /// </summary>
        public string AppExt { get; set; }
        /// <summary>
        /// Application's resolution at last recorded time
        /// </summary>
        public PointF Resolution { get; set; }
        public string Settings { get; set; }
        /// <summary>
        /// An option allow the tool to calculate the coordinate based on the resolution at the recorded time
        /// </summary>
        public bool RelativeCoordinate { get; set; }
        public IList<ScriptItem> Scripts { get; set; } = new List<ScriptItem>();
    }
}
