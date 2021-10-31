using Autoquit.Foundation.Models;
using Autoquit.Foundation.Utilities;
using System.Collections.Generic;

namespace Autoquit.Foundation.Interfaces
{
    public interface IAutoquitFunction
    {
        /// <summary>
        /// Id of current function. This field is auto-generated once loaded.
        /// </summary>
        string Id { get; set; }

        /// <summary>
        /// Assembly name of loaded function. This field is auto-generated once loaded.
        /// </summary>
        string AssemblyName { get; set; }

        /// <summary>
        /// Name of the function, used to display to the user. This value cannot be empty, null, or duplicated within the same assembly.
        /// </summary>
        string Name { get; }
        /// <summary>
        /// Description of the function. Should guide user how to use it. 
        /// </summary>
        string Description { get; }

        /// <summary>
        /// Max length of the input. Leaving negative will use its default value 32767.
        /// </summary>
        int MaxLength { get; }

        /// <summary>
        /// Prefer priority of the function display in a list of returned functions.
        /// </summary>
        int PreferPriority { get; } 

        /// <summary>
        /// List of autoquit controls.
        /// </summary>
        IEnumerable<AutoquitControl> Controls { get; }

        /// <summary>
        /// This function will be executed once autoquit invoke in the script.
        /// </summary>
        /// <param name="keyValues">Contains key/value pair of each control.</param>
        /// <returns></returns>
        bool Execute(AutoquitMessageKeyPair keyValues);

    }
}
