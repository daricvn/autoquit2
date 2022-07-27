﻿using System.Collections.Generic;

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
        public IDictionary<string, object> Values { get; set; }
        /// <summary>
        /// Script is enabled or not
        /// </summary>
        public bool Enabled { get; set; }

        public ScriptItem(string module, string name, IDictionary<string, object> values)
        {
            ModuleName = module;
            Name = name;
            Values = values;
            Enabled = true;
        }

        ~ScriptItem()
        {
            if (Values != null)
                Values.Clear();
            Values = null;
        }
    }
}