using InputBridge.Models;
using System;
using System.Drawing;
using System.Text;

namespace InputBridge.Automation.Lib.Str
{
    public struct ControlInfo
    {
        private const byte STRING_BUFFER = 200;
        public static readonly ControlInfo Null = new ControlInfo() { Handle = IntPtr.Zero };

        public string Name { get; private set; }
        public string Title { get; private set; }
        public string ClassName { get; private set; }
        public PointF Location { get; private set; }
        public Rectangle Rect { get; private set; }
        public IntPtr Handle { get; private set; }
        public bool Enabled { get; private set; }
        public bool Exists => Handle != IntPtr.Zero;

        public override bool Equals(object obj)
        {
            if (obj is ControlInfo other)
                return this == other;
            return false;
        }

        public override int GetHashCode()
        {
            return Handle.GetHashCode();
        }

        public static bool operator ==(ControlInfo a, ControlInfo b)
        {
            return a.Handle == b.Handle;
        }
        public static bool operator !=(ControlInfo a, ControlInfo b)
        {
            return a.Handle != b.Handle;
        }

        public static ControlInfo FromHandle(IntPtr targetHandle)
        {
            if (targetHandle != IntPtr.Zero && Win32API.IsWindowVisible(targetHandle))
            {
                StringBuilder tmp = new StringBuilder(STRING_BUFFER);
                ControlInfo info = new ControlInfo();
                info.Handle = targetHandle;
                Win32API.GetClassName(targetHandle, tmp, STRING_BUFFER);
                info.ClassName = tmp.ToString();
                info.Title = Win32API.GetWindowTitle(targetHandle);
                info.Enabled = Win32API.IsWindowEnabled(targetHandle);
                Win32API.GetWindowRect(targetHandle, out var rect);
                if (rect != Rectangle2d.Empty)
                {
                    info.Rect = rect.ToRectangle();
                    info.Location = new PointF(rect.Left, rect.Top);
                }
            }
            return Null;
        }
    }
}
