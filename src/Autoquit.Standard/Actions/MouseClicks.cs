﻿using Autoquit.Standard.Actions.Abstract;
using InputBridge.Models;
using System.Collections.Generic;

namespace Autoquit.Standard.Actions
{
    public class MouseLeftClick : MouseClickAction
    {
        public override string Name => "left-click";

        public override string Description => "Simulate left click to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.LEFT_DOWN; yield return MouseEventType.LEFT_UP;
        }
    }
    public class MouseLeftDown : MouseClickAction
    {
        public override string Name => "left-down";

        public override string Description => "Simulate left down to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.LEFT_DOWN; 
        }
    }
    public class MouseLeftUp : MouseClickAction
    {
        public override string Name => "left-up";

        public override string Description => "Simulate left up to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.LEFT_UP;
        }
    }
    public class MouseRightClick : MouseClickAction
    {
        public override string Name => "right-click";

        public override string Description => "Simulate right click to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.RIGHT_DOWN; yield return MouseEventType.RIGHT_UP;
        }
    }
    public class MouseRightDown : MouseClickAction
    {
        public override string Name => "right-down";

        public override string Description => "Simulate right down to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.RIGHT_DOWN;
        }
    }
    public class MouseRightUp : MouseClickAction
    {
        public override string Name => "right-up";

        public override string Description => "Simulate right up to windows.";

        public override IEnumerable<MouseEventType> GetActionList()
        {
            yield return MouseEventType.RIGHT_UP;
        }
    }
}