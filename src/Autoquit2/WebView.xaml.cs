using Autoquit2._Constant;
using Autoquit2.Handlers;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System;
using System.Threading.Tasks;
using System.Windows;

namespace Autoquit2
{
    /// <summary>
    /// Interaction logic for WebView.xaml
    /// </summary>
    public partial class WebView : Window
    {
        public static WebView Instance { get; protected set; }
        public static bool IsReady { get; protected set; }

        private AssemblyInterfaceHandler uiHandler = new AssemblyInterfaceHandler("autoquit");

        public WebView()
        {
            InitializeComponent();
            mainWebView.CoreWebView2Ready += MainWebView_Initialized;
            Instance = this;
            uiHandler.AddHtml("index.html", "<html><body>Hello World</body></html>");
        }

        private void MainWebView_Initialized(object sender, System.EventArgs e)
        {
            IsReady = true;
            mainWebView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
            mainWebView.CoreWebView2.AddWebResourceRequestedFilter("*", CoreWebView2WebResourceContext.All);
            mainWebView.CoreWebView2.WebResourceRequested += CoreWebView2_WebResourceRequested;
            SetLocation(uiHandler.ConsumeUrl);
        }


        private void CoreWebView2_WebResourceRequested(object sender, CoreWebView2WebResourceRequestedEventArgs e)
        {
            if (uiHandler.IsValidUrl(e.Request.Uri))
            {
                var item = mainWebView.CoreWebView2.Environment.CreateWebResourceResponse(uiHandler.Resolve(e.Request.Uri), 200, null, null);
                e.Response = item;
            }
        }

        private void MainWebView_ContextMenuOpening(object sender, System.Windows.Controls.ContextMenuEventArgs e)
        {
            e.Handled = true;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
        }

        public void SetLocation(string url)
        {
            mainWebView.Source = new Uri(url);
        }

        private void Window_Closed(object sender, System.EventArgs e)
        {
            Environment.Exit(0);
        }
    }
}
