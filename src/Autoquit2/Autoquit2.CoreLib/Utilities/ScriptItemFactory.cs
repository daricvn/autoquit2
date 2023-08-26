using Autoquit.Foundation.Interfaces;
using Autoquit2.CoreLib.Models;
using Autoquit2.CoreLib.Models.Data;
using InputBridge.Models.Platforms.Windows;

namespace Autoquit2.CoreLib.Utilities
{
    public class ScriptItemFactory : IDisposable
    {
        private const int MERGE_DELAY_THRESHOLD = 800;
        private static ScriptItemFactory? _instance;
        public static ScriptItemFactory Instance => _instance ??= new ScriptItemFactory();
        private ScriptItem? _lastItem;

        public ScriptItem? LastItem => _lastItem;
        public bool TryCreate(IEnumerable<IAutoquitModule> modules, InputEventArgs args, int delay, out ScriptItem? res)
        {
            res = null;
            foreach (var module in modules)
            {
                var input = new InputEvent(args);
                if (!module.TryParse(input, out var function, out var parameters))
                {
                    continue;
                }
                string mouseEvent = function.Name;
                if (_lastItem == null || delay >= MERGE_DELAY_THRESHOLD || !StandardModuleMap.Instance.MergeMouseAction(_lastItem.Name, function.Name, out mouseEvent))
                {
                    _lastItem = res = new ScriptItem(function.AssemblyName, mouseEvent, parameters, delay);
                }
                else
                {
                    _lastItem.Name = mouseEvent;
                    _lastItem.Delay += delay / 2;
                    res = _lastItem;
                    return false;
                }
            }
            return res != null;
        }

        public void Dispose()
        {
        }
    }
}
