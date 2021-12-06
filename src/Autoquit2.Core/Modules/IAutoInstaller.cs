using System;

namespace Autoquit2.Core.Modules
{
    interface IAutoInstaller : IDisposable
    {
        bool ShouldInstall { get; }
        bool Install();
    }
}
