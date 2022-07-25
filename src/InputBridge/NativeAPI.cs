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
            Win32API.SetForegroundWindow(target);
#endif
        }
    }
}
