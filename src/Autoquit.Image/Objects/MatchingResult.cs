using System;
namespace Autoquit.Image.Objects
{
    public struct MatchingResult<T>
    {
        public T Result { get; }
        public double Confidence { get; }
        public double MinConfidence { get; }
        public MatchingResult(T data, double conf, double minConf)
        {
            Result = data;
            Confidence = conf;
            MinConfidence = minConf;
        }
        public MatchingResult(T data, double conf)
        {
            Result = data;
            Confidence = conf;
            MinConfidence = conf;
        }
    }
}
