using Autoquit2.Core.Modules;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Autoquit2.Core
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Press any key to continue...");
            //Console.Read();
            System.Threading.Thread thread = new System.Threading.Thread(() =>
            {
                AppBuilder.Create()
                    .UseApp<myChromelyApp>()
                    .UseConfig<DefaultConfiguration>(new DefaultConfiguration()
                    {
                        CefDownloadOptions = new CefDownloadOptions(true, true),
                        StartUrl = "app://autoquit2/index.html",
                        DebuggingMode = true,
                        WindowOptions = new WindowOptions()
                        {
                            Title = "Autoquit2",
                            DisableResizing = true,
                            RelativePathToIconFile = "fav.ico",
                            StartCentered = true,
                            DisableMinMaximizeControls = true,
                            Size = new WindowSize(1080,800)
                        },
                        UrlSchemes = new List<UrlScheme>()
                        {
                            new UrlScheme("app", "app", "autoquit2", string.Empty, UrlSchemeType.AssemblyResource, assemblyOptions: new AssemblyOptions(Assembly.GetExecutingAssembly(),"Autoquit2.Core", ""))
                        }
                    })
                    .Build()
                    .Run(args);
            });
            thread.Start();
        }

        private static void RunApp(IModuleManager moduleManager)
        {
        }
    }
}
