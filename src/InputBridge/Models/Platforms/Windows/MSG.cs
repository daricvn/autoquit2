#if WINDOWS_OS
using System;
using System.Runtime.InteropServices;

namespace InputBridge.Models.Platforms.Windows
{
    [StructLayout(LayoutKind.Sequential)]
    public struct MSG
    {
        IntPtr hwnd;
        uint message;
        UIntPtr wParam;
        IntPtr lParam;
        int time;
        Point2d pt;
        int lPrivate;
    }
}
#endif