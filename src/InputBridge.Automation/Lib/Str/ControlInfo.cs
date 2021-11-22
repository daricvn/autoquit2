using System;
using System.Drawing;

namespace InputBridge.Automation.Lib.Str
{
    public struct ControlInfo
    {
        public static readonly ControlInfo Null = new ControlInfo() { Handle = IntPtr.Zero };

        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Title { get; private set; }
        public string Type { get; private set; }
        public string ClassName { get; private set; }
        public PointF Location { get; private set; }
        public Rectangle Rect { get; private set; }
        public IntPtr Handle { get; private set; }
        public bool Visible { get; private set; }
        public bool Enabled { get; private set; }
        public bool Exists => Handle != IntPtr.Zero;

        public override bool Equals(object obj)
        {
            if (obj is ControlInfo other)
                return Handle == other.Handle && Id == other.Id;
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Handle, Id);
        }

        public static ControlInfo FromHandle(IntPtr targetHandle)
        {
            return Null;
        }
    }
}
