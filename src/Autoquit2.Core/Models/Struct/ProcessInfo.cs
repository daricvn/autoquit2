using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using Autoquit2.Core.Utilities;

namespace Autoquit2.Core.Models.Struct
{
    struct ProcessInfo
    {
        #region Important Fields
        public static readonly ProcessInfo Empty = new ProcessInfo();
        private static readonly IReadOnlyDictionary<string, bool> _ignoreProcesses = new Dictionary<string, bool>()
        {
            { "conhost.exe", true },
            { "svchost.exe", true },
            { "dwm.exe", true },
            { "sihost.exe", true },
            { "smss.exe", true },
            { "services.exe", true }
        };
        private static readonly IReadOnlyDictionary<string, bool> _systemProcesses = new Dictionary<string, bool>()
        {
            { "explorer.exe", true },
            { "WerFault.exe", true },
            { "ntoskrnl.exe", true },
            { "backgroundtaskhost.exe", true },
            { "backgroundtransferhost.exe", true },
            { "winlogon.exe", true },
            { "wininit.exe", true },
            { "taskeng.exe", true },
            { "taskhost.exe", true },
            { "systemsettings.exe", true },
            { "textinputhost.exe", true },
            { "applicationframehost.exe", true },
            { "csrss.exe", true }
        };
        #endregion
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ext { get; set; }
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
            return Process.GetProcesses().AsParallel().Select(pc =>
            {
                try
                {
                    if (pc.HasExited || (!fetchChildren && pc.MainWindowHandle == IntPtr.Zero)
                        || pc.Id == Process.GetCurrentProcess().Id)
                        return ProcessInfo.Empty;
                    return CreateProcessInfo(pc, minimal);
                }
                catch (Exception)
                {
                    // ignore exception
                    return ProcessInfo.Empty;
                }
            })
                .Where(x=> x != Empty)
                .OrderByDescending(x=> x.Id);
        }

        public static IEnumerable<ProcessInfo> EnumAll(bool fetchChildren, bool minimal = false)
        {
            ProcessInfo info = ProcessInfo.Empty;
            foreach (var pc in Process.GetProcesses())
            {
                try
                {
                    if (pc.HasExited || (!fetchChildren && pc.MainWindowHandle == IntPtr.Zero)
                        || pc.Id == Process.GetCurrentProcess().Id)
                        continue;
                } catch (Exception)
                {
                    continue;
                }
                yield return CreateProcessInfo(pc, minimal);
            }
        }

        public static ProcessInfo Get(int targetId)
        {
            var pc = Process.GetProcessById(targetId);
            if (pc == null || pc.HasExited || pc.MainModule == null)
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

        private static ProcessInfo CreateProcessInfo(Process pc, bool minimal = false, bool includeSystemProcess = false)
        {
            try
            {
                if (pc.HasExited || (pc.MainWindowHandle == IntPtr.Zero) || pc.MainModule == null)
                    return Empty;
                var info = new ProcessInfo();
                info.Id = pc.Id;
                info.Title = GetName(pc.MainWindowTitle, pc.ProcessName);
                info.Name = info.Ext = info.Title;
                info.IconSrc = Resources.env.defaultAppIcon;
                try
                {
                    info.Name = info.Ext = GetName(pc.MainModule.FileVersionInfo.FileDescription, pc.ProcessName);
                    if (pc.MainModule.FileName != null)
                    {
                        info.Ext = Path.GetFileName(pc.MainModule.FileName);
                        if (_ignoreProcesses.ContainsKey(info.Ext.ToLower()) || (!includeSystemProcess && _systemProcesses.ContainsKey(info.Ext.ToLower())))
                            return Empty;
                        if (!minimal)
                            info.IconSrc = Icon.ExtractAssociatedIcon(pc.MainModule.FileName).ToBitmap().GetByteArray(ImageFormat.Png).ToBase64();
                    }
                }
                catch (Exception) { }
                return info;
            }
            catch (Exception)
            {
                return ProcessInfo.Empty;
            }
        }

        private static string GetName(string target, string defaultStr)
            => string.IsNullOrWhiteSpace(target) ? defaultStr : target;
    }
}
