using System;

namespace Autoquit.DynamicModules
{
    public interface IDynamicModule<T> : IDisposable
    {
        /// <summary>
        /// Returns true if the module is valid
        /// </summary>
        bool IsValid { get; }
        /// <summary>
        /// Return the module's namespace
        /// </summary>
        string AssemblyName { get; }

        /// <summary>
        /// Return the module file name without extension
        /// </summary>
        string FileName { get; }
        string FilePath { get; }

        Type[] GetExportedTypes();
    }
}
