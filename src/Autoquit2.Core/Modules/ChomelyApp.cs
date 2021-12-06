using Chromely;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autoquit2.Core.Modules
{
    class ChromelyApp:ChromelyBasicApp
    {
        public override void ConfigureServiceResolvers(IServiceCollection services)
        {
            base.ConfigureServiceResolvers(services);
        }
    }
}
