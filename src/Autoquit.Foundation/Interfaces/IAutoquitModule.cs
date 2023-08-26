using Autoquit.Foundation.Utilities;
using System.Collections.Generic;

namespace Autoquit.Foundation.Interfaces
{
    public interface IAutoquitModule
    {
        string Name { get; }
        string Description { get; }
        string Icon { get; }
        string Version { get; }
        string Author { get; }
        /// <summary>
        /// Set custom localization location. By default, All module will use the same localization file as Autoquit.
        /// </summary>
        string LocalizationLocation { set; }

        /// <summary>
        /// This function must be implemented and tell how many function Autoquit should load. <br />
        /// Return false if failed to load.
        /// </summary>
        /// <returns></returns>
        bool Load(out IEnumerable<IAutoquitFunction> functionList);

        /// <summary>
        /// Perform a parse event to create a function, if possible
        /// </summary>
        /// <param name="inputEvent"></param>
        /// <param name="autoquitFunction"></param>
        /// <returns></returns>
        bool TryParse(IInputEvent inputEvent, out IAutoquitFunction autoquitFunction, out AutoquitMessageKeyPair builtParameters);
    }
}
