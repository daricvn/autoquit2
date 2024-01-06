using Autoquit.DynamicModules.Implement;
using System;
using System.Linq;
using System.Reflection;

namespace Autoquit.DynamicModules.Generic.Implement
{
    public class DynamicModule<T> : DynamicModule, IDynamicModule<T>
    {
        public DynamicModule(string fileName) : base(fileName)
        {
        }

        public DynamicModule(string moduleName, byte[] assemblyData) : base(moduleName, assemblyData)
        {
        }

        protected DynamicModule(string moduleName, string modulePath) : base(moduleName, modulePath)
        {

        }

        public T CreateInstance(Type implementType)
            => CreateInstance(implementType, Type.EmptyTypes);

        public T CreateInstance(Type implementType, params object[] parameters)
            => CreateInstance(implementType, parameters?.Select(x => x.GetType()).ToArray(), parameters);

        public T CreateInstance(Type implementType, Type[] typeOfParams, params object[] parameters)
        {
            if (ExpressionCompiler.Instance.CreateByType(implementType, typeOfParams, parameters) is T obj)
                return obj;
            return default(T);
        }

        protected override Type[] LoadImplementTypes(Assembly loadedAssembly)
            => loadedAssembly.GetTypes().Where(x => x.GetInterface(typeof(T).FullName) != null).ToArray();
    }
}
