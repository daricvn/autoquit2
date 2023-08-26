using Autoquit.Foundation.Interfaces;
using InputBridge.Models.Platforms.Windows;

namespace Autoquit2.CoreLib.Models.Data
{
    internal struct InputEvent : IInputEvent
    {
        public int EventType { get; }

        public IInputParams Parameters { get; }

        public InputEvent(InputEventArgs args)
        {
            EventType = args.Code;
            Parameters = new InputParameter(args);
        }
    }
}
