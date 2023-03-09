#if WINDOWS_OS
namespace InputBridge.Models.Platforms.Windows
{
    public struct WindowInput
    {
        public int type;
        public WindowInputMessage u;
    }
}
#endif