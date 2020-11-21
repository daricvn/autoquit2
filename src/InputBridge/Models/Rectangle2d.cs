using System;
using System.Collections.Generic;
using System.Text;

namespace InputBridge.Models
{
    public struct Rectangle2d
    {
        public int Left { get; set; }
        public int Top { get; set; }
        public int Right { get; set; }
        public int Bottom { get; set; }

        public int Width => Math.Abs(Right - Left);
        public int Height => Math.Abs(Bottom - Top);
    }
}
