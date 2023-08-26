using Autoquit.Foundation.Utilities;

namespace Autoquit2.CoreLib.Models
{
    public class ScriptItem
    {
        /// <summary>
        /// The module this item used
        /// </summary>
        public string ModuleName { get; set; }
        /// <summary>
        /// Name of the action
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Value of the action
        /// </summary>
        public AutoquitMessageKeyPair? Values { get; set; }
        /// <summary>
        /// Miliseconds delay
        /// </summary>
        public int Delay { get; set; }
        /// <summary>
        /// Script is enabled or not
        /// </summary>
        public bool Enabled { get; set; }

        public ScriptItem(string module, string name, AutoquitMessageKeyPair values, int delay)
        {
            ModuleName = module;
            Name = name;
            Values = values;
            Enabled = true;
            Delay = delay;
        }

        ~ScriptItem()
        {
            if (Values != null)
                Values.Clear();
            Values = null;
        }
    }
}
