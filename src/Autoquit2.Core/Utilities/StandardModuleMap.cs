using InputBridge.Models;
using System.Collections.Generic;

namespace Autoquit2.Core.Utilities
{
    internal class StandardModuleMap
    {
        private static StandardModuleMap _instance;
        public static StandardModuleMap Instance => _instance ??= new StandardModuleMap();

        private IReadOnlyDictionary<MouseEventType, string> _mouseMap = new Dictionary<MouseEventType, string>()
        {
            { MouseEventType.LEFT_UP, "left-up" },
            { MouseEventType.LEFT_DOWN, "left-down" },
            { MouseEventType.RIGHT_DOWN, "right-down" },
            { MouseEventType.RIGHT_UP, "right-up" }
        };

        public string GetMouseEvent(MouseEventType type)
        {
            if (_mouseMap.TryGetValue(type, out var mouseEvent))
                return mouseEvent;
            return string.Empty;
        }

        public bool MergeMouseAction(string firstAction, string secondAction, out string res)
        {
            res = secondAction;
            if (firstAction == "left-up" && secondAction == "left-down")
                res = "left-click";
            if (firstAction == "right-up" && secondAction == "right-down")
                res = "right-click";
            return res != secondAction;
        }
    }
}
