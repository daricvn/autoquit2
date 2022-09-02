using System.Text.Json.Serialization;

namespace Autoquit2.Core.Models.Struct
{
    internal struct ActionResult
    {
        [JsonIgnore]
        public static ActionResult Empty => new ActionResult(null);
        public short Status { get; set; }
        public string Message { get; set; }
        public object Content { get; set; }

        public ActionResult(object data)
        {
            Content = data;
            Status = 200;
            Message = string.Empty;
        }

        public ActionResult(short status)
        {
            Content = null;
            Status = status;
            Message = string.Empty;
        }
        public ActionResult(short status, string message)
        {
            Content = null;
            Status = status;
            Message = message;
        }
    }
}
