using System;
using System.Collections.Generic;
using System.Text;

namespace Autoquit.Foundation.Interfaces
{
    public interface IAutoquitModule
    {
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
    }
}
