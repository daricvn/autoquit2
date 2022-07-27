using Autoquit2.Core.Models.Struct;
using Chromely.Core.Network;

namespace Autoquit2.Core.Models
{
    public abstract class BaseController : ChromelyController
    {
        private static readonly ActionResult CreatedStatus = new ActionResult(201);
        private static readonly ActionResult NoContentStatus = new ActionResult(204);
        private static readonly ActionResult NotModifiedStatus = new ActionResult(304);
        private static readonly ActionResult NotFoundStatus = new ActionResult(404);
        private static readonly ActionResult UnauthorizedStatus = new ActionResult(401);
        private static readonly ActionResult BadRequestStatus = new ActionResult(400);
        private static readonly ActionResult ForbiddenStatus = new ActionResult(403);
        private static readonly ActionResult ConflictStatus = new ActionResult(409);
        private static readonly ActionResult NotSupportedStatus = new ActionResult(501);
        protected ChromelyResponse NotFound(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = NotFoundStatus };
        protected ChromelyResponse Unauthorized(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = UnauthorizedStatus };
        protected ChromelyResponse BadRequest(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = BadRequestStatus };
        protected ChromelyResponse Forbidden(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = ForbiddenStatus };
        protected ChromelyResponse Conflict(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = ConflictStatus };
        protected ChromelyResponse ServerError(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 500 };
        protected ChromelyResponse NotSupported(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = NotSupportedStatus };
        protected ChromelyResponse Ok(IChromelyRequest req, object data = null)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = new ActionResult(data) };
        protected ChromelyResponse NoContent(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = NoContentStatus };
        protected ChromelyResponse NotModified(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = NotModifiedStatus };
        protected ChromelyResponse Created(IChromelyRequest req)
            => new ChromelyResponse() { RequestId = req.Id, Status = 200, Data = CreatedStatus };
    }
}
