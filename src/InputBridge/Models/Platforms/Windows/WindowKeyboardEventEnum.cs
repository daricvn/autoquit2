using System.Reflection;

namespace InputBridge.Models.Platforms.Windows
{
    [Obfuscation(ApplyToMembers = true)]
    internal enum WindowKeyboardEventEnum
    {
        WM_KEYDOWN = 0x0100,
        WM_KEYUP = 0x0101
}
}
