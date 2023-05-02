using System.Reflection;

namespace Autoquit2.CoreLib.Interfaces.Attributes
{
    [Obfuscation(Exclude = false, ApplyToMembers = true)]
    [AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false)]
    public class HasValueAttribute : Attribute
    {
        public object Value { get; set; }
        public HasValueAttribute(object value)
        {
            Value = value;
        }
    }
}
