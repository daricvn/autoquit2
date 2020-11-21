using System;
using System.Runtime.InteropServices;

namespace InputBridge.Models.Platforms.Windows
{
    [StructLayout(LayoutKind.Sequential)]

    public struct WindowMouseInput
    {
        public int dx;
        public int dy;
        public uint mouseData;
        public uint dwFlags;
        public uint time;
        public IntPtr dwExtraInfo;
    }
}
