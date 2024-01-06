using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Autoquit.Packaging.Objects
{
    [Obfuscation(Exclude = false)]
    public struct ErrorCode
    {
        public ErrorCode(byte code, string message)
        {
            Code = code;
            Message = message;
        }

        public byte Code { get; }
        public string Message { get; }

        public static implicit operator string(ErrorCode code) => code.ToString();

        public override bool Equals([NotNullWhen(true)] object obj)
        {
            if (obj is ErrorCode code)
            {
                return code.Code == Code;
            }
            return base.Equals(obj);
        }

        public override int GetHashCode()
        {
            return Code.GetHashCode();
        }

        public override string ToString()
        {
            return string.Format("{0} (Code:{1})", Message, Code);
        }
    }
}