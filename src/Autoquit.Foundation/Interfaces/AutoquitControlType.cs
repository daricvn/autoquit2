using System;
using System.Collections.Generic;
using System.Text;

namespace Autoquit.Foundation.Interfaces
{
    public enum AutoquitControlType
    {
        Label = 0,
        Range = 1,
        TextBox = 2,
        Numeric = 3,
        MouseCapture = 4,
        KeyboardCapture = 5,
        ImageCapture = 6,
        File = 7,
        Time = 8,
        Checkbox = 9
    }
}
