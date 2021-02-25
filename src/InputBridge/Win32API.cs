#if (WINDOWS_OS)
using InputBridge.Models;
using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;

namespace InputBridge
{
    public static class Win32API
    {
        #region Private Properties 
        private const short PROP_MAXTEXTLENGTH = 255;
        private static int WM_GETCONTROLNAME = -1;
        #endregion
        public enum AncestorTraceType
        {
            GA_PARENT = 1,
            GA_ROOT = 2,
            GA_ROOTOWNER = 3
        }
        public enum SystemDefined
        {
            WM_SETTEXT = 0x000c,
            WM_GETTEXT = 0x000d,
            WM_GETTEXTLENGTH = 0x000e,
            WM_CLOSE = 0x0010,
            BM_GETCHECK = 0x00f0,
            BM_SETCHECK = 0x00f1,
            BM_CLICK = 0x00f5,
            WM_INPUT = 0x00ff,
            WM_KEYDOWN = 0x0100,
            WM_KEYUP = 0x0101,
            WM_SYSKEYDOWN = 0x0104,
            WM_SYSKEYUP = 0x0105,
            WM_COMMAND = 0x0111,
            WM_HSCROLL = 0x0114,
            WM_VSCROLL = 0x0115,
            WM_CUT = 0x0300,
            WM_COPY = 0x0301,
            WM_PASTE = 0x0302,
            WM_CLEAR = 0x0303,
            WM_UNDO = 0x0304
        }
        public enum ListMessage
        {
            CB_GETEDITSEL = 0x0140,
            CB_LIMITTEXT = 0x0141,
            CB_SETEDITSEL = 0x0142,
            CB_ADDSTRING = 0x0143,
            CB_DELETESTRING = 0x0144,
            CB_DIR = 0x0145,
            CB_GETCOUNT = 0x0146,
            CB_GETCURSEL = 0x0147,
            CB_GETLBTEXT = 0x0148,
            CB_GETLBTEXTLEN = 0x0149,
            CB_INSERTSTRING = 0x014A,
            CB_RESETCONTENT = 0x014B,
            CB_FINDSTRING = 0x014C,
            CB_SELECTSTRING = 0x014D,
            CB_SETCURSEL = 0x014E,
            CB_SHOWDROPDOWN = 0x014F,
            CB_GETITEMDATA = 0x0150,
            CB_SETITEMDATA = 0x0151,
            CB_GETDROPPEDCONTROLRECT = 0x0152,
            CB_SETITEMHEIGHT = 0x0153,
            CB_GETITEMHEIGHT = 0x0154,
            CB_SETEXTENDEDUI = 0x0155,
            CB_GETEXTENDEDUI = 0x0156,
            CB_GETDROPPEDSTATE = 0x0157,
            CB_FINDSTRINGEXACT = 0x0158,
            CB_SETLOCALE = 0x0159,
            CB_GETLOCALE = 0x015A,
            CB_GETTOPINDEX = 0x015B,
            CB_SETTOPINDEX = 0x015C,
            CB_GETHORIZONTALEXTENT = 0x015D,
            CB_SETHORIZONTALEXTENT = 0x015E,
            CB_GETDROPPEDWIDTH = 0x015F,
            CB_SETDROPPEDWIDTH = 0x0160,
            CB_INITSTORAGE = 0x0161
        }

        [DllImport("user32.dll", EntryPoint = "GetWindowRect")]
        public static extern bool GetWindowRect(IntPtr hwnd, out Rectangle2d rectangle);
        [DllImport("user32.dll", EntryPoint = "GetClientRect")]
        public static extern bool GetClientRect(IntPtr hWnd, out Rectangle2d lpRect);
        [DllImport("user32.dll", EntryPoint = "WindowFromPoint")]
        public static extern IntPtr HandleFromPoint(Point2d point);
        [DllImport("user32.dll", EntryPoint = "SetActiveWindow")]
        public static extern IntPtr SetActiveWindow(IntPtr hWnd);
        [DllImport("user32.dll", EntryPoint = "IsWindowVisible")]
        public static extern bool IsWindowVisible(IntPtr hWnd);
        [DllImport("user32.dll", EntryPoint = "IsWindow")]
        public static extern bool IsWindow(IntPtr hWnd);
        [DllImport("user32.dll", EntryPoint = "GetForegroundWindow")]
        public static extern IntPtr GetForegroundWindow();
        [DllImport("user32.dll", EntryPoint = "FindWindowEx")]
        public static extern IntPtr FindWindowEx(IntPtr parent, IntPtr after, string className, string windowTitle);
        [DllImport("user32.dll", EntryPoint = "GetClassName")]
        public static extern int GetClassName(IntPtr parent, StringBuilder classNameOutput, int count);
        [DllImport("user32.dll", EntryPoint = "GetAncestor")]
        public static extern IntPtr GetAncestor(IntPtr parent, AncestorTraceType flags);
        [DllImport("user32.dll", EntryPoint = "RegisterWindowMessage")]
        public static extern int RegisterWindowMessage(string message);


        public static string GetControlName(IntPtr handle)
        {
            if (!IsWindowVisible(handle))
                return string.Empty;
            if (WM_GETCONTROLNAME == -1)
                WM_GETCONTROLNAME = RegisterWindowMessage("WM_GETCONTROLNAME");
            StringBuilder sb = new StringBuilder(PROP_MAXTEXTLENGTH);
            InputBridge.SendMessage(handle, (uint)WM_GETCONTROLNAME, sb.Capacity, sb);
            return sb.ToString();
        }

        public static string GetControlText(IntPtr handle)
        {
            if (!IsWindowVisible(handle))
                return string.Empty;
            StringBuilder sb = new StringBuilder(PROP_MAXTEXTLENGTH);
            InputBridge.SendMessage(handle, (uint)SystemDefined.WM_GETTEXT, sb.Capacity, sb);
            return sb.ToString();
        }
        public static void SetText(IntPtr handle, string value)
        {
            InputBridge.SendMessage(handle, (uint)SystemDefined.WM_SETTEXT, 0, new StringBuilder(value));
        }
    }
}
#endif