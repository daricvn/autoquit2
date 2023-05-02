using Autoquit2.Core.Const;
using Autoquit2.Core.Models;
using Autoquit2.Core.Models.Struct;
using Autoquit2.Core.Modules;
using Autoquit2.CoreLib.Interfaces;
using Chromely.Core.Host;
using Chromely.Core.Network;
using InputBridge;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace Autoquit2.Core.Controllers
{
    [ControllerProperty(Name = "AppController")]
    public class AppController : BaseController
    {
        private readonly IJavascriptExpression _js;
        private readonly IChromelyWindow _host;
        private HookWindow Window => _host as HookWindow;
        public AppController(IJavascriptExpression js, IConfiguration appConfig, IChromelyWindow host)
        {
            _js = js;
            _host = host;
        }

        public string AppPath => System.IO.Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);

        [RequestAction(RouteKey = "/app/init")]
        public IChromelyResponse InitializeApp(IChromelyRequest req)
        {
            if (!(req.Parameters is IDictionary<string, string> dict))
                return BadRequest(req);
            if (!dict.TryGetValue("version", out string version))
                return BadRequest(req);
            if (!version.Equals(Program.Version.ToString()))
                return NotSupported(req);
            return Ok(req);
        }


        [RequestAction(RouteKey = "/app/language")]
        public IChromelyResponse GetLanguage(IChromelyRequest req)
        {
            if (!(req.Parameters is IDictionary<string, string> dict))
                return BadRequest(req);
            if (!dict.TryGetValue("target", out string target))
                return BadRequest(req);
            var path = Path.Combine(AppPath, AppConst.LOCALIZATION_PATH, Path.ChangeExtension(target, AppConst.LOCALIZATION_EXT));
            if (!File.Exists(path))
                return NotFound(req);
            var res = File.ReadAllText(path);
            return Ok(req, res);
        }

        [RequestAction(RouteKey = "/app/processes")]
        public IChromelyResponse GetAllProcesses(IChromelyRequest req)
        {
            return Ok(req, ProcessInfo.GetAll(false, false));
        }
        [RequestAction(RouteKey = "/app/lazyprocesses")]
        public IChromelyResponse GetAllProcessesLazy(IChromelyRequest req)
        {
            foreach (var proc in ProcessInfo.EnumAll(false, false))
            {
                _js.UpdateProcess(proc);
            }
            return Ok(req);
        }
        [RequestAction(RouteKey = "/app/top")]
        public IChromelyResponse BringToTop(IChromelyRequest req)
        {
            if (req.PostData != null && int.TryParse(req.PostData.ToString(), out int res))
            {
                try
                {
                    var process = ProcessInfo.Get(res);
                    if (process == ProcessInfo.Empty || process.MainHandle == IntPtr.Zero)
                        return NotFound(req);
                    NativeAPI.Instance.BringToTop((IntPtr)process.MainHandle);
                    return Ok(req);
                }
                catch (ArgumentException)
                {
                    return NotFound(req);
                }
            }
            return BadRequest(req);
        }

        [RequestAction(RouteKey = "/app/close")]
        public IChromelyResponse Close(IChromelyRequest req)
        {
            if (Window != null)
                Window.AllowClosing = true;
            _host.Close();
            return Ok(req);
        }
    }
}
