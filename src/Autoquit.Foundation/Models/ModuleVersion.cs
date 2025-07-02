using System;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace Autoquit.Foundation.Models
{
    public readonly struct ModuleVersion : IComparable<ModuleVersion>
    {
        private const char VersionSeparator = '.';

        public ModuleVersion(int major, int minor, int build, int revision)
        {
            Major = major;
            Minor = minor;
            Build = build;
            Revision = revision;
        }

        public ModuleVersion(string version)
        {
            if (string.IsNullOrEmpty(version))
            {
                throw new ArgumentNullException("Invalid version");
            }
            Major = 0;
            Minor = 0;
            Build = 0;
            Revision = 0;
            (Major, Minor, Build, Revision) = ParseVersion(version);
        }

        public int Build { get; }
        public int Major { get; }
        public int Minor { get; }
        public int Revision { get; }

        public static explicit operator ModuleVersion((int, int, int, int) tuple) => new(tuple.Item1, tuple.Item2, tuple.Item3, tuple.Item4);

        public static implicit operator (int, int, int, int)(ModuleVersion v) => (v.Major, v.Minor, v.Build, v.Revision);

        public static bool operator !=(ModuleVersion left, ModuleVersion right)
        {
            return !(left == right);
        }

        public static bool operator <(ModuleVersion left, ModuleVersion right)
        {
            return left.CompareTo(right) < 0;
        }

        public static bool operator <=(ModuleVersion left, ModuleVersion right)
        {
            return left.CompareTo(right) <= 0;
        }

        public static bool operator ==(ModuleVersion left, ModuleVersion right)
        {
            return left.Equals(right);
        }

        public static bool operator >(ModuleVersion left, ModuleVersion right)
        {
            return left.CompareTo(right) > 0;
        }

        public static bool operator >=(ModuleVersion left, ModuleVersion right)
        {
            return left.CompareTo(right) >= 0;
        }

        public int CompareTo(ModuleVersion other)
        {
            var major = Major.CompareTo(other.Major);
            if (major != 0)
            {
                return major;
            }
            var minor = Minor.CompareTo(other.Minor);
            if (minor != 0)
            {
                return minor;
            }
            var build = Build.CompareTo(other.Build);
            if (build != 0)
            {
                return build;
            }
            return Revision.CompareTo(other.Revision);
        }

        public override bool Equals([NotNullWhen(true)] object obj)
        {
            if (obj is ModuleVersion other)
            {
                return Major == other.Major && Minor == other.Minor && Build == other.Build && Revision == other.Revision;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Major, Minor, Build, Revision);
        }

        public override string ToString()
        {
            return new StringBuilder(7).Append(Major).Append(VersionSeparator)
                .Append(Minor).Append(VersionSeparator)
                .Append(Build).Append(VersionSeparator)
                .Append(Revision).ToString();
        }

        private static (int Major, int Minor, int Build, int Revision) ParseVersion(ReadOnlySpan<char> strs)
        {
            var major = 0;
            if (!strs.Contains(VersionSeparator))
            {
                if (!int.TryParse(strs, out major))
                {
                    throw new ArgumentException("Wrong version format");
                }
                return (major, 0, 0, 0);
            }
            Span<int> res = stackalloc int[4];
            res.Fill(0);
            int dataIndex = 0;
            int lastIndex = -1;
            do
            {
                lastIndex = strs.IndexOf(VersionSeparator);
                if (lastIndex == 0)
                {
                    throw new ArgumentException("Wrong version format");
                }
                if (!int.TryParse(lastIndex < 0 ? strs : strs[..lastIndex], out var value))
                {
                    res[dataIndex++] = value;
                }
                if (lastIndex >= 0)
                {
                    strs = strs[(lastIndex + 1)..];
                }
            } while (lastIndex < strs.Length && lastIndex >= 0);
            major = res[0];
            var minor = 0;
            var build = 0;
            var revision = 0;
            if (res.Length > 1)
            {
                minor = res[1];
            }
            if (res.Length > 2)
            {
                build = res[2];
            }
            if (res.Length > 3)
            {
                revision = res[3];
            }
            return (major, minor, build, revision);
        }
    }
}