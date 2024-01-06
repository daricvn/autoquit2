using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;

namespace Autoquit.DynamicModules.Extensions
{
    [Obfuscation(Exclude = false)]
    public readonly struct RefEnumerable<T> : IEnumerable<T>
    {
        private readonly ReadOnlyMemory<T> _memory;
        private readonly int _expectedLength;

        public RefEnumerable(ReadOnlyMemory<T> memory, int expectedLength)
        {
            _memory = memory;
            _expectedLength = expectedLength;
        }

        public IEnumerator<T> GetEnumerator()
        {
            for (var i = 0; i < _expectedLength; i++)
            {
                yield return _memory.Span[i];
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return new RefEnumerator<T>(_memory, _expectedLength);
        }
    }
}
