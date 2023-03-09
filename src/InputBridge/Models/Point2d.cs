using System;
using System.Drawing;
using System.Runtime.InteropServices;

namespace InputBridge.Models
{
    [StructLayout(LayoutKind.Sequential)]
    public struct Point2d
    {
        public static readonly Point2d Empty = new Point2d(0, 0);
        public int X;
        public int Y;
        public Point2d(int x, int y)
        {
            X = x;
            Y = y;
        }

        public static Point2d FromPointF(PointF p)
            => new Point2d(Convert.ToInt32(p.X), Convert.ToInt32(p.Y));

        public LParams ToParams()
            => new LParams(X, Y);

        public override string ToString()
            => string.Concat(X, ":", Y);
    }
}
