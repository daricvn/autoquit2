using System;
using Chromely.Core.Configuration;
using Chromely.Core.Host;
using Chromely.NativeHost;

namespace Autoquit2.Core.Modules.Hooks
{
    internal class AutoquitHost : ChromelyWinHost
    {
        private const uint WM_CLOSE = 0x0010;

        public event EventHandler<ClosingEventArgs> OnClosing;

        public AutoquitHost(IWindowMessageInterceptor messageInterceptor, IKeyboadHookHandler keyboadHandler)
            : base(messageInterceptor, keyboadHandler)
        {
        }

        protected override IntPtr WndProc(IntPtr hWnd, uint message, IntPtr wParam, IntPtr lParam)
        {
            switch (message)
            {
                case WM_CLOSE:
                    var args = new ClosingEventArgs();
                    OnClosing?.Invoke(this, args);
                    if (args.Cancel)
                        return IntPtr.Zero;
                    break;
            }
            return base.WndProc(hWnd, message, wParam, lParam);
        }
    }

    internal class ClosingEventArgs : CloseEventArgs
    {
        public bool Cancel { get; set; }
    }
}
