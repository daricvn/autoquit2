namespace Autoquit2.CoreLib.Utilities
{
    internal class StandardModuleMap
    {
        private static StandardModuleMap? _instance;
        public static StandardModuleMap Instance => _instance ??= new StandardModuleMap();

        public bool MergeMouseAction(string firstAction, string secondAction, out string res)
        {
            res = secondAction;
            if (firstAction == "left-up" && secondAction == "left-down")
                res = "left-click";
            if (firstAction == "right-up" && secondAction == "right-down")
                res = "right-click";
            return res != secondAction;
        }
    }
}
