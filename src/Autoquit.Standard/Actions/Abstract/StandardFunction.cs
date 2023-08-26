using Autoquit.Foundation.Interfaces;
using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using System.Collections.Generic;

namespace Autoquit.Standard.Actions.Abstract
{
    public abstract class StandardFunction : IAutoquitFunction
    {
        public abstract string AssemblyName { get; set; }
        public abstract IEnumerable<AutoquitControl> Controls { get; }
        public abstract string Description { get; }
        public abstract FunctionIcon Icon { get; set; }
        public abstract string Id { get; set; }
        public abstract int MaxLength { get; }
        public abstract string Name { get; }
        public abstract int PreferPriority { get; }
        public abstract int ReferenceEventType { get; }
        public abstract bool Execute(AutoquitMessageKeyPair keyValues);
        public abstract AutoquitMessageKeyPair BuildParams(IInputParams parameters);
    }
}