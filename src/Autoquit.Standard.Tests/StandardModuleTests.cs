using NUnit.Framework;
using System.Linq;

namespace Autoquit.Standard.Tests
{
    public class StandardModuleTests
    {
        [Test]
        public void StandardModuleTests_CanLoadModules()
        {
            // Assign
            var module = new StandardModule();
            // Act 
            var result = module.Load(out var list);

            // Assert
            Assert.IsTrue(result);
            Assert.IsNotEmpty(list);
            CollectionAssert.AllItemsAreNotNull(list, "Loaded module must not contains null item");
        }
    }
}