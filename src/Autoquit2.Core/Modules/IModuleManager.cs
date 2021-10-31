using Autoquit.DynamicModules;
using Autoquit.Foundation.Interfaces;
using System;
using System.Collections.Generic;

namespace Autoquit2.Core.Modules
{
    public interface IModuleManager
    {
        IEnumerable<IDynamicModule<IAutoquitModule>> LoadedModules { get; }

        IEnumerable<IAutoquitFunction> LoadModule(IDynamicModule<IAutoquitModule> module);

        int Exclude(params string[] moduleNames);
        int Include(params string[] moduleNames);
    }
}
