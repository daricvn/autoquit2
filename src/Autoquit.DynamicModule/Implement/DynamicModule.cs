using System;
using System.IO;
using System.Reflection;

namespace Autoquit.DynamicModules.Implement
{
    public class DynamicModule : IDynamicModule
    {
        public bool IsValid => _implementedTypes.Length > 0;
        public string AssemblyName { get; private set; }
        public string FileName { get; private set; }

        public string FilePath { get; private set; }

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
        }

        public DynamicModule(string path, byte[] assembly)
        {
            Assembly dll = Assembly.Load(assembly);
            FileName = Path.GetFileNameWithoutExtension(path);
            FilePath = path;
            AssemblyName = dll.GetName().Name;
            _implementedTypes = LoadImplementTypes(dll);
        }

        protected virtual Type[] LoadImplementTypes(Assembly loadedAssembly)
            => loadedAssembly.GetTypes();

        public Type[] GetExportedTypes()
            => _implementedTypes;

        public void Dispose()
        {
            _implementedTypes = null;
        }
    }
}
