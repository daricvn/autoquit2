using Autoquit.Foundation.StaticVariables;
using InputBridge.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace Autoquit.Foundation.Utilities
{
    public class AutoquitMessageKeyPair : Dictionary<string, string>, IDictionary
    {
        public static AutoquitMessageKeyPair Empty => ImmutableDictionary<string, string>.Empty;

        public static implicit operator AutoquitMessageKeyPair(ImmutableDictionary<string, string> immDict) => immDict;

        public static implicit operator ImmutableDictionary<string, string>(AutoquitMessageKeyPair dictionary) => dictionary;

        public bool? GetCheckState(string key)
        {
            if (TryGetValue(key, out string val))
            {
                if (!string.IsNullOrEmpty(val) && int.TryParse(val, out int state))
                {
                    return state == 1 ? true : false;
                }
            }
            return null;
        }

        public Point2d? GetCoordinate(string key)
        {
            if (TryGetValue(key, out string val))
            {
                if (!string.IsNullOrEmpty(val) && val.Contains(":"))
                {
                    var str = val.Split(":");
                    if (int.TryParse(str[0], out int i1) && int.TryParse(str[1], out int i2))
                    {
                        return new Point2d()
                        {
                            X = i1,
                            Y = i2
                        };
                    }
                }
            }
            return null;
        }

        public byte GetInteractiveMode()
        {
            if (TryGetValue(StaticKeys.INTERACTIVE_MODE, out string val) && byte.TryParse(val, out byte res))
            {
                return res;
            }
            return 0;
        }

        public KeyCode? GetKeyCode(string key)
        {
            if (TryGetValue(key, out string val))
            {
                if (!string.IsNullOrEmpty(val) && int.TryParse(val, out int keyCode))
                {
                    return (KeyCode)keyCode;
                }
            }
            return null;
        }

        public Range? GetRange(string key)
        {
            if (TryGetValue(key, out string val))
            {
                if (!string.IsNullOrEmpty(val) && val.Contains(":"))
                {
                    var str = val.Split(":");
                    if (int.TryParse(str[0], out int i1) && int.TryParse(str[1], out int i2))
                    {
                        return new Range(i1, i2);
                    }
                }
            }
            return null;
        }
        public IntPtr GetWindowHandle()
        {
            if (TryGetValue(StaticKeys.WINDOW_HANDLE, out string val) && int.TryParse(val, out int hnd))
            {
                return hnd;
            }
            return IntPtr.Zero;
        }

        public Rectangle2d? GetWindowRect()
        {
            if (TryGetValue(StaticKeys.WINDOW_RECT, out string val) && val.Contains(":"))
            {
                var str = val.Split(":");
                if (str.Length == 4)
                {
                    if (int.TryParse(str[0], out int left) &&
                        int.TryParse(str[1], out int top) &&
                        int.TryParse(str[2], out int right) &&
                        int.TryParse(str[3], out int bottom))
                    {
                        return new Rectangle2d()
                        {
                            Left = left,
                            Top = top,
                            Right = right,
                            Bottom = bottom
                        };
                    }
                }
            }
            return null;
        }
    }
}