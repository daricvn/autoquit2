using Autoquit2.CoreLib.Interfaces;
using Autoquit2.CoreLib.Interfaces.Attributes;
using Autoquit2.CoreLib.Interfaces.EnumProps;
using Autoquit2.CoreLib.Models.Data;
using System.Reflection;

namespace Autoquit2.CoreLib
{
    public class AutoquitServiceContainer : IServiceContainer
    {
        private object? _syncLock = default!;
        private IDictionary<Type, ServiceData>? _services;

        private IDictionary<Type, ServiceData> Container
        {
            get
            {
                return LazyInitializer.EnsureInitialized(ref _services, ref _syncLock, () => new Dictionary<Type, ServiceData>() as IDictionary<Type, ServiceData>);
            }
        }

        public IServiceContainer Register<TInterface, TImplementation>(ServiceLifespan lifespan = ServiceLifespan.Singleton)
            where TInterface : class
            where TImplementation : TInterface
        {
            if (Container.TryGetValue(typeof(TInterface), out var service))
            {
                throw new InvalidOperationException("Already registered");
            }
            Func<object> initializer = () =>
            {
                var ctorInfo = typeof(TImplementation).GetConstructors(BindingFlags.Public | BindingFlags.Instance).OrderByDescending(x => x.GetParameters()?.Length ?? 0).FirstOrDefault();
                return Activator.CreateInstance(typeof(TImplementation), BuildConstructorParams(ctorInfo))!;
            };
            Container[typeof(TInterface)] = new ServiceData(initializer, lifespan);
            return this;
        }

        public IServiceContainer Register<TInterface>(Func<TInterface> initializer, ServiceLifespan lifespan = ServiceLifespan.Singleton) where TInterface : class
        {
            if (Container.TryGetValue(typeof(TInterface), out var service))
            {
                throw new InvalidOperationException("Already registered");
            }
            Container[typeof(TInterface)] = new ServiceData(initializer, lifespan);
            return this;
        }

        public IServiceContainer Register<TInterface>(TInterface instance, ServiceLifespan lifespan = ServiceLifespan.Singleton) where TInterface : class
        {
            if (Container.TryGetValue(typeof(TInterface), out var service))
            {
                throw new InvalidOperationException("Already registered");
            }
            Container[typeof(TInterface)] = new ServiceData(() => instance, lifespan);
            return this;
        }

        public TInterface? Resolve<TInterface>() where TInterface : class
        {
            if (!Container.TryGetValue(typeof(TInterface), out var service))
            {
                throw new NotImplementedException($"Service {typeof(TInterface).Name} is not registered");
            }
            return service.GetService() as TInterface;
        }

        public bool TryResolve(Type serviceType, out object? service)
        {
            service = default;
            if (!Container.TryGetValue(serviceType, out var serviceData))
            {
                return false;
            }
            service = serviceData.GetService();
            return true;
        }

        private object?[]? BuildConstructorParams(ConstructorInfo? ctorInfo)
        {
            var parameters = ctorInfo?.GetParameters();
            if (parameters == null || parameters.Length == 0)
                return null;
            object?[] results = new object?[parameters.Length];
            for (var i = 0; i < parameters.Length; i++)
            {
                var hasValue = parameters[i].GetCustomAttribute<HasValueAttribute>();
                if (hasValue != null)
                {
                    results[i] = hasValue.Value;
                    continue;
                }
                if (!Container.TryGetValue(parameters[i].ParameterType, out var service))
                {
                    throw new NotImplementedException("A not registered service or parameters");
                }
                results[i] = service.GetService();
            }
            return results;
        }
    }
}
