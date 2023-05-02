using InputBridge.Models.Platforms.Windows;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace InputBridge
{
    public delegate void InputEventHandler(InputEventArgs args);
    public class InputListener : IDisposable
    {
        private const int WH_KEYBOARD_LL = 13;
        private const int WH_MOUSE_LL = 14;
        private IntPtr _hookID = IntPtr.Zero;
        private IntPtr _keyHookID = IntPtr.Zero;
        private bool _isListening = false;

        public event InputEventHandler OnInput;

        public bool IsListening => _isListening;

        public void Start()
        {
#if WINDOWS_OS
            _hookID = SetHook(HookCallback, WH_MOUSE_LL);
            _keyHookID = SetHook(HookCallback, WH_KEYBOARD_LL);
            _isListening = _hookID != IntPtr.Zero && _keyHookID != IntPtr.Zero;
            // For .NET 7, a message loop is required
            while (_isListening && !GetMessage(out var msg, IntPtr.Zero, 0, 0))
            {
                TranslateMessage(ref msg);
                DispatchMessage(ref msg);
            }
#endif
        }

        public void Stop()
        {
#if WINDOWS_OS
            if (!_isListening || _hookID == IntPtr.Zero) return;
            UnhookWindowsHookEx(_hookID);
#endif
            _isListening = false;
        }

        private IntPtr SetHook(LowLevelKeyboardProc proc, int type)
        {
#if WINDOWS_OS
            using (Process curProcess = Process.GetCurrentProcess())
            using (ProcessModule curModule = curProcess.MainModule)
            {
                return SetWindowsHookEx(type, proc, GetModuleHandle(curModule.ModuleName), 0);
            }
#else
            return IntPtr.Zero;
#endif
        }

        private delegate IntPtr LowLevelKeyboardProc(
            int nCode, IntPtr wParam, IntPtr lParam);

        public IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0)
            {
                OnInput?.Invoke(new InputEventArgs(nCode, wParam, lParam));
            }
#if WINDOWS_OS
            return CallNextHookEx(_hookID, nCode, wParam, lParam);
#else
            return IntPtr.Zero;
#endif
        }

        public void Dispose()
        {
            Stop();
        }

#if WINDOWS_OS
#region USER32.DLL
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "SetWindowsHookEx")]
        private static extern IntPtr SetWindowsHookEx(int idHook,
            LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "UnhookWindowsHookEx")]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "CallNextHookEx")]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode,
            IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "GetModuleHandle")]
        private static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "GetMessage")]
        public static extern bool GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "TranslateMessage")]
        public static extern bool TranslateMessage([In] ref MSG lpMsg);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true, EntryPoint = "DispatchMessage")]
        public static extern IntPtr DispatchMessage([In] ref MSG lpmsg);

        #endregion
#endif
    }
}
