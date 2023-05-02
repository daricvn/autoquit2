using Autoquit2.CoreLib.Models;

namespace Autoquit2.CoreLib.Interfaces
{
    public interface IJavascriptExpression
    {
        void UpdateProcess(object serializableObj);

        void AddScriptItemAsBrief(int index, ScriptItem scriptItem);

        void CloseApp();
    }
}
