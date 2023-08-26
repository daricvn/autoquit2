namespace Autoquit.Foundation.Interfaces
{
    public interface IInputEvent
    {
        /// <summary>
        /// Event Type
        /// </summary>
        int EventType { get; }

        /// <summary>
        /// Parameters
        /// </summary>
        IInputParams Parameters { get; }
    }
}
