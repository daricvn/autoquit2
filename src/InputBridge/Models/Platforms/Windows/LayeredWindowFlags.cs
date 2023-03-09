using System;

namespace InputBridge.Models.Platforms.Windows
{
    [Flags]
    public enum LayeredWindowFlags
    {
        LWA_ALPHA = 0x00000002,
        LWA_COLORKEY = 0x00000001,
    }
}
