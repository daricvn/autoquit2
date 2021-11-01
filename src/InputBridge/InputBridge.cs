using InputBridge.Models;
using System;
using System.Reflection;
using System.Runtime.InteropServices;
using InputBridge.Utilities;
using System.Text;

#if WINDOWS_OS
using InputBridge.Models.Platforms.Windows;
#endif

namespace InputBridge
{
    [Obfuscation]
    public static class InputBridge
    {
#if WINDOWS_OS
        [DllImport("user32.dll", EntryPoint = "PostMessage")]
        internal static extern bool PostMessage(IntPtr hWnd, uint Msg, int wParam, int lParam);
        [DllImport("user32.dll", EntryPoint = "SendMessage")]
        internal static extern int SendMessage(IntPtr hWnd, uint Msg, int wParam, int lParam);
        [DllImport("user32.dll", EntryPoint = "SendMessage")]
        internal static extern int SendMessage(IntPtr hWnd, uint Msg, int wParam, StringBuilder lParam);
        [DllImport("user32.dll", EntryPoint = "SetCursorPos")]
        internal static extern int SetCursorPosition(int x, int y);
        [DllImport("user32.dll", EntryPoint = "GetCursorPos")]
        internal static extern bool GetCursorPosition(out Point2d lpPoint);
        [DllImport("user32.dll", EntryPoint = "SendInput", SetLastError = true)]
        internal static extern uint SendInput(uint nInputs, WindowInput[] pInputs, int cbSize);
        [DllImport("user32.dll", EntryPoint = "GetMessageExtraInfo")]
        internal static extern IntPtr GetMessageExtraInfo();
#endif
        public static void SetCursorPosition(Point2d location)
            => SetCursorPosition(location.X, location.Y);

        public static void MoveMouse(Point2d location, bool drag = false)
        {
#if WINDOWS_OS
            WindowInput[] inputs = new WindowInput[]
            {
                new WindowInput()
                {
                    type = (int) WindowInputType.Mouse,
                    u = new WindowInputMessage()
                    {
                        mi = new WindowMouseInput()
                        {
                            dx = location.X,
                            dy = location.Y,
                            dwFlags = (uint) (MouseEventF.Absolute | MouseEventF.Move | (drag ? MouseEventF.LeftDown : 0x00)),
                            dwExtraInfo = GetMessageExtraInfo()
                        }
                    }
                }
            };
            SendInput(1, inputs, Marshal.SizeOf<WindowInput>());
#endif
        }

        public static void SendMouse(MouseEventType type, Point2d? location = null)
        {
#if WINDOWS_OS
            WindowInput[] inputs = new WindowInput[]
            {
                new WindowInput()
                {
                    type = (int) WindowInputType.Mouse,
                    u = new WindowInputMessage()
                    {
                        mi = new WindowMouseInput()
                        {
                            dwFlags = (uint) type.ToWindowsMouseEvent(),
                            dwExtraInfo = GetMessageExtraInfo()
                        }
                    }
                }
            };
            if (location != null)
                SetCursorPosition(location.Value);
            SendInput(1, inputs, Marshal.SizeOf<WindowInput>());
#endif
        }

        public static void SendKey(KeyboardEventType type, KeyCode key)
        {
#if WINDOWS_OS
            WindowInput[] inputs = new WindowInput[]
            {
                new WindowInput()
                {
                    type = (int) WindowInputType.Keyboard,
                    u = new WindowInputMessage()
                    {
                        ki = new WindowKeyboardInput()
                        {
                            wVk = 0,
                            wScan = (ushort) key.ToScanCode(),
                            dwFlags = (uint) (type.ToWindowsKeyEvent() | KeyEventF.Scancode),
                            dwExtraInfo = GetMessageExtraInfo()
                        }
                    }
                }
            };
            SendInput(1, inputs, Marshal.SizeOf<WindowInput>());
#endif
        }
    }
}
