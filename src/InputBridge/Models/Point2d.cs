using System;
using System.Drawing;
using System.Runtime.InteropServices;

namespace InputBridge.Models
{
    [StructLayout(LayoutKind.Sequential)]
    public struct Point2d
    {
        public int X;
        public int Y;
        public Point2d(int x, int y)
        {
            X = x;
            Y = y;
        }

        public static Point2d FromPointF(PointF p)
            => new Point2d(Convert.ToInt32(p.X), Convert.ToInt32(p.Y));
    }
}
