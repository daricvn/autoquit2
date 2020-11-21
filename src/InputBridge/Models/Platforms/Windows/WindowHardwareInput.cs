using System.Runtime.InteropServices;

namespace InputBridge.Models.Platforms.Windows
{
    [StructLayout(LayoutKind.Sequential)]
    public struct WindowHardwareInput
    {
        public uint uMsg;
        public ushort wParamL;
        public ushort wParamH;
    }
}
