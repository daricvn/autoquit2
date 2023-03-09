using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Host;

namespace Autoquit2.Core.Modules
{
    internal class HookWindow : Window
    {
        public bool AllowClosing { get; set; }
        public HookWindow(IChromelyNativeHost nativeHost, IChromelyConfiguration config, ChromelyHandlersResolver handlersResolver) : base(nativeHost, config, handlersResolver)
        {
            nativeHost.HostClose += NativeHost_HostClose;
            if (nativeHost is Hooks.AutoquitHost host)
                host.OnClosing += Host_OnClosing;
        }

        private void Host_OnClosing(object sender, Hooks.ClosingEventArgs e)
        {
            e.Cancel = !AllowClosing;
            if (e.Cancel)
            {
                _config.JavaScriptExecutor?.ExecuteScript("window.closeApp()");
            }
        }

        private void NativeHost_HostClose(object sender, CloseEventArgs e)
        {
        }

        public override void Close()
        {
            base.Close();
        }
    }
}
