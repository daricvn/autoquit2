using Autoquit.DynamicModules.Generic;
using Autoquit.DynamicModules.Generic.Implement;
using Autoquit.Foundation.Interfaces;
using Autoquit.Packaging;
using Autoquit2.Core.Const;
using Autoquit2.CoreLib.Interfaces;
using Autoquit2.Security;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Autoquit2.Core.Modules.Implement
{
    public class ModuleManager : IAppModuleService
    {
        private static ModuleManager _instance;

        public static ModuleManager Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new ModuleManager(AppConst.ModuleFolder, AppConst.ModuleConfigFile);
                return _instance;
            }
        }

        private IList<IDynamicModule<IAutoquitModule>> _cacheModules;
        private ConcurrentDictionary<IAutoquitModule, IEnumerable<IAutoquitFunction>> _loadedModules;
        private ConcurrentDictionary<IDynamicModule<IAutoquitModule>, IAutoquitModule> _loadedModuleMap;

        public IEnumerable<IDynamicModule<IAutoquitModule>> AvailableModules
        {
            get
            {
                if (_cacheModules == null)
                {
                    _cacheModules = LoadAllModules().Where(x => x.IsValid).ToList();
                }
                return _cacheModules;
            }
        }

        public IEnumerable<IAutoquitModule> AllModules
        {
            get
            {
                if (_loadedModules != null)
                {
                    return _loadedModules.Keys;
                }
                foreach (var module in AvailableModules)
                {
                    _ = LoadModule(module);
                }
                return _loadedModules.Keys;
            }
        }

        private string _folder;
        private string _configPath;
        private IList<string> _moduleNames;

        public ModuleManager(string baseFolder, string includeFileConfig)
        {
            _loadedModules = new ConcurrentDictionary<IAutoquitModule, IEnumerable<IAutoquitFunction>>();
            _loadedModuleMap = new ConcurrentDictionary<IDynamicModule<IAutoquitModule>, IAutoquitModule>();
            if (!string.IsNullOrWhiteSpace(baseFolder) && !Directory.Exists(baseFolder))
                _ = Directory.CreateDirectory(baseFolder);
            _folder = baseFolder;
            _configPath = string.IsNullOrWhiteSpace(baseFolder) ? includeFileConfig : Path.Combine(baseFolder, includeFileConfig);
        }

        private IEnumerable<IDynamicModule<IAutoquitModule>> LoadAllModules()
        {
            if (!File.Exists(_configPath))
                yield break;
            _moduleNames = new List<string>(File.ReadAllLines(_configPath));
            foreach (var item in _moduleNames)
            {
                var fullPath = Path.Combine(_folder, item);
                if (!File.Exists(fullPath))
                {
                    continue;
                }
                if (item.EndsWith(".dll"))
                {
                    yield return new DynamicModule<IAutoquitModule>(Path.ChangeExtension(fullPath, "dll"));
                }
                else if (item.EndsWith(".alib"))
                {
                    var alibFile = new AlibFile(fullPath);
                    yield return AutoquitDynamicModule<IAutoquitModule>.LoadFrom(alibFile);
                }
            }
        }

        private System.Reflection.Assembly CurrentDomain_AssemblyResolve(object sender, ResolveEventArgs args)
        {
            throw new NotImplementedException();
        }

        private string CombineUniqueNamespace(IAutoquitFunction function)
            => Hashmath.Instance.md5(string.Join('-', function.GetType().Namespace, function.GetType().Name, function.Name));

        public IEnumerable<IAutoquitFunction> LoadModule(IDynamicModule<IAutoquitModule> module)
        {
            if (module == null)
            {
                return Array.Empty<IAutoquitFunction>();
            }
            if (_loadedModuleMap.TryGetValue(module, out var actual) && _loadedModules.TryGetValue(actual, out var res))
            {
                return res;
            }
            foreach (var type in module.GetExportedTypes())
            {
                if (!(module.CreateInstance(type) is IAutoquitModule actualModule) || !actualModule.Load(out var functionList))
                {
                    continue;
                }
                var list = functionList.OfType<IAutoquitFunction>().Select(function =>
                {
                    function.Id = string.Join('.', module.AssemblyName, CombineUniqueNamespace(function));
                    function.AssemblyName = module.AssemblyName;
                    return function;
                }).ToList();
                if (_loadedModules.TryAdd(actualModule, list))
                {
                    _ = _loadedModuleMap.AddOrUpdate(module, actualModule, (k, v) => actualModule);
                    return list;
                }
            }
            return Array.Empty<IAutoquitFunction>();
        }

        public int Exclude(params string[] moduleNames)
        {
            if (AvailableModules == null)
                return -1;
            int c = 0;
            foreach (var str in moduleNames)
                if (_cacheModules.FirstOrDefault(x => x.FilePath == str) is IDynamicModule<IAutoquitModule> module)
                {
                    _ = _cacheModules.Remove(module);
                    _ = _moduleNames.Remove(str.Replace(".dll", string.Empty));
                    c++;
                }
            File.WriteAllLines(_configPath, moduleNames);
            return c;
        }

        public int Include(params string[] moduleNames)
        {
            if (AvailableModules == null)
                return -1;
            int c = 0;
            foreach (var str in moduleNames)
            {
                var module = new DynamicModule<IAutoquitModule>(str);
                if (!module.IsValid)
                    continue;
                _cacheModules.Add(module);
                _moduleNames.Add(str.Replace(".dll", string.Empty));
                c++;
            }
            File.WriteAllLines(_configPath, moduleNames);
            return c;
        }
    }
}