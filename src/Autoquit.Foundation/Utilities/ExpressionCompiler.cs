using Autoquit.Foundation.Interfaces;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Autoquit.Foundation.Utilities
{
    public class ExpressionCompiler : IDisposable
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
            Type type = ctor.DeclaringType;
            ParameterInfo[] paramsInfo = ctor.GetParameters();

            //create a single param of type object[]
            ParameterExpression param =
                Expression.Parameter(typeof(object[]), "args");

            Expression[] argsExp =
                new Expression[paramsInfo.Length];

            //pick each arg from the params array 
            //and create a typed expression of them
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

            //make a NewExpression that calls the
            //ctor with the args we just created
            NewExpression newExp = Expression.New(ctor, argsExp);

            //create a lambda with the New
            //Expression as body and our param object[] as arg
            LambdaExpression lambda =
                Expression.Lambda(typeof(ObjectActivator<T>), newExp, param);

            //compile it
            ObjectActivator<T> compiled = (ObjectActivator<T>)lambda.Compile();
            return compiled;
        }

        public T Create<T>(Type[] types, params object[] parameters) where T : IAutoquitFunction
        {
            var ctor = typeof(T).GetConstructor(types);
            var activator = GetActivator<T>(ctor);
            return activator(parameters);
        }

        public T Create<T>() where T : IAutoquitFunction
        {
            return Create<T>(Type.EmptyTypes);
        }

        public IAutoquitFunction CreateByType(Type type, Type[] typeOfParams, params object[] parameters)
        {
            if (!type.IsAssignableFrom(typeof(IAutoquitFunction)))
                return null;
            var makeGeneric = this.GetType().GetMethod("Create", new Type[] { typeof(Type[]), typeof(object[]) }).MakeGenericMethod(type);
            return (IAutoquitFunction)makeGeneric.Invoke(this, new object[] { typeOfParams, parameters });
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
