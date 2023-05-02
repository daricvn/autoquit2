using System.Reflection;

namespace Autoquit2.CoreLib.Interfaces.Attributes
{
    [Obfuscation(Exclude = false, ApplyToMembers = true)]
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    class ServiceMethodAttribute : Attribute
    {
    }
}
