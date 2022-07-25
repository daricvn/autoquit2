using Chromely;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Host;

namespace Autoquit2.Core.Modules
{
    internal class HookWindow : Window
    {
        public HookWindow(IChromelyNativeHost nativeHost, IChromelyConfiguration config, ChromelyHandlersResolver handlersResolver) : base(nativeHost, config, handlersResolver)
        {
            nativeHost.HostClose += NativeHost_HostClose;
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
