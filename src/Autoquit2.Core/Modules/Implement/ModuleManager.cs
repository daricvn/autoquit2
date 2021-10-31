using Autoquit.DynamicModules;
using Autoquit.DynamicModules.Implement;
using Autoquit.Foundation.Interfaces;
using Autoquit2.Core.Const;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Autoquit2.Core.Modules.Implement
{
    public class ModuleManager : IModuleManager
    {
        private static ModuleManager _instance;
        public static ModuleManager Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new ModuleManager(AppConst.MODULE_FOLDER, AppConst.MODULE_FILE_CONFIG);
                return _instance;
            }
        }

        private IList<IDynamicModule<IAutoquitModule>> _cacheModules;
        public IEnumerable<IDynamicModule<IAutoquitModule>> LoadedModules
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

        private string _folder;
        private string _configPath;
        private IList<string> _moduleNames;

        public ModuleManager(string baseFolder, string includeFileConfig)
        {
            if (!string.IsNullOrWhiteSpace(baseFolder) && !Directory.Exists(baseFolder))
                Directory.CreateDirectory(baseFolder);
            _folder = baseFolder;
            _configPath = string.IsNullOrWhiteSpace(baseFolder) ? includeFileConfig : Path.Combine(baseFolder, includeFileConfig);
        }

        private IEnumerable<IDynamicModule<IAutoquitModule>> LoadAllModules()
        {
            if (!File.Exists(_configPath))
                yield break;
            _moduleNames = new List<string>(File.ReadAllLines(_configPath));
            foreach (var item in _moduleNames)
                yield return new DynamicModule<IAutoquitModule>(Path.ChangeExtension(Path.Combine(_folder, item), "dll"));
        }

        public IEnumerable<IAutoquitFunction> LoadModule(IDynamicModule<IAutoquitModule> module)
        {
            if (module == null)
                yield break;
            foreach (var type in module.GetExportedTypes())
            {
                if (!(ExpressionCompiler.Instance.CreateByType(type) is IAutoquitModule actualModule))
                    continue;
                if (!actualModule.Load(out var functionList))
                    continue;
                foreach (var function in functionList)
                    if (function != null)
                        yield return function;
            }
        }

        public int Exclude(params string[] moduleNames)
        {
            if (LoadedModules == null)
                return -1;
            int c = 0;
            foreach (var str in moduleNames) 
                if (_cacheModules.FirstOrDefault(x=> x.FilePath == str) is IDynamicModule<IAutoquitModule> module)
                {
                    _cacheModules.Remove(module);
                    _moduleNames.Remove(str.Replace(".dll", string.Empty));
                    c++;
                }
            File.WriteAllLines(_configPath, moduleNames);
            return c;
        }

        public int Include(params string[] moduleNames)
        {
            if (LoadedModules == null)
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
