using System;

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

        public Rectangle2d(int left, int top, int right, int bottom)
        {
            Left = left;
            Top = top;
            Right = right;
            Bottom = bottom;
        }
    }
}
