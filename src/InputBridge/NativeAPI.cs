using System;

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
