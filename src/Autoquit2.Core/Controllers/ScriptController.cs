using Autoquit2.Core.Models;
using Autoquit2.Core.Modules;
using Autoquit2.CoreLib.Interfaces;
using Autoquit2.CoreLib.Utilities;
using Chromely.Core.Network;
using InputBridge;
using System;
using System.Diagnostics;

namespace Autoquit2.Core.Controllers
{
    [ControllerProperty(Name = "ScriptController")]
    public class ScriptController : BaseController
    {
        private readonly IJavascriptExpression _js;
        private readonly AppSession _session;
        private readonly InputListener _listener;
        private readonly Stopwatch _watch;
        public ScriptController(IJavascriptExpression js, AppSession session, InputListener listener)
        {
            _js = js;
            _session = session;
            _listener = listener;
            _listener.OnInput += OnUserInput;
            _watch = new Stopwatch();
        }

        private void OnUserInput(InputBridge.Models.Platforms.Windows.InputEventArgs args)
        {
            if (args.Code < 0) return;
            if (ScriptItemFactory.Instance.TryCreate(args, Convert.ToInt32(_watch.ElapsedMilliseconds), out var item))
            {
                _session.CurrentScript.Scripts.Add(item);
                _js.AddScriptItemAsBrief(_session.CurrentScript.Scripts.Count - 1, item);
            }
            _watch.Restart();
        }

        [RequestAction(RouteKey = "/script/record/start")]
        public IChromelyResponse StartRecord(IChromelyRequest req)
        {
            if (_listener.IsListening) return BadRequest(req);
            _listener.Start();
            _watch.Start();
            return Ok(req);
        }
        [RequestAction(RouteKey = "/script/record/stop")]
        public IChromelyResponse StopRecord(IChromelyRequest req)
        {
            if (!_listener.IsListening) return BadRequest(req);
            _listener.Stop();
            _watch.Stop();
            return Ok(req);
        }
    }
}
