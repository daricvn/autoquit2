using Autoquit.Foundation.Interfaces;
using System;
using System.Collections.Generic;

namespace Autoquit.Standard
{
    public class StandardModule : IAutoquitModule
    {
        public string LocalizationLocation { set; get; }

        public string Name { get; } = "Autoquit Standard Module";

        public string Description { get; } = "Autoquit Standard Module Description";

        public string Icon { get; }

        public string Version { get; }

        public string Author => throw new NotImplementedException();

        public bool Load(out IEnumerable<IAutoquitFunction> functionList)
        {
            throw new NotImplementedException();
        }
    }
}
