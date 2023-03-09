using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Autoquit2.Core.Utilities
{
    public static class BitmapExtensions
    {
        public static string ToBase64(this byte[] data)
            => Convert.ToBase64String(data);
        public static byte[] GetByteArray(this Bitmap bmp, ImageFormat format = null)
        {
            if (format == null) format = ImageFormat.Jpeg;
            using (var ms = new MemoryStream())
            {
                bmp.Save(ms, format);
                return ms.ToArray();
            }
        }
    }
}
