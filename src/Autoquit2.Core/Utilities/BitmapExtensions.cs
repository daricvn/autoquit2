using Autoquit2.Core.Const;
using CommunityToolkit.HighPerformance.Buffers;
using System;
using System.Drawing;
using System.Drawing.Imaging;

namespace Autoquit2.Core.Utilities
{
    public static class BitmapExtensions
    {
        public static string ToBase64(this ReadOnlySpan<byte> data)
            => Convert.ToBase64String(data);

        public static byte[] GetByteArray(this Bitmap bmp, ImageFormat format = null)
        {
            if (format == null) format = ImageFormat.Jpeg;
            using (var ms = AppConst.GlobalStreamPoolManager.GetStream())
            {
                bmp.Save(ms, format);
                return ms.ToArray();
            }
        }

        public static string GetBase64Array(this Bitmap bmp, ImageFormat format = null)
        {
            if (format is null)
            {
                format = ImageFormat.Jpeg;
            }
            using (var ms = AppConst.GlobalStreamPoolManager.GetStream())
            {
                bmp.Save(ms, format);
                var length = (int)ms.Length;
                using (var buffer = SpanOwner<byte>.Allocate(length))
                {
                    var span = buffer.Span;
                    ms.Seek(0, System.IO.SeekOrigin.Begin);
                    ms.Read(span);
                    return Convert.ToBase64String(span.Slice(0, length));
                }
            }
        }
    }
}
