using System;
using System.IO;
using System.Reflection;

namespace Autoquit.DynamicModules.Implement
{
    public class DynamicModule : IDynamicModule, IDisposable
    {
        public bool IsValid => _implementedTypes.Length > 0;
        public string AssemblyName { get; private set; }
        public string FileName { get; private set; }

        public string FilePath { get; private set; }

        public bool IsLoaded { get; protected set; }

        private Type[] _implementedTypes = Type.EmptyTypes;

        public DynamicModule(string fileName)
        {
            if (!File.Exists(fileName))
                throw new FileNotFoundException($"Assembly does not exist: {fileName}");
            Assembly dll = Assembly.LoadFrom(fileName);
            FileName = Path.GetFileNameWithoutExtension(fileName);
            FilePath = fileName;
            AssemblyName = dll.GetName().Name;
            _implementedTypes = LoadImplementTypes(dll);
            IsLoaded = true;
        }

        public DynamicModule(string path, byte[] assembly)
        {
            FileName = Path.GetFileNameWithoutExtension(path);
            FilePath = path;
            Load(assembly);
        }

        /// <summary>
        /// A lazy method to create a lazy load module
        /// </summary>
        /// <param name="assemblyName"></param>
        /// <param name="assemblyPath"></param>
        protected DynamicModule(string assemblyName, string assemblyPath)
        {
            FileName = Path.GetFileNameWithoutExtension(assemblyName);
            FilePath = assemblyPath;
        }

        public void Load(byte[] assembly)
        {
            Assembly dll = Assembly.Load(assembly);
            AssemblyName = dll.GetName().Name;
            _implementedTypes = LoadImplementTypes(dll);
            IsLoaded = true;
        }

        protected virtual Type[] LoadImplementTypes(Assembly loadedAssembly)
            => loadedAssembly.GetTypes();

        public Type[] GetExportedTypes()
            => _implementedTypes;

        public virtual void Dispose()
        {
            _implementedTypes = null;
        }
    }
}