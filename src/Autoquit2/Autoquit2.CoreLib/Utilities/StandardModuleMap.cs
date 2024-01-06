using Autoquit2.CoreLib.Const;

namespace Autoquit2.CoreLib.Utilities
{
    internal class StandardModuleMap
    {
        private static StandardModuleMap? _instance;
        public static StandardModuleMap Instance => _instance ??= new StandardModuleMap();

        public bool MergeMouseAction(string firstAction, string secondAction, out string res)
        {
            res = secondAction;
            if (firstAction == StandardModuleMouseKeys.MouseLeftUp && secondAction == StandardModuleMouseKeys.MouseLeftDown)
                res = StandardModuleMouseKeys.MouseLeftClick;
            if (firstAction == StandardModuleMouseKeys.MouseRightUp && secondAction == StandardModuleMouseKeys.MouseRightDown)
                res = StandardModuleMouseKeys.MouseRightClick;
            return res != secondAction;
        }
    }
}
