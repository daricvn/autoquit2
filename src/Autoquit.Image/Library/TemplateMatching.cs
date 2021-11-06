using Autoquit.Image.Objects;
using OpenCvSharp;
using System.Collections.Generic;

namespace Autoquit.Image.Library
{
    public class TemplateMatching
    {
        private static TemplateMatching _instance;
        public static TemplateMatching Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new TemplateMatching();
                return _instance;
            }
        }

        public IEnumerable<MatchingResult<Rect>> Match(byte[] image, byte[] templateImage, TemplateMatchingOptions options)
        {
            var template = Mat.FromImageData(templateImage);
            var targetImage = Mat.FromImageData(image);
            var originTemplateSize = template.Size();
            var originTargetImage = targetImage.Size();
            if (options.TemplateDimension != Size.Zero)
                template = template.Resize(options.TemplateDimension);
            if (options.Dimension != Size.Zero)
                targetImage = targetImage.Resize(options.Dimension);
            if (!options.CorrectColour)
            {
                template = template.CvtColor(ColorConversionCodes.RGB2GRAY);
                targetImage = targetImage.CvtColor(ColorConversionCodes.RGBA2GRAY);
            }
            var result = targetImage.MatchTemplate(template, TemplateMatchModes.SqDiffNormed);
            result = result.Threshold(options.Threshold, 1, ThresholdTypes.Tozero);
            var dimensionWR = targetImage.Size().Width / originTargetImage.Width;
            var dimensionHR = targetImage.Size().Height / originTargetImage.Height;
            while (true)
            {
                result.MinMaxLoc(out var minVal, out _, out Point topLeft, out _);
                if (minVal <= 1 - options.Threshold)
                {
                    yield return new MatchingResult<Rect>(new Rect(topLeft.X * dimensionWR, topLeft.Y * dimensionHR, originTemplateSize.Width, originTemplateSize.Height), 1 - minVal);
                    // Fill found loc
                    Cv2.FloodFill(result, topLeft, new Scalar(0), out _, new Scalar(0.1), new Scalar(1));
                }
                else break;
            }
        }
    }
}
