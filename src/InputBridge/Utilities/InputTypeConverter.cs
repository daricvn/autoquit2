using InputBridge.Models;
using InputBridge.Models.Platforms.Windows;
using System.Runtime.InteropServices;

namespace InputBridge.Utilities
{
    static class InputTypeConverter
    {
        public static MouseEventType ToMouseEvent(this int src)
        {
#if WINDOWS_OS
            switch ((WindowMouseEventEnum)src)
            {
                case WindowMouseEventEnum.WM_LBUTTONDOWN:
                    return MouseEventType.LEFT_DOWN;
                case WindowMouseEventEnum.WM_LBUTTONUP:
                    return MouseEventType.LEFT_UP;
                case WindowMouseEventEnum.WM_RBUTTONDOWN:
                    return MouseEventType.RIGHT_DOWN;
                case WindowMouseEventEnum.WM_RBUTTONUP:
                    return MouseEventType.RIGHT_UP;
                case WindowMouseEventEnum.WM_MBUTTONDOWN:
                    return MouseEventType.MIDDLE_DOWN;
                case WindowMouseEventEnum.WM_MBUTTONUP:
                    return MouseEventType.MIDDLE_UP;
                case WindowMouseEventEnum.WM_MOUSEWHEEL:
                    return MouseEventType.WHEEL_DOWN | MouseEventType.WHEEL_UP;
            }
#endif
            return MouseEventType.NONE;
        }
        public static KeyboardEventType ToKeyboardEvent(this int src)
        {
#if WINDOWS_OS
            switch ((WindowKeyboardEventEnum)src)
            {
                case WindowKeyboardEventEnum.WM_KEYDOWN:
                    return KeyboardEventType.KEY_DOWN;
                case WindowKeyboardEventEnum.WM_KEYUP:
                    return KeyboardEventType.KEY_UP;
            }
#endif
            return KeyboardEventType.PRESS;
        }

#if WINDOWS_OS
        [DllImport("user32.dll", EntryPoint = "MapVirtualKeyA")]
        private static extern uint MapVirtualKeyA(uint code, uint mapType);
        public static MouseEventF ToWindowsMouseEvent(this MouseEventType src)
        {
            switch (src)
            {
                case MouseEventType.LEFT_DOWN:
                    return MouseEventF.LeftDown;
                case MouseEventType.LEFT_UP:
                    return MouseEventF.LeftUp;
                case MouseEventType.RIGHT_DOWN:
                    return MouseEventF.RightDown;
                case MouseEventType.RIGHT_UP:
                    return MouseEventF.RightUp;
                case MouseEventType.MIDDLE_DOWN:
                    return MouseEventF.MiddleDown;
                case MouseEventType.MIDDLE_UP:
                    return MouseEventF.MiddleUp;
                case MouseEventType.WHEEL_DOWN:
                case MouseEventType.WHEEL_UP:
                    return MouseEventF.Wheel;
            }
            return MouseEventF.Move;
        }
        public static KeyEventF ToWindowsKeyEvent(this KeyboardEventType src)
        {
            switch (src)
            {
                case KeyboardEventType.KEY_DOWN:
                    return KeyEventF.KeyDown;
                case KeyboardEventType.KEY_UP:
                    return KeyEventF.KeyUp;
            }
            return KeyEventF.ExtendedKey;
        }


        /// <summary>
        /// Map Virtual KeyCode to Hardware ScanCode
        /// </summary>
        /// <param name="keyCode"></param>
        /// <returns></returns>
        public static ScanCode ToScanCode(this KeyCode keyCode)
        {
            // Convert from VirtualKey to ScanCode
            return (ScanCode)MapVirtualKeyA((uint)keyCode, 0);
        }
#endif
    }
}
