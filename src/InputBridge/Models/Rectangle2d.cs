using System;
using System.Drawing;

namespace InputBridge.Models
{
    public struct Rectangle2d
    {
        public static readonly Rectangle2d Empty = new Rectangle2d(0, 0, 0, 0);
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

        public Rectangle ToRectangle()
            => new Rectangle(Left, Top, Width, Height);

        public override bool Equals(object obj)
        {
            if (obj is Rectangle2d rect)
                return Left == rect.Left && Right == rect.Right && Top == rect.Top && Bottom == rect.Bottom;
            return false;
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Left, Top, Right, Bottom);
        }

        public static bool operator ==(Rectangle2d a, Rectangle2d b)
        {
            return a.Equals(b);
        }
        public static bool operator !=(Rectangle2d a, Rectangle2d b)
        {
            return !a.Equals(b);
        }
    }
}
