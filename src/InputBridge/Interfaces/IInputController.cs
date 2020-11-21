using InputBridge.Models;
using System;

namespace InputBridge.Interfaces
{
    public interface IInputController
    {
        void SendMouse(MouseEventType type, int x, int y);
        void SendMouse(MouseEventType type, IntPtr handle, int x, int y);
    }
}
