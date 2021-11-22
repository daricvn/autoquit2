using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using Autoquit.Standard.Actions.Abstract;
using InputBridge.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autoquit.Standard.Actions
{
    public class MouseLeftClick : MouseAction
    {
        public override string Name => "left-click";

        public override string Description => "Simulate left click to windows.";

        public override int PreferPriority => 0;

        public override bool Execute(AutoquitMessageKeyPair keyValues)
        {
            var coord = keyValues.GetCoordinate(MOUSE_COORD);
            if (coord != null)
            {
                var interactive = keyValues.GetCheckState(MOUSE_MODE);
                var handleRect = keyValues.GetWindowRect();
                if (interactive == true && handleRect != null)
                {
                    var mappedCoord = coord.Value.MapToScreen(handleRect.Value);
                    InputBridge.InputBridge.SendMouse(InputBridge.Models.MouseEventType.LEFT_DOWN, mappedCoord);
                    InputBridge.InputBridge.SendMouse(InputBridge.Models.MouseEventType.LEFT_UP, mappedCoord);
                    return true;
                }

                return true;
            }
            return false;
        }
    }
}
