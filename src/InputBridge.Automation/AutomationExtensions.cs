﻿using System;
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
        public static PointF Delay(this PointF p, int ms)
        {
            var stopWatch = Stopwatch.StartNew();
            while (stopWatch.ElapsedMilliseconds < ms)
            {
                Thread.Sleep(20);
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
            InputBridge.SetCursorPosition(Models.Point2d.FromPointF(p.Offset(offsetX, offsetY)));
            return new PointF(p.X + offsetX, p.Y + offsetY);
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
