﻿using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace InputBridge.Models
{
    [StructLayout(LayoutKind.Sequential)]
    public struct Point2d
    {
        public int X;
        public int Y;
    }
}
