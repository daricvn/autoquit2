

using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using System.Collections.Generic;

namespace Autoquit.Image.Actions
{
    public class ImageClick : IAutoquitFunction
    {
        public string Id { get; set; }
        public string AssemblyName { get; set; }

        public string Name => "image-click";

        public string Description => "Using math to look up control or item by a provided template picture.";
        public FunctionIcon Icon { get; set; } = FunctionIcon.Image;

        public int MaxLength => -1;

        public int PreferPriority => 0;

        public IEnumerable<AutoquitControl> Controls { get; } = new AutoquitControl[]
        {
            new AutoquitControl(0, "image-capture", AutoquitControlType.ImageCapture),
            new AutoquitControl(1, "mouse-action", AutoquitControlType.ListItem, "left-click", "right-click"),
            new AutoquitControl(2, "mouse-action-type", AutoquitControlType.ListItem, "top-left", "top-right", "center", "bottom-left", "bottom-right"),
            new AutoquitControl(3, "interactive", "mouse-interact-mode", AutoquitControlType.Checkbox)
        };

        public bool Execute(AutoquitMessageKeyPair keyValues)
        {
            throw new System.NotImplementedException();
        }
    }
}
