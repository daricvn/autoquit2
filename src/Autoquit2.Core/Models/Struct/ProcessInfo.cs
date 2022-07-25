using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using Autoquit2.Core.Utilities;

namespace Autoquit2.Core.Models.Struct
{
    struct ProcessInfo
    {
        public static readonly ProcessInfo Empty = new ProcessInfo();
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string IconSrc { get; set; }
        public IntPtr MainHandle { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is ProcessInfo info)
                return info.Id == Id;
            return false;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public static bool operator ==(ProcessInfo a, ProcessInfo b)
            => a.Equals(b);
        public static bool operator !=(ProcessInfo a, ProcessInfo b)
            => !a.Equals(b);

        public static IEnumerable<ProcessInfo> GetAll(bool fetchChildren, bool minimal = false)
        {
            var res = new ConcurrentBag<ProcessInfo>();
            Process.GetProcesses().AsParallel().ForAll(pc =>
            {
                try
                {
                    if (pc.HasExited || (!fetchChildren && pc.MainWindowHandle == IntPtr.Zero)
                        || pc.Id == Process.GetCurrentProcess().Id)
                        return;
                    var info = new ProcessInfo();
                    info.Id = pc.Id;
                    info.Title = GetName(pc.MainWindowTitle, pc.ProcessName);
                    info.Name = info.Title;
                    info.IconSrc = Resources.env.defaultAppIcon;
                    try
                    {
                        info.Name = GetName(pc.MainModule?.FileVersionInfo?.FileDescription, pc.ProcessName);
                        if (pc.MainModule?.FileName != null && !minimal)
                            info.IconSrc = Icon.ExtractAssociatedIcon(pc.MainModule.FileName).ToBitmap().GetByteArray(ImageFormat.Png).ToBase64();
                    }
                    catch (Exception)
                    {

                    }
                    res.Add(info);
                }
                catch (Exception)
                {
                    // ignore exception
                }
            });
            return res.OrderByDescending(x=> x.Id);
        }

        public static ProcessInfo Get(int targetId)
        {
            var pc = Process.GetProcessById(targetId);
            if (pc == null)
                return ProcessInfo.Empty;
            var info = new ProcessInfo();
            info.Id = pc.Id;
            info.Title = GetName(pc.MainWindowTitle, pc.ProcessName);
            info.Name = info.Title;
            info.MainHandle = pc.MainWindowHandle;
            info.IconSrc = Resources.env.defaultAppIcon;
            try
            {
                info.Name = GetName(pc.MainModule?.FileVersionInfo?.FileDescription, pc.ProcessName);
                if (pc.MainModule?.FileName != null)
                    info.IconSrc = Icon.ExtractAssociatedIcon(pc.MainModule.FileName).ToBitmap().GetByteArray(ImageFormat.Png).ToBase64();
            }
            catch (Exception)
            {

            }
            return info;
        }

        private static string GetName(string target, string defaultStr)
            => string.IsNullOrWhiteSpace(target) ? defaultStr : target;
    }
}
