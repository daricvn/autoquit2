namespace Autoquit.Foundation.StaticVariables
{
    public static class StaticKeys
    {
        /// <summary>
        /// A Static Key in KeyValues, return a number, which is the pointer of current selected handle.
        /// </summary>
        public const string WINDOW_HANDLE = "_hWnd";
        /// <summary>
        /// A Static Key in KeyValues, return a set of number, which is the coordinate of the left, top, right, bottom of a window.
        /// </summary>
        public const string WINDOW_RECT = "_wndRect";
        /// <summary>
        /// A configuration key that represents if the interactive mode is on.
        /// </summary>
        public const string INTERACTIVE_MODE = "_interactive";
    }
}
