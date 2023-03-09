using Autoquit2.Core.Models;
using InputBridge.Models.Platforms.Windows;
using InputBridge.Utilities;
using System;
using System.Collections.Generic;

namespace Autoquit2.Core.Utilities
{
    internal class ScriptItemFactory : IDisposable
    {
        private const string STANDARD_MODULE = "Autoquit.Standard.alib";
        private const int MERGE_DELAY_THRESHOLD = 1000;
        private static ScriptItemFactory _instance;
        public static ScriptItemFactory Instance => _instance ??= new ScriptItemFactory();
        private ScriptItem _lastItem;

        public ScriptItem LastItem => _lastItem;
        public bool TryCreate(InputEventArgs args, int delay, out ScriptItem res)
        {
            res = null;
            if (args.MouseType != InputBridge.Models.MouseEventType.NONE)
            {
                var mouseEvent = StandardModuleMap.Instance.GetMouseEvent(args.MouseType);
                if (_lastItem.Name == mouseEvent) return false;
                if (_lastItem == null || delay >= MERGE_DELAY_THRESHOLD || !StandardModuleMap.Instance.MergeMouseAction(_lastItem.Name, mouseEvent, out mouseEvent))
                {
                    _lastItem = res = new ScriptItem(STANDARD_MODULE, mouseEvent, new Dictionary<string, object>()
                    {
                        { "mouse-coordinate", args.LastParam.ToCoordinate().ToString() }
                    }, delay);
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
