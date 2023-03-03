using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;

namespace PiRiS_back.Middleware
{
    public class IdentityNameFilter : Attribute, IResourceFilter
    {
        public void OnResourceExecuted(ResourceExecutedContext context) { }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var currUserName = context.HttpContext.User.Identity?.Name;
            if (String.IsNullOrEmpty(currUserName))
            {
                context.Result = new BadRequestObjectResult("Can not read your name during authentication!");
            }
            return;
        }
    }
}
