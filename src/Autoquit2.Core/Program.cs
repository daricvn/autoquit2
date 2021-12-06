using Autoquit2.Core.Modules;
using Autoquit2.Core.Modules.Implement;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;

namespace Autoquit2.Core
{
    class Program
    {
        private const string CEF_INSTALLER = "__install_cef";
        static void Main(string[] args)
        {
            RunApp(ModuleManager.Instance);
        }

        private static void RunApp(IModuleManager moduleManager)
        {
            using (var cefInstaller = new CefInstaller(CEF_INSTALLER))
            {
                if (cefInstaller.ShouldInstall)
                    cefInstaller.Install();
            }
            AppBuilder.Create()
                .UseApp<Modules.ChromelyApp>()
                .UseConfig<DefaultConfiguration>(new DefaultConfiguration()
                {
                    CefDownloadOptions = new CefDownloadOptions(false, true),
                    StartUrl = "app://autoquit2/index.html",
                    DebuggingMode = Debugger.IsAttached,
                    WindowOptions = new WindowOptions()
                    {
                        Title = "Autoquit2",
                        DisableResizing = true,
                        RelativePathToIconFile = "fav.ico",
                        StartCentered = true,
                        DisableMinMaximizeControls = true,
                        Size = new WindowSize(1080, 800)
                    },
                    UrlSchemes = new List<UrlScheme>()
                    {
                            new UrlScheme("app", "app", "autoquit2", string.Empty, UrlSchemeType.AssemblyResource, assemblyOptions: new AssemblyOptions(Assembly.GetExecutingAssembly(),"Autoquit2.Core", ""))
                    }
                })
                .Build()
                .Run(Array.Empty<string>());
        }
    }
}
