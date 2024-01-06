using Autoquit2.CoreLib.Interfaces;
using Autoquit2.CoreLib.Models;
using Chromely.Core.Configuration;
using System.Text.Json;

namespace Autoquit2.Core.JavascriptModule
{
    internal class JavascriptExpression : IJavascriptExpression
    {
        private readonly IChromelyConfiguration _configuration;
        public JavascriptExpression(IChromelyConfiguration config)
        {
            _configuration = config;
        }

        protected void Exec(string script)
        {
            _configuration.JavaScriptExecutor.ExecuteScript(script);
        }

        public void AddScriptItemAsBrief(int index, ScriptItem scriptItem)
        {
            Exec($"window.addScriptItem({index},'{scriptItem.Name}')");
        }

        public void CloseApp()
        {
            Exec("window.closeApp()");
        }

        public void UpdateProcess(object serializableObj)
        {
            string script = $"window.updateProcess({JsonSerializer.Serialize(serializableObj)})";
            Exec(script);
        }
    }
}
