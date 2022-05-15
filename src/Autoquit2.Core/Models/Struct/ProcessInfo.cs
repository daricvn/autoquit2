using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using Autoquit2.Core.Utilities;

namespace Autoquit2.Core.Models.Struct
{
    struct ProcessInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string IconSrc { get; set; }

        public static IEnumerable<ProcessInfo> GetAll(bool fetchChildren, bool minimal = false, string appDefaultIcon = null)
        {
            var res = new List<ProcessInfo>();
            foreach (var pc in Process.GetProcesses())
                try
                {
                    if (pc.HasExited || (!fetchChildren && pc.MainWindowHandle == IntPtr.Zero)
                        || pc.Id == Process.GetCurrentProcess().Id)
                        continue;
                    var info = new ProcessInfo();
                    info.Id = pc.Id;
                    info.Title = GetName(pc.MainWindowTitle, pc.ProcessName);
                    info.Name = info.Title;
                    info.IconSrc = appDefaultIcon;
                    try
                    {
                        info.Name = GetName(pc.MainModule?.FileVersionInfo?.FileDescription, pc.ProcessName);
                        if (pc.MainModule?.FileName != null && !minimal)
                            info.IconSrc = Icon.ExtractAssociatedIcon(pc.MainModule.FileName).ToBitmap().GetByteArray(ImageFormat.Png).ToBase64();
                    }
                    catch (Exception) { 

                    }
                    res.Add(info);
                }
                catch (Exception)
                {
                    // ignore exception
                }
            return res;
        }

        private static string GetName(string target, string defaultStr)
            => string.IsNullOrWhiteSpace(target) ? defaultStr : target;
    }
}
