using Autoquit2.Core.Models;
using Autoquit2.Core.Models.Struct;
using Autoquit2.Core.Modules;
using Chromely.Core.Configuration;
using Chromely.Core.Host;
using Chromely.Core.Network;
using InputBridge;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Autoquit2.Core.Controllers
{
    [ControllerProperty(Name = "AppController")]
    public class AppController : BaseController
    {
        private readonly IChromelyConfiguration _config;
        private readonly IConfiguration _appConfig;
        private readonly IChromelyWindow _host;
        private HookWindow Window => _host as HookWindow;
        public AppController(IChromelyConfiguration config, IConfiguration appConfig, IChromelyWindow host)
        {
            _config = config;
            _appConfig = appConfig;
            _host = host;
        }

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
                string script = $"window.updateProcess({JsonConvert.SerializeObject(proc)})";
                _config.JavaScriptExecutor.ExecuteScript(script);
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
