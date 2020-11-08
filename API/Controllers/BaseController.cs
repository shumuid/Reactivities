using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route ("api/[controller]")]
    // this attribute substitutes ModelState.IsValid check to throw bad requests 400 errors when the data model is not valid
    // it also replaces the need to use [FromBody] attributes
    [ApiController] 
    public class BaseController: ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());
    }
}