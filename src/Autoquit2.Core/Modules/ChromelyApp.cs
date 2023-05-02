using Autoquit2.Core.JavascriptModule;
using Autoquit2.Core.Modules.Hooks;
using Autoquit2.CoreLib.Interfaces;
using Chromely;
using Chromely.Core.Host;
using InputBridge;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Autoquit2.Core.Modules
{
    class ChromelyApp:ChromelyBasicApp
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddSingleton<IChromelyNativeHost, AutoquitHost>();
            // Add app configuration
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            services.AddSingleton<IConfiguration>(configuration);
            services.AddSingleton<IJavascriptExpression, JavascriptExpression>();
            services.AddSingleton<InputListener>();
            services.AddSingleton<AppSession>();
            RegisterControllerAssembly(services, typeof(ChromelyApp).Assembly);
        }
        public override void ConfigureServiceResolvers(IServiceCollection services)
        {
            base.ConfigureServiceResolvers(services);
        }
    }
}
