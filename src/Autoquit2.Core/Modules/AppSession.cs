using Autoquit2.CoreLib.Models;

namespace Autoquit2.Core.Modules
{
    public class AppSession
    {
        private Script _currentScript;
        internal Script CurrentScript
        {
            get
            {
                return _currentScript ??= new Script();
            }
            set
            {
                _currentScript = value;
            }
        }
    }
}
