using System.Reflection;

namespace InputBridge.Models
{
    [Obfuscation(ApplyToMembers = true)]
    public enum MouseEventType
    {
        NONE = 0x00,
        LEFT_UP = 0x01,
        LEFT_DOWN = 0x02,
        RIGHT_UP = 0x04,
        RIGHT_DOWN = 0x08,
        MIDDLE_DOWN = 0x10,
        MIDDLE_UP = 0x20,
        WHEEL_UP = 0x40,
        WHEEL_DOWN = 0x80
    }
}
