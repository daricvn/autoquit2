using InputBridge.Models;
using System;
using System.Linq;

namespace InputBridge
{
    public class NativeAPI
    {
        private static NativeAPI _instance;
        public static NativeAPI Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new NativeAPI();
                return _instance;
            }
        }

        public void SendMouse(IntPtr target, MouseEventType type, Point2d coordinate)
        {
#if WINDOWS_OS
            var mouseEvent = Win32Map.Instance.ConvertMouseEvents(type);
            InputBridge.PostMessage(target, (uint)mouseEvent, 0, (int)coordinate.ToParams());
#endif
        }

        public void BringToTop(IntPtr target)
        {
#if WINDOWS_OS
            if (Win32API.IsIconic(target))
                Win32API.ShowWindow(target, (int)Win32API.ListMessage.SW_RESTORE);
            Win32API.SetForegroundWindow(target);
#endif
        }
    }
}
