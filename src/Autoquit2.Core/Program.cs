using Autoquit2.Core.Const;
using Autoquit2.Core.Modules.Implement;
using Autoquit2.CoreLib.Interfaces;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;

namespace Autoquit2.Core
{
    [Obfuscation(Exclude = true, ApplyToMembers = true)]
    class Program
    {
        internal static Version Version => Assembly.GetExecutingAssembly().GetName().Version;

        static void Main(string[] args)
        {

        }

        internal static IAppModuleService GetModuleManager()
            => ModuleManager.Instance;

        private static void RunApp(IAppModuleService moduleManager)
        {
            AppBuilder.Create()
                .UseApp<Modules.ChromelyApp>()
                .UseWindow<Modules.HookWindow>()
                .UseConfig<DefaultConfiguration>(new DefaultConfiguration()
                {
                    CefDownloadOptions = new CefDownloadOptions(false, true),
                    StartUrl = "app://autoquit2/index.html",
                    DebuggingMode = Debugger.IsAttached,
                    WindowOptions = new WindowOptions()
                    {
                        Title = "Autoquit2",
                        DisableResizing = false,
                        RelativePathToIconFile = "fav.ico",
                        StartCentered = true,
                        DisableMinMaximizeControls = false,
                        Size = new WindowSize(1080, 700),
                        MinimumSize = new System.Drawing.Size(960, 576)
                    },
                    UrlSchemes = new List<UrlScheme>()
                    {
                        new UrlScheme("app", "app", "autoquit2", string.Empty, UrlSchemeType.AssemblyResource, assemblyOptions: new AssemblyOptions(Assembly.GetExecutingAssembly(), "Autoquit2.Core", "")),
                        new UrlScheme("http", AppConst.APP_HOST, UrlSchemeType.LocalRquest)
                    },
                    CommandLineArgs = new Dictionary<string, string>()
                    {
                        ["js-flags"] = "--expose_gc"
                    },
                    CommandLineOptions = new List<string>()
                    {
                        "disable-extensions",
                        "disable-speech-api"
                    }
                })
                .Build()
                .Run(Array.Empty<string>());
        }
    }
}
