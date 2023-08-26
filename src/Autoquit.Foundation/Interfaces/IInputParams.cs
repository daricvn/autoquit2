namespace Autoquit.Foundation.Interfaces
{
    public interface IInputParams
    {
        /// <summary>
        /// Number of parameter
        /// </summary>
        int Count { get; }

        /// <summary>
        /// Get parameter at index
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        object GetParams(int index);
    }
}
