using Autoquit.DynamicModules;
using Autoquit.Foundation.Interfaces;
using Autoquit.Standard.Actions.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Autoquit.Standard
{
    public class StandardModule : IAutoquitModule
    {
        public string LocalizationLocation { set; get; } = "localization";

        public string Name { get; } = "Autoquit Standard Module";

        public string Description { get; } = "Autoquit Standard Module Description";

        public string Icon { get; }

        public string Version { get; }

        public string Author => "Autoquit";

        private Type[] _typeToLoad = new Type[]
        {
            typeof(MouseClickAction)
        };

        public bool Load(out IEnumerable<IAutoquitFunction> functionList)
        {
            functionList = _typeToLoad.Select(x => ExpressionCompiler.Instance.CreateByType(x) as IAutoquitFunction).ToList();

            return functionList.Any();
        }
    }
}
