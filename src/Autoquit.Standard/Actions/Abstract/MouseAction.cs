using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using InputBridge.Utilities;
using System;
using System.Collections.Generic;

namespace Autoquit.Standard.Actions.Abstract
{
    public abstract class MouseAction : StandardFunction
    {
        protected const string MOUSE_COORD = "mouse-coordinate";
        protected const string MOUSE_MODE = "interactive";
        public override string AssemblyName { get; set; }
        public override IEnumerable<AutoquitControl> Controls { get; } = new AutoquitControl[]
        {
            new AutoquitControl(0, MOUSE_COORD, AutoquitControlType.MouseCapture),
            new AutoquitControl(1, MOUSE_MODE, "mouse-interact-mode", AutoquitControlType.Checkbox)
        };

        public override FunctionIcon Icon { get; set; } = FunctionIcon.Mouse;
        public override string Id { get; set; }
        public override int MaxLength { get; } = -1;
        public override AutoquitMessageKeyPair BuildParams(IInputParams parameters)
        {
            if (parameters.Count < 2) return AutoquitMessageKeyPair.Empty;
            if (parameters.GetParams(1) is not IntPtr lastParam) return AutoquitMessageKeyPair.Empty;
            var dict = new AutoquitMessageKeyPair
            {
                { MOUSE_COORD, lastParam.ToCoordinate().ToString() }
            };
            return dict;
        }
    }
}