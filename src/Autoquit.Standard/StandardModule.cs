using Autoquit.DynamicModules;
using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Utilities;
using Autoquit.Standard.Actions;
using Autoquit.Standard.Actions.Abstract;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;

namespace Autoquit.Standard
{
    public class StandardModule : IAutoquitModule
    {
        public string LocalizationLocation { set; get; } = "localization";

        public string Name { get; } = "Autoquit Standard Module";

        public string Description { get; } = "Autoquit Standard Module Description";

        public string Icon { get; }

        public string Version => "1.0.0.0";

        public string Author => "Autoquit";

        private Type[] _typeToLoad = new Type[]
        {
            typeof(MouseLeftClick)
        };

        private IReadOnlyDictionary<int, StandardFunction> _functionMapper;

        public bool Load(out IEnumerable<IAutoquitFunction> functionList)
        {
            functionList = _typeToLoad.Select(x => ExpressionCompiler.Instance.CreateByType(x) as IAutoquitFunction).ToList();
            _functionMapper = functionList.OfType<StandardFunction>().ToDictionary(x => x.ReferenceEventType, value => value);

            return functionList.Any();
        }

        public bool TryParse(IInputEvent inputEvent, out IAutoquitFunction autoquitFunction, out AutoquitMessageKeyPair builtParameters)
        {
            autoquitFunction = null;
            builtParameters = ImmutableDictionary<string, string>.Empty;
            if (_functionMapper == null || !_functionMapper.TryGetValue(inputEvent.EventType, out var func))
            {
                return false;
            }
            builtParameters = func.BuildParams(inputEvent.Parameters);
            return builtParameters.Any();
        }

        public override bool Equals(object obj)
        {
            if (obj is StandardModule other)
            {
                return Name == other.Name && Description == other.Description && Author == other.Author && Version == other.Version;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Name, Description, Author, Version, "Autoquit.Standard");
        }
    }
}
