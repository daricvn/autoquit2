namespace Autoquit.Models
{
    public enum MsgBoxTypes
    {
        Ok = 0x00000000,
        AbortRetryIgnore = 0x00000002,
        CancelRetryContinue = 0x00000006,
        Help = 0x00004000,
        OkCancel = 0x00000001,
        RetryCancel = 0x00000005,
        YesNo = 0x00000004,
        YesNoCancel = 0x00000003,
        TopMost = 0x00040000
    }

    public enum MsgBoxIcons
    {
        Exclamation = 0x00000030,
        Info = 0x00000040,
        Question = 0x00000020,
        Error = 0x00000010
    }

    public enum MsgBoxResult
    {
        None = 0,
        Abort = 3,
        Cancel = 2,
        Continue = 11,
        Ignore = 5,
        No = 7,
        Ok = 1,
        Retry = 4,
        TryAgain = 10,
        Yes = 6
    }
}
