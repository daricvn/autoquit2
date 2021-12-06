using Autoquit.Modules;
using System;
using System.Linq;
using System.Reflection;

namespace Autoquit
{
    class Program
    {
        private const string CEF_INSTALLER = "__install_cef";
        static void Main(string[] args)
        {
            var cefInstaller = new CefInstaller(CEF_INSTALLER);
            if (cefInstaller.ShouldInstall)
                cefInstaller.Install();
            var assembly = Assembly.LoadFile(System.IO.Path.Combine(Environment.CurrentDirectory, "Autoquit2.Core.dll"));
            var type = assembly.GetTypes().FirstOrDefault(x=> x.Name == "Program");
            if (type != null)
            {
                var method = type.GetMethod("RunApp", BindingFlags.Static | BindingFlags.NonPublic);
                var implement = type.GetMethod("GetModuleManager", BindingFlags.Static | BindingFlags.NonPublic);
                var moduleManager = implement.Invoke(null, null);
                method?.Invoke(null, new object[] { moduleManager });
            }
        }

    }
}
