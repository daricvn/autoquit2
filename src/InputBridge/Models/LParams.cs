namespace InputBridge.Models
{
    public struct LParams
    {
        public int L { get; private set; }
        public int R { get; private set; }
        public LParams(int l, int r)
        {
            L = l;
            R = r;
        }

        public static explicit operator uint(LParams d) => (uint) (d.L << 16 | d.R); 
        public static explicit operator int(LParams d) => (d.L << 16 | d.R);
    }
}
