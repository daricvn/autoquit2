using Autoquit.Packaging.Objects;

namespace Autoquit.Packaging
{
    public static class ErrorCodes
    {
        public static readonly ErrorCode UnsupportedFile = new ErrorCode(100, "File is not supported.");
        public static readonly ErrorCode WrongFileFormat = new ErrorCode(101, "Wrong file format.");
        public static readonly ErrorCode FileNotFound = new ErrorCode(102, "File not found.");
    }
}
