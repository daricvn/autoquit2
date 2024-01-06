using System;
using System.Collections;
using System.Reflection;

namespace Autoquit.DynamicModules.Extensions
{
    [Obfuscation(Exclude = false)]
    public struct RefEnumerator<T> : IEnumerator
    {
        public RefEnumerator(ReadOnlyMemory<T> memory, int length)
        {
            Memory = memory;
            Length = length;
            CurrentIndex = 0;
        }

        public object Current
        {
            get
            {
                if (CurrentIndex >= Length)
                {
                    return null;
                }
                return Memory.Span[CurrentIndex];
            }
        }

        public int CurrentIndex { get; set; }
        public int Length { get; }
        public ReadOnlyMemory<T> Memory { get; }

        public bool MoveNext()
        {
            CurrentIndex++;
            return CurrentIndex < Length;
        }

        public void Reset()
        {
            CurrentIndex = 0;
        }
    }
}