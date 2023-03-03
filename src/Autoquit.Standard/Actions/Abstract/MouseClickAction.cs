using Autoquit.Foundation.Utilities;
using InputBridge.Models;
using InputBridge.Utilities;
using System.Collections.Generic;

namespace Autoquit.Standard.Actions.Abstract
{
    public abstract class MouseClickAction : MouseAction
    {
        public override int PreferPriority => 0;

        public override bool Execute(AutoquitMessageKeyPair keyValues)
        {
            var coord = keyValues.GetCoordinate(MOUSE_COORD);
            if (coord != null)
            {
                var interactive = keyValues.GetCheckState(MOUSE_MODE);
                var handleRect = keyValues.GetWindowRect();
                if (handleRect != null)
                {
                    if (interactive == true)
                    {
                        var mappedCoord = coord.Value.MapToScreen(handleRect.Value);
                        foreach (var act in GetActionList())
                            InputBridge.InputBridge.SendMouse(act, mappedCoord);
                    }
                    else
                    {
                        foreach (var act in GetActionList())
                            InputBridge.NativeAPI.Instance.SendMouse(keyValues.GetWindowHandle(), act, coord.Value);
                    }
                    return true;
                }

                return true;
            }
            return false;
        }

        public abstract IEnumerable<MouseEventType> GetActionList();
    }
}
