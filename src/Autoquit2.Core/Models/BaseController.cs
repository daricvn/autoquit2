using Chromely.Core.Network;

namespace Autoquit2.Core.Models
{
    public abstract class BaseController : ChromelyController
    {
        protected ChromelyResponse NotFound(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 404 };
        protected ChromelyResponse Unauthorized(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 401 };
        protected ChromelyResponse BadRequest(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 400 };
        protected ChromelyResponse Forbidden(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 403 };
        protected ChromelyResponse Conflict(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 409 };
        protected ChromelyResponse ServerError(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 500 };
        protected ChromelyResponse NotSupported(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 501 };
        protected ChromelyResponse Ok(IChromelyRequest req, object data = null)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = data };
        protected ChromelyResponse NoContent(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 204 };
        protected ChromelyResponse NotModified(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 304 };
        protected ChromelyResponse Created(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 201 };
    }
}
