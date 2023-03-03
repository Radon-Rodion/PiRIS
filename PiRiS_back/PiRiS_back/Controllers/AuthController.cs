using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Enums;
using PiRiS_back.Middleware;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthController : ControllerBase
    {
        ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [IdentityNameFilter]
        public async Task<object> Auth()
        {
            var currUserName = HttpContext.User.Identity?.Name;
            if (await _context.Users.AnyAsync(u => u.UserName == currUserName))
            {
                HttpContext.Session.SetString(currUserName, Constants.AUTHORIZED);
                return new OkObjectResult((await _context.Users.FirstAsync(u => u.UserName == currUserName)).RoleId);
            }
            return new BadRequestObjectResult("You are not registered in system!");
        }

        [HttpPost("logout")]
        public object Logout()
        {
            var currUserName = HttpContext.User.Identity?.Name;
            HttpContext.Session.Remove(currUserName ?? "");
            return Ok();
        }
    }
}
