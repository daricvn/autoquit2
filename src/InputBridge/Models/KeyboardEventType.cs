using System.Reflection;

namespace InputBridge.Models
{
    [Obfuscation(ApplyToMembers = true)]
    public enum KeyboardEventType
    {
        PRESS = 0x00,
        KEY_UP = 0x01,
        KEY_DOWN = 0x02,
        NONE = 0x64,
    }
}
