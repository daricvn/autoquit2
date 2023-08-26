using Autoquit.TestBase;
using Autoquit2.Core.Modules.Implement;
using Autoquit2.CoreLib.Interfaces;
using NUnit.Framework;
using System.Linq;

namespace Autoquit.Core.Tests
{
    public class ModuleManagerTests
    {
        private IAppModuleService _moduleManager;
        [SetUp]
        public void Setup()
        {
            _moduleManager = new ModuleManager(string.Empty, "modules.config");
        }

        [Test, Timeout(TestConst.TIMEOUT_10S), Category(TestCategory.Core)]
        public void TestLoadModule_CanLoad()
        {
            // Assign
            var moduleList = _moduleManager.AvailableModules.ToList();
            // Act
            var loadedModule = _moduleManager.LoadModule(moduleList.FirstOrDefault()).ToList();
            // Assert
            Assert.IsNotEmpty(moduleList);
            Assert.IsNotEmpty(loadedModule);
            CollectionAssert.AllItemsAreNotNull(loadedModule);
            Assert.IsTrue(loadedModule.All(x => !string.IsNullOrEmpty(x.Id)), "All module Id must be generated");
        }
    }
}