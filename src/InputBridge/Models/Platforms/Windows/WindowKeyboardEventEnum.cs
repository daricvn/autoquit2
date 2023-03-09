#if WINDOWS_OS
using System.Reflection;

namespace InputBridge.Models.Platforms.Windows
{
    [Obfuscation(ApplyToMembers = true)]
    internal enum WindowKeyboardEventEnum
    {
        WM_KEYDOWN = 0x0100,
        WM_KEYUP = 0x0101,
        WM_SYSKEYDOWN = 0x104,
        WM_SYSKEYUP = 0x105
    }
}
#endif