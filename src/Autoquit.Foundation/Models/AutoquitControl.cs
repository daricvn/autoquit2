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
        /// The description that will be displayed to the user.
        /// </summary>
        public string Description { get; private set; }

        /// <summary>
        /// Min value of the control, applied for Range and Slider
        /// </summary>
        public int Min { get; set; }
        /// <summary>
        /// Max value of the control, applied for Range and Slider.
        /// </summary>
        public int Max { get; set; }

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

        public AutoquitControl(int index, string name, string desc, AutoquitControlType type) : this(index, name, type)
        {
            Description = desc;
        }

        public AutoquitControl(int index, string name, string desc, AutoquitControlType type, int min, int max) : this(index, name, desc, type)
        {
            Min = min;
            Max = max;
        }

        public AutoquitControl(string name, string desc, AutoquitControlType type) : this(int.MinValue, name, desc, type)
        {

        }

        public AutoquitControl(string name, string desc, AutoquitControlType type, int min, int max) : this(int.MinValue, name, desc, type, min, max)
        {

        }
    }
}
