using System;

namespace Autoquit2.Core.Modules
{
    public interface IAutoInstaller : IDisposable
    {
        bool ShouldInstall { get; }
        bool Install();
    }
}
