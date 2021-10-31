using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Autoquit.DynamicModules
{
    public class ExpressionCompiler
    {
        delegate T ObjectActivator<T>(params object[] args);
        private static ExpressionCompiler _singletonInstance;
        public static ExpressionCompiler Instance
        {
            get
            {
                if (_singletonInstance == null)
                    _singletonInstance = new ExpressionCompiler();
                return _singletonInstance;
            }
        }

        private ObjectActivator<T> GetActivator<T>(ConstructorInfo ctor)
        {
            ParameterInfo[] paramsInfo = ctor.GetParameters();

            // Create a single param of type object[]
            ParameterExpression param =
                Expression.Parameter(typeof(object[]), "args");

            Expression[] argsExp =
                new Expression[paramsInfo.Length];

            // Look up parameters
            for (int i = 0; i < paramsInfo.Length; i++)
            {
                Expression index = Expression.Constant(i);
                Type paramType = paramsInfo[i].ParameterType;

                Expression paramAccessorExp =
                    Expression.ArrayIndex(param, index);

                Expression paramCastExp =
                    Expression.Convert(paramAccessorExp, paramType);

                argsExp[i] = paramCastExp;
            }

            NewExpression newExp = Expression.New(ctor, argsExp);

            LambdaExpression lambda =
                Expression.Lambda(typeof(ObjectActivator<T>), newExp, param);

            // Compile it
            ObjectActivator<T> compiled = (ObjectActivator<T>)lambda.Compile();
            return compiled;
        }

        public T Create<T>(Type[] types, params object[] parameters)
        {
            var ctor = typeof(T).GetConstructor(types);
            var activator = GetActivator<T>(ctor);
            return activator(parameters);
        }

        public T Create<T>()
        {
            return Create<T>(Type.EmptyTypes);
        }

        public object CreateByType(Type type, Type[] typeOfParams, params object[] parameters)
        {
            var makeGeneric = ExpressionCompiler.Instance.GetType().GetMethod("Create", new Type[] { typeof(Type[]), typeof(object[]) }).MakeGenericMethod(type);
            return makeGeneric.Invoke(ExpressionCompiler.Instance, new object[] { typeOfParams, parameters });
        }

        public object CreateByType(Type type)
        {
            return CreateByType(type, Type.EmptyTypes);
        }
    }
}
