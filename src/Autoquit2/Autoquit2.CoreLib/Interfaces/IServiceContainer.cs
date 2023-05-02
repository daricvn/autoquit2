using Autoquit2.CoreLib.Interfaces.EnumProps;

namespace Autoquit2.CoreLib.Interfaces
{
    public interface IServiceContainer
    {
        /// <summary>
        /// Register a service to the container
        /// </summary>
        /// <typeparam name="TInterface"></typeparam>
        /// <typeparam name="TImplementation"></typeparam>
        /// <param name="lifespan">Service lifespan</param>
        /// <returns></returns>
        IServiceContainer Register<TInterface, TImplementation>(ServiceLifespan lifespan = ServiceLifespan.Singleton) where TInterface : class
            where TImplementation : TInterface;

        /// <summary>
        /// Register a service to the container
        /// </summary>
        /// <typeparam name="TInterface"></typeparam>
        /// <param name="initializer"></param>
        /// <param name="lifespan">Service lifespan</param>
        /// <returns></returns>
        IServiceContainer Register<TInterface>(Func<TInterface> initializer, ServiceLifespan lifespan = ServiceLifespan.Singleton) where TInterface : class;

        /// <summary>
        /// Register a service to the container
        /// </summary>
        /// <typeparam name="TInterface"></typeparam>
        /// <param name="instance"></param>
        /// <param name="lifespan">Service lifespan</param>
        /// <returns></returns>
        IServiceContainer Register<TInterface>(TInterface instance, ServiceLifespan lifespan = ServiceLifespan.Singleton) where TInterface : class;

        /// <summary>
        /// Try to resolve a service. Throw exception if the service is not registered.
        /// </summary>
        /// <typeparam name="TInterface"></typeparam>
        /// <returns></returns>
        TInterface? Resolve<TInterface>() where TInterface : class;

        /// <summary>
        /// Try to resolve a service, return false if it is not registered.
        /// </summary>
        /// <param name="serviceType"></param>
        /// <param name="service"></param>
        /// <returns></returns>
        bool TryResolve(Type serviceType, out object? service);
    }
}
