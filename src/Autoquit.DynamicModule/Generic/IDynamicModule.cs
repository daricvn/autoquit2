using System;

namespace Autoquit.DynamicModules.Generic
{
    public interface IDynamicModule<T> : IDynamicModule
    {
        T CreateInstance(Type implementType);
        T CreateInstance(Type implementType, params object[] parameters);
        T CreateInstance(Type implementType, Type[] typeOfParams, params object[] parameters);
    }
}
