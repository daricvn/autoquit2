using InputBridge.Utilities;
using System;

namespace InputBridge.Models.Platforms.Windows
{
    public struct InputEventArgs
    {
        public int Code { get; }
        public IntPtr FirstParam { get; }
        public IntPtr LastParam { get; }

        public InputEventArgs(int code, IntPtr wParam, IntPtr lParam)
        {
            Code = code;
            FirstParam = wParam;
            LastParam = lParam;
        }

        public MouseEventType MouseType
        {
            get
            {
                if (Code >= 0)
                    return ((int)FirstParam).ToMouseEvent();
                return MouseEventType.NONE;
            }
        }

        public KeyboardEventType KeyboardState
        {
            get
            {
                if (Code >= 0)
                    return ((int)FirstParam).ToKeyboardEvent();
                return KeyboardEventType.NONE;
            }
        }

        public KeyCode Key
        {
            get
            {
                if (KeyboardState == KeyboardEventType.NONE) return KeyCode.None;
                return (KeyCode)LastParam;
            }
        }
    }
}
