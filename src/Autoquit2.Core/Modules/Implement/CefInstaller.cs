using Autoquit.Packaging.LZMA;
using System;
namespace Autoquit2.Core.Modules.Implement
{
    class CefInstaller : IAutoInstaller
    {
        private string _cefFolder;
        public bool ShouldInstall
        {
            get
            {
                return (System.IO.Directory.Exists(_cefFolder) && System.IO.Directory.GetFiles(_cefFolder).Length > 0);
            }
        }

        public CefInstaller(string cefFolder)
        {
            _cefFolder = cefFolder;
        }

        public void Dispose()
        {
        }

        public bool Install()
        {
            var currentAppLocation = Environment.CurrentDirectory;
            if (!ShouldInstall)
                return false;
            var files = System.IO.Directory.GetFiles(_cefFolder, "*.001");
            if (files.Length == 0)
                return false;
            using (var dezip = new LZMADecompressor(files[0]))
                dezip.ExtractTo(currentAppLocation);
            System.IO.Directory.Delete(_cefFolder, true);
            return true;
        }
    }
}
