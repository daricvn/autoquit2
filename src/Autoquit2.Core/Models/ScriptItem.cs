namespace Autoquit2.Core.Models
{
    class ScriptItem
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
        public string Value { get; set; }
        /// <summary>
        /// Script is enabled or not
        /// </summary>
        public bool Enabled { get; set; }

        public ScriptItem Child { get; set; }

        public ScriptItem(string module, string name, string value)
        {
            ModuleName = module;
            Name = name;
            Value = value;
            Enabled = true;
        }

        public ScriptItem(string module, string name, string value, ScriptItem child) : this(module, name, value)
        {
            Child = child;
        }

        ~ScriptItem()
        {
            Child = null;
        }
    }
}
