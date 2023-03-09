using System;

namespace Autoquit.Foundation.Utilities
{
    public static class StringExtension
    {
        /// <summary>
        /// Return true if the string is null or empty
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsNullOrEmpty(this string str)
            => string.IsNullOrEmpty(str);
        /// <summary>
        /// Return true if the string is null or contains white space or empty.
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsNullOrWhiteSpace(this string str)
            => string.IsNullOrWhiteSpace(str);

        /// <summary>
        /// Return true if the string is either null, or equals to specific value
        /// </summary>
        /// <param name="str"></param>
        /// <param name="target">Target string to compare to</param>
        /// <param name="type">Comparison type</param>
        /// <returns></returns>
        public static bool IsNullOrEquals(this string str, string target, StringComparison type = StringComparison.InvariantCulture)
            => str == null || str.Equals(target, type);

        /// <summary>
        /// Append string to existing one at specific position
        /// </summary>
        /// <param name="src"></param>
        /// <param name="str"></param>
        /// <param name="position"></param>
        /// <returns></returns>
        public static string Append(this string src, string str, int position)
        {
            if (src.IsNullOrEmpty())
                return str;
            if (str.IsNullOrEmpty())
                return src;
            var span = src.AsSpan();
            if (position == 0)
                return str + span.ToString();
            if (span.Length <= position)
                return span.ToString() + str;
            return string.Concat(span.Slice(0, position).ToString(), str, span.Slice(position).ToString()); 
        }
    }
}
