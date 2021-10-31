using Autoquit.DynamicModules;
using Autoquit.Foundation.Interfaces;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Autoquit.Foundation.Utilities
{
    public class FunctionCompiler : IDisposable
    {
        private static FunctionCompiler _singletonInstance;
        public static FunctionCompiler Instance
        {
            get
            {
                if (_singletonInstance == null)
                    _singletonInstance = new FunctionCompiler();
                return _singletonInstance;
            }
        }

        public IAutoquitFunction CreateByType(Type type, Type[] typeOfParams, params object[] parameters)
        {
            if (type.GetInterface(typeof(IAutoquitFunction).FullName) == null)
                return null;
            var makeGeneric = ExpressionCompiler.Instance.GetType().GetMethod("Create", new Type[] { typeof(Type[]), typeof(object[]) }).MakeGenericMethod(type);
            return (IAutoquitFunction)makeGeneric.Invoke(ExpressionCompiler.Instance, new object[] { typeOfParams, parameters });
        }

        public IAutoquitFunction CreateByType(Type type)
        {
            return CreateByType(type, Type.EmptyTypes);
        }

        public void Dispose()
        {
        }
    }
}
