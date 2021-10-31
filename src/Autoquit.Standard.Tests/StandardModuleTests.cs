using NUnit.Framework;

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
        }
    }
}