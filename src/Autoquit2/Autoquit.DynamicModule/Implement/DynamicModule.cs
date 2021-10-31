using System;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Autoquit.DynamicModules.Implement
{
    public class DynamicModule<T> : IDynamicModule<T>
    {

        public bool IsValid { get; private set; }
        public string AssemblyName { get; private set; }
        public string FileName { get; private set; }

        public string FilePath { get; private set; }

        private Type[] _implementedTypes = Type.EmptyTypes;

        public DynamicModule(string fileName)
        {
            IsValid = false;
            if (!File.Exists(fileName))
                return;
            Assembly dll = Assembly.LoadFrom(fileName);
            FileName = Path.GetFileNameWithoutExtension(fileName);
            FilePath = fileName;
            AssemblyName = dll.GetName().Name;
            var types = dll.GetTypes();
            _implementedTypes = types.Where(type => type.GetInterface(typeof(T).FullName) != null).ToArray();
            IsValid = _implementedTypes.Length > 0;
        }

        public Type[] GetExportedTypes()
            => _implementedTypes;

        public void Dispose()
        {
            _implementedTypes = null;
        }
    }
}
