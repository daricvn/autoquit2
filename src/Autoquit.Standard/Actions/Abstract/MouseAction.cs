using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using System.Collections.Generic;

namespace Autoquit.Standard.Actions.Abstract
{
    public abstract class MouseAction : IAutoquitFunction
    {
        protected const string MOUSE_COORD = "mouse-coordinate";
        protected const string MOUSE_MODE = "interactive";
        public string Id { get; set; }
        public string AssemblyName { get; set; }

        public abstract string Name { get; }

        public abstract string Description { get; }

        public int MaxLength { get; } = -1;

        public IEnumerable<AutoquitControl> Controls { get; } = new AutoquitControl[]
        {
            new AutoquitControl(0, MOUSE_COORD, AutoquitControlType.MouseCapture),
            new AutoquitControl(1, MOUSE_MODE, "mouse-interact-mode", AutoquitControlType.Checkbox)
        };

        public abstract int PreferPriority { get; }

        public abstract bool Execute(AutoquitMessageKeyPair keyValues);
    }
}
