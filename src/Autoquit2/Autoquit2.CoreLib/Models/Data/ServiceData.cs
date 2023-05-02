using Autoquit2.CoreLib.Interfaces.EnumProps;

namespace Autoquit2.CoreLib.Models.Data
{
    struct ServiceData
    {
        private readonly Lazy<object>? _service;
        private readonly Func<object>? _serviceTransient;
        public ServiceData(Func<object> initializer, ServiceLifespan lifespan)
        {
            if (lifespan == ServiceLifespan.Singleton)
            {
                _service = new Lazy<object>(initializer);
                _serviceTransient = null;
            }
            else
            {
                _serviceTransient = initializer;
                _service = null;
            }
        }

        public object? GetService()
        {
            if (_serviceTransient == null)
            {
                return _service?.Value;
            }
            return _serviceTransient?.Invoke();
        }
    }
}
