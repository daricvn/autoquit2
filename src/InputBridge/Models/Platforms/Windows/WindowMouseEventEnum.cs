#if WINDOWS_OS
using System.Reflection;

namespace InputBridge.Models.Platforms.Windows
{
    [Obfuscation(ApplyToMembers = true)]
    internal enum WindowMouseEventEnum
    {
        WM_LBUTTONDOWN = 0x0201,
        WM_LBUTTONUP = 0x0202,
        WM_MOUSEMOVE = 0x0200,
        WM_MOUSEWHEEL = 0x020A,
        WM_RBUTTONDOWN = 0x0204,
        WM_RBUTTONUP = 0x0205,
        WM_LBUTTONDBLCLK = 0x0203,
        WM_MBUTTONDOWN = 0x0207,
        WM_MBUTTONUP = 0x0208,
        WM_RBUTTONDBLCLK = 0x0206
    }
}
#endif