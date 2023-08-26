using Autoquit.Foundation.Interfaces;
using InputBridge.Models.Platforms.Windows;

namespace Autoquit2.CoreLib.Models.Data
{
    internal struct InputParameter : IInputParams
    {
        public int Count => 2;

        private readonly IntPtr _firstParam;

        private readonly IntPtr _secondParam;

        public InputParameter(InputEventArgs args)
        {
            _firstParam = args.FirstParam;
            _secondParam = args.LastParam;
        }

        public object GetParams(int index)
        {
            if (index == 0)
            {
                return _firstParam;
            }
            return _secondParam;
        }
    }
}
