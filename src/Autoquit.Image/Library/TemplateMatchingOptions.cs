using OpenCvSharp;

namespace Autoquit.Image.Library
{
    public struct TemplateMatchingOptions
    {
        public static TemplateMatchingOptions Default = new TemplateMatchingOptions(new Size(128, 128), new Size(512, 512), 0.95d, false);
        public Size TemplateDimension { get; }
        public Size Dimension { get; }
        public double Threshold { get; }
        public bool CorrectColour { get; }

        public TemplateMatchingOptions(Size template, Size dimension, double threshold, bool correctColour)
        {
            TemplateDimension = template;
            Dimension = dimension;
            Threshold = threshold;
            CorrectColour = correctColour;
        }
    }
}
