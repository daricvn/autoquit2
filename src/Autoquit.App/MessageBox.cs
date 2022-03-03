using Autoquit.Models;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Autoquit
{
    public class MessageBox
    {
#if WINDOWS_OS
        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto, EntryPoint = "MessageBox")]
        private static extern int ShowMessageBox(IntPtr hWnd, string text, string caption, uint type);
#endif

        public static MsgBoxResult Show(string text, string caption, MsgBoxTypes type)
        {
            return (MsgBoxResult)ShowMessageBox(IntPtr.Zero, text, caption, (uint)type);
        }
        public static MsgBoxResult Show(string text, string caption, MsgBoxTypes type, MsgBoxIcons icon)
        {
            return (MsgBoxResult)ShowMessageBox(IntPtr.Zero, text, caption, (uint)type | (uint)icon);
        }
    }
}
