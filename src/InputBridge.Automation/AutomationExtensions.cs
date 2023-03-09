using System;
using System.Diagnostics;
using System.Drawing;
using System.Threading;

namespace InputBridge.Automation
{
    /// <summary>
    /// Contains helper function to do automation
    /// </summary>
    public static class AutomationExtensions
    {
        /// <summary>
        /// Wait for a certain time before proceeding next actions
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="p"></param>
        /// <param name="ms">Miliseconds</param>
        /// <returns></returns>
        public static T Wait<T>(this T p, int ms)
        {
            var stopWatch = Stopwatch.StartNew();
            long gap = 0;
            while ((gap = ms - stopWatch.ElapsedMilliseconds) > 0)
            {
                if (gap < 40)
                    Thread.Sleep(4);
                else if (gap < 100)
                    Thread.Sleep(20);
                else if (gap < 200)
                    Thread.Sleep(40);
                else Thread.Sleep(80);
            }
            return p;
        }

        /// <summary>
        /// Wait until a condition is meet before proceeding next actions
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="p"></param>
        /// <param name="condition">Condition to check</param>
        /// <param name="timeout">Miliseconds timeout</param>
        /// <returns></returns>
        public static T WaitUntil<T>(this T p, Func<bool> condition, int timeout)
        {
            var stopWatch = Stopwatch.StartNew();
            long gap = 0;
            while ((gap = timeout - stopWatch.ElapsedMilliseconds) > 0 && !condition.Invoke())
            {
                if (gap < 40)
                    Thread.Sleep(8);
                else if (gap < 100)
                    Thread.Sleep(40);
                else if (gap < 200)
                    Thread.Sleep(60);
                else Thread.Sleep(90);
            }
            return p;
        }

        public static PointF Offset(this PointF p, int offsetX = 0, int offsetY = 0)
        {
            if (offsetX == 0 && offsetY == 0)
                return p;
            return new PointF(p.X + offsetX, p.Y + offsetY);
        }

        public static PointF DragMouseHere(this PointF p, int offsetX = 0, int offsetY = 0)
        {
            if (offsetX == 0 && offsetY == 0)
                return SetMouseHere(p);
            InputBridge.SendMouse(Models.MouseEventType.LEFT_DOWN);
            Thread.Sleep(5);
            InputBridge.MoveMouse(Models.Point2d.FromPointF(p.Offset(offsetX, offsetY)), true);
            Thread.Sleep(5);
            InputBridge.SendMouse(Models.MouseEventType.LEFT_UP);
            return p;
        }

        public static PointF SetMouseHere(this PointF p, int offsetX = 0, int offsetY = 0)
        {
            var newP = p.Offset(offsetX, offsetY);
            InputBridge.SetCursorPosition(Models.Point2d.FromPointF(newP));
            return newP;
        }

        public static PointF Click(this PointF p, bool rightClick = false)
        {
            if (rightClick)
            {
                InputBridge.SendMouse(Models.MouseEventType.RIGHT_DOWN);
                InputBridge.SendMouse(Models.MouseEventType.RIGHT_UP);
            }
            else
            {
                InputBridge.SendMouse(Models.MouseEventType.LEFT_DOWN);
                InputBridge.SendMouse(Models.MouseEventType.LEFT_UP);
            }
            return p;
        }
    }
}
