using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using PiRiS_back.Enums;

namespace PiRiS_back.Middleware
{
    public class AuthFilter : Attribute, IResourceFilter
    {
        int _role = Roles.USER;
        ApplicationDbContext? _context = null;

        public AuthFilter() { }
        public AuthFilter(int role, ApplicationDbContext? context)
        {
            _role = role;
            _context = context;
        }

        public void OnResourceExecuted(ResourceExecutedContext context) { }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            var user = context.HttpContext.User;
            try
            {
                if (context.HttpContext.Session.GetString(user.Identity?.Name ?? "") != Constants.AUTHORIZED)
                {
                    throw new InvalidOperationException("You are not authorized!");
                }
            } catch (InvalidOperationException ex) {
                context.Result = new UnauthorizedObjectResult("You are not authorized!");
            }
            if(_role>0 && _context is not null)
            {
                int userRoleId = _context.Users.FirstOrDefault(u => u.UserName == user.Identity.Name)?.Surname?.GetHashCode() ?? -1;
                if (userRoleId < _role)
                {
                    context.Result = new ForbidResult("Your access level is not enough to do this!");
                }
            }
            return;
        }
    }
}
