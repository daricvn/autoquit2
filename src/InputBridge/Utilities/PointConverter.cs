using InputBridge.Models;
using System;
using System.Drawing;
using System.Reflection;

namespace InputBridge.Utilities
{
    [Obfuscation(Exclude = true)]
    public static class PointConverter
    {
        /// <summary>
        /// Map point to specific screen
        /// </summary>
        /// <param name="src"></param>
        /// <param name="screenRect"></param>
        /// <returns></returns>
        public static Point2d MapToScreen(this Point2d src, Rectangle2d screenRect)
            => new Point2d()
            {
                X = src.X + screenRect.Left,
                Y = src.Y + screenRect.Top
            };

        /// <summary>
        /// Project a point from srcScreen to targetScreen.
        /// </summary>
        /// <param name="src"></param>
        /// <param name="srcScreen"></param>
        /// <param name="targetScreen"></param>
        /// <param name="scaling">Calculate point by screen scale, otherwise, convert the right offset and bottom offset only</param>
        /// <returns></returns>
        public static Point2d ProjectToScreen(this Point2d src, Rectangle2d srcScreen, Rectangle2d targetScreen, bool scaling = false)
        {
            if (scaling)
            {
                float xRatio = srcScreen.Width / (float)targetScreen.Width;
                float yRatio = srcScreen.Height / (float)targetScreen.Height;
                return new Point2d()
                {
                    X = (int)Math.Round(src.X / xRatio),
                    Y = (int)Math.Round(src.Y / yRatio)
                };
            }
            var x = src.X;
            var y = src.Y;
            if (x > targetScreen.Right)
                x = targetScreen.Right - (srcScreen.Right - x);
            if (y > targetScreen.Bottom)
                y = targetScreen.Bottom - (srcScreen.Bottom - y);
            return new Point2d()
            {
                X = x,
                Y = y
            };
        }
    }
}
