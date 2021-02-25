using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Windows;

namespace Autoquit2.Handlers
{
    public class AssemblyInterfaceHandler
    {
        private const string DEFAULT_SCHEME = "https://";
        private const string INDEX = "index.html";
        private Dictionary<string, object> _urlHandlers = new Dictionary<string, object>();
        private string _schemeName;
        public AssemblyInterfaceHandler(string schemeName)
        {
            _schemeName = schemeName;
        }

        public string ConsumeUrl => string.Concat(DEFAULT_SCHEME, _schemeName);

        public bool AddHtml(string path, string content) => _urlHandlers.TryAdd(path?.ToLower(), content);

        public bool IsValidUrl(string url)
            => url != null && url.StartsWith(ConsumeUrl, StringComparison.OrdinalIgnoreCase);

        public Stream Resolve(string input)
        {
            if (input != null && input.StartsWith(ConsumeUrl, StringComparison.OrdinalIgnoreCase))
            {
                var path = new Uri(input).AbsolutePath;
                if ((string.IsNullOrEmpty(path) || path == "/") && _urlHandlers.TryGetValue(INDEX, out var result))
                    return ResolveResource(result);
                if (_urlHandlers.TryGetValue(path.ToLower(), out var resrc))
                    return ResolveResource(resrc);
            }
            return Stream.Null;
        }

        private Stream ResolveResource(object target)
        {
            if (target is string)
                return new MemoryStream(Encoding.Unicode.GetBytes(target.ToString()));
            if (target is Stream)
            {
                return target as Stream;
            }
            return Stream.Null;
        }
    }
}
