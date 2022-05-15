using Autoquit2.Core.Models;
using Autoquit2.Core.Models.Struct;
using Chromely.Core.Configuration;
using Chromely.Core.Network;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Autoquit2.Core.Controllers
{
    [ControllerProperty(Name = "AppController")]
    public class AppController : BaseController
    {
        private readonly IChromelyConfiguration _config;
        private readonly IConfiguration _appConfig;
        public AppController(IChromelyConfiguration config, IConfiguration appConfig)
        {
            _config = config;
            _appConfig = appConfig;
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
            return Ok(req, ProcessInfo.GetAll(false, false, _appConfig.GetValue<string>("defaultAppIcon")));
        }
    }
}
