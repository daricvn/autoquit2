using Autoquit.DynamicModules.Generic;
using Autoquit.Foundation.Interfaces;

namespace Autoquit2.CoreLib.Interfaces
{
    public interface IAppModuleService
    {
        /// <summary>
        /// Loaded module list
        /// </summary>
        IEnumerable<IAutoquitModule> AllModules { get; }

        /// <summary>
        /// Available not yet loaded modules
        /// </summary>
        IEnumerable<IDynamicModule<IAutoquitModule>> AvailableModules { get; }

        IEnumerable<IAutoquitFunction> LoadModule(IDynamicModule<IAutoquitModule> module);

        int Exclude(params string[] moduleNames);

        int Include(params string[] moduleNames);
    }
}