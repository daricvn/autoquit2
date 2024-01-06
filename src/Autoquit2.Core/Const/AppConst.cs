using Microsoft.IO;

namespace Autoquit2.Core.Const
{
    internal class AppConst
    {
        public const string ModuleFolder = "plugins";
        public const string ModuleConfigFile = "config.include";

        public const string AppHostName = "requests";
        public const string LocalizationFolder = "Localization";
        public const string LocalizationExtension = "json";

        public static readonly RecyclableMemoryStreamManager GlobalStreamPoolManager = new RecyclableMemoryStreamManager();
    }
}
