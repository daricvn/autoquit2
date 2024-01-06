namespace Autoquit2.CoreLib.Models.Struct
{
    internal struct FileFolder
    {
        public string Path { get; set; }
        public string Text { get; set; }
        public bool IsReadOnly { get; set; }
        public string Description { get; private set; }
        public FileFolderType Type { get; private set; }

        public FileFolder(string path, string text, bool isReadOnly, FileFolderType type)
        {
            Path = path;
            Text = text;
            Type = type;
            IsReadOnly = isReadOnly;
            Description = string.Empty;
        }

        public FileFolder(string path, string text, string description, bool isReadOnly, FileFolderType type) : this(path, text, isReadOnly, type)
        {
            Description = description;
        }
    }

    internal enum FileFolderType
    {
        File = 0,
        Folder = 1,
        Partition = 4
    }
}