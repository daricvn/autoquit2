#if WINDOWS_OS

using InputBridge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using static InputBridge.Win32API;

namespace InputBridge
{
    internal class Win32Map
    {
        private static Win32Map _instance;
        public static Win32Map Instance => _instance ?? (_instance = new Win32Map());

        public IEnumerable<ValueTuple<MouseEventType, MouseEvents>> MouseEventMap
        {
            get
            {
                yield return (MouseEventType.LEFT_UP, MouseEvents.WM_LBUTTONUP);
                yield return (MouseEventType.LEFT_DOWN, MouseEvents.WM_LBUTTONDOWN);
                yield return (MouseEventType.RIGHT_UP, MouseEvents.WM_RBUTTONUP);
                yield return (MouseEventType.RIGHT_DOWN, MouseEvents.WM_RBUTTONDOWN);
                yield return (MouseEventType.MIDDLE_UP, MouseEvents.WM_MBUTTONUP);
                yield return (MouseEventType.MIDDLE_DOWN, MouseEvents.WM_MBUTTONDOWN);
            }
        }

        public MouseEvents ConvertMouseEvents(MouseEventType type)
            => MouseEventMap.FirstOrDefault(x => x.Item1 == type).Item2;
    }
}

#endif