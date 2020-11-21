using Autoquit.Foundation.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autoquit.Foundation.Models
{
    public class AutoquitControl
    {
        /// <summary>
        /// Prefered index of control, this determine the priority of control when appear on the user interface.
        /// </summary>
        public int Index { get; private set; }
        /// <summary>
        /// Name will be stored as a key in the request
        /// </summary>
        public string Name { get; private set; }

        /// <summary>
        /// Control type
        /// </summary>
        public AutoquitControlType Type { get; private set; }

        public AutoquitControl(int index, string name, AutoquitControlType type)
        {
            Index = index;
            Name = name;
            Type = type;
        }

        public AutoquitControl(string name, AutoquitControlType type):this(int.MinValue, name, type)
        {

        }
    }
}
