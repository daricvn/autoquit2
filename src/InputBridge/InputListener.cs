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
        private bool _isListening = false;

        public event InputEventHandler OnInput;

        public bool IsListening => _isListening;

        public void Start()
        {
#if WINDOWS_OS
            _hookID = SetHook(HookCallback);
#endif
            _isListening = true;
        }

        public void Stop()
        {
#if WINDOWS_OS
            if (!_isListening || _hookID == IntPtr.Zero) return;
            UnhookWindowsHookEx(_hookID);
#endif
            _isListening = false;
        }

        private IntPtr SetHook(LowLevelKeyboardProc proc)
        {
#if WINDOWS_OS
            using (Process curProcess = Process.GetCurrentProcess())
            using (ProcessModule curModule = curProcess.MainModule)
            {
                return SetWindowsHookEx(WH_KEYBOARD_LL | WH_MOUSE_LL, proc,
                    GetModuleHandle(curModule.ModuleName), 0);
            }
#else
            return IntPtr.Zero;
#endif
        }

        private delegate IntPtr LowLevelKeyboardProc(
            int nCode, IntPtr wParam, IntPtr lParam);

        private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
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
#endregion
#endif
    }
}
