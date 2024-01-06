using Autoquit.DynamicModules.Generic.Implement;
using Autoquit.Packaging;
using System;
using System.Collections.Immutable;
using System.Reflection;

namespace Autoquit2.Core.Modules
{
    internal class AutoquitDynamicModule<T> : DynamicModule<T>, IDisposable
    {
        private readonly AlibFile _file;
        private readonly IImmutableDictionary<string, string> _loadedMap;
        private AutoquitDynamicModule(AlibFile reference, string moduleName, string modulePath) : base(moduleName, modulePath)
        {
            _file = reference;
            _loadedMap = reference.LoadMap();
            AppDomain.CurrentDomain.AssemblyResolve += CurrentDomain_AssemblyResolve;
        }

        private Assembly CurrentDomain_AssemblyResolve(object sender, ResolveEventArgs args)
        {
            if (_loadedMap == null || !_loadedMap.TryGetValue(args.Name, out var assemblyPath))
            {
                return null;
            }
            return Assembly.Load(_file.Get(assemblyPath));
        }

        public static AutoquitDynamicModule<T> LoadFrom(AlibFile file)
        {
            var mainModuleName = AlibFactory.Instance.GetMainFiles(file);
            if (string.IsNullOrEmpty(mainModuleName))
            {
                throw new ArgumentException("The input alib file was invalid");
            }
            var res = new AutoquitDynamicModule<T>(file, file.FilePath, mainModuleName);
            res.Load(file.Get(mainModuleName));
            return res;
        }

        public override void Dispose()
        {
            base.Dispose();
            _file.Dispose();
            AppDomain.CurrentDomain.AssemblyResolve -= CurrentDomain_AssemblyResolve;
        }
    }
}
