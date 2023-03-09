#if WINDOWS_OS
using System.Runtime.InteropServices;

namespace InputBridge.Models.Platforms.Windows
{
    [StructLayout(LayoutKind.Explicit)]
    public struct WindowInputMessage
    {
        [FieldOffset(0)] public WindowMouseInput mi;
        [FieldOffset(0)] public WindowKeyboardInput ki;
        [FieldOffset(0)] public WindowHardwareInput hi;
    }
}
#endif