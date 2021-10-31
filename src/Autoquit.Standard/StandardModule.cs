using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Utilities;
using Autoquit.Standard.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Autoquit.Standard
{
    public class StandardModule : IAutoquitModule
    {
        public string LocalizationLocation { set; get; }

        public string Name { get; } = "Autoquit Standard Module";

        public string Description { get; } = "Autoquit Standard Module Description";

        public string Icon { get; }

        public string Version { get; }

        public string Author => "Autoquit";

        private Type[] _typeToLoad = new Type[]
        {
            typeof(MouseLeftClick)
        };

        public bool Load(out IEnumerable<IAutoquitFunction> functionList)
        {
            functionList = _typeToLoad.Select(x => FunctionCompiler.Instance.CreateByType(x)).ToList();

            return functionList.Any();
        }
    }
}
