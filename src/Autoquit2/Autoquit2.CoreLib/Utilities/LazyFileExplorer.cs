using Autoquit2.CoreLib.Models.Struct;

namespace Autoquit2.CoreLib.Utilities
{
    internal static class LazyFileExplorer
    {
        internal static IEnumerable<FileFolder> GetPartitions()
        {
            foreach (DriveInfo drive in DriveInfo.GetDrives())
                if (drive.IsReady && drive.TotalSize >= 1024 &&
                    (drive.DriveType == DriveType.Fixed || drive.DriveType == DriveType.Removable))
                    yield return new FileFolder(drive.RootDirectory.FullName, drive.Name, false, FileFolderType.Partition);
        }

        internal static IEnumerable<FileFolder> GetFileFolders(string path, bool showHiddenFiles, bool folderOnly = false)
            => GetFileFolders(path, "*", showHiddenFiles, folderOnly);

        internal static IEnumerable<FileFolder> GetFileFolders(string path, string pattern, bool showHiddenFiles, bool folderOnly = false, bool includeDescendants = false)
        {
            SearchOption opt = SearchOption.TopDirectoryOnly;
            if (includeDescendants)
                opt = SearchOption.AllDirectories;
            foreach (var dir in new DirectoryInfo(path).GetDirectories("*", opt))
                if (!dir.Attributes.HasFlag(FileAttributes.Hidden) && !dir.Attributes.HasFlag(FileAttributes.System))
                    yield return new FileFolder(dir.FullName, dir.Name, false, FileFolderType.Folder);
            if (folderOnly)
                yield break;
            foreach (var file in new DirectoryInfo(path).GetFiles(pattern, opt))
                if (file.Length > 0 && (showHiddenFiles || !file.Attributes.HasFlag(FileAttributes.Hidden)) && !file.Attributes.HasFlag(FileAttributes.System))
                    yield return new FileFolder(file.FullName, string.Join('.', file.Name, file.Extension), file.IsReadOnly, FileFolderType.File);
        }
    }
}
