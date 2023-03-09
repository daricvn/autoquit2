#if WINDOWS_OS
using System;
using System.Runtime.InteropServices;

namespace InputBridge.Models.Platforms.Windows
{
    [StructLayout(LayoutKind.Sequential)]

    public struct WindowKeyboardInput
    {
        public ushort wVk;
        public ushort wScan;
        public uint dwFlags;
        public uint time;
        public IntPtr dwExtraInfo;
    }
}
#endif