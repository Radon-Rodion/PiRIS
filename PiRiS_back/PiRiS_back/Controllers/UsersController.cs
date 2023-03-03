using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Enums;
using PiRiS_back.Middleware;
using PiRiS_back.Models;
using PiRiS_back.Services;
using PiRiS_back.ViewModels;
using static PiRiS_back.Services.UserInfoFillerService;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersController : ControllerBase
    {
        ApplicationDbContext _context;
        UserInfoFillerService _userInfoFillerService;

        public UsersController(ApplicationDbContext context, UserInfoFillerService userInfoFillerService)
        {
            _context = context;
            _userInfoFillerService = userInfoFillerService;
        }

        [HttpGet]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetUsersList()
        {
            return new OkObjectResult(_context.Users.ToList());
        }

        [HttpGet("user")]
        [AuthFilter]
        public async Task<IActionResult> GetCurrentUserInfo()
        {
            var userName = HttpContext.User.Identity.Name;
            return new OkObjectResult(new UserViewModel(await _context.Users.FirstAsync(u => u.UserName == userName), _context));
        }

        [HttpGet("user/{id}")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetUserInfo(int? id)
        {
            var res = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (res == null)
            {
                return new BadRequestObjectResult($"Invalid id: {id}. User not found!");
            }
            return new OkObjectResult(new UserViewModel(res, _context));
        }

        [HttpPost("create")]
        [IdentityNameFilter]
        public async Task<object> CreateUser(UserViewModel userViewModel)
        {
            try
            {
                User newUser = new();
                _userInfoFillerService.FillUserInfo(userViewModel, _context, newUser);
                var currUserName = HttpContext.User.Identity?.Name;
                if (!(currUserName is not null && _context.Users.Any(u => u.UserName == currUserName)) && HttpContext.Session.GetString(currUserName ?? "") != Constants.AUTHORIZED) //if user not authorized then it's registration
                {
                    newUser.UserName = currUserName;
                }
                await _context.AddAsync(newUser);
                await _context.SaveChangesAsync();
                HttpContext.Response.StatusCode = 201;
                return newUser;
            }
            catch (UserValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut("edit")]
        [AuthFilter]
        public async Task<IActionResult> EditCurrentUser([FromForm] UserViewModel userViewModel)
        {
            try
            {
                var currUser = _context.Users.First(u => u.UserName == HttpContext.User.Identity.Name);
                _userInfoFillerService.FillUserInfo(userViewModel, _context, currUser, false);

                _context.Update(currUser);
                await _context.SaveChangesAsync();
                return new OkObjectResult(currUser);
            }
            catch (UserValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut("edit/{id}")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> EditUser(int? id, [FromForm] UserViewModel userViewModel)
        {
            try
            {
                var editedUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (editedUser == null)
                {
                    return new BadRequestObjectResult($"Invalid id: {id}. User not found!");
                }
                _userInfoFillerService.FillUserInfo(userViewModel, _context, editedUser, false);

                _context.Update(editedUser);
                await _context.SaveChangesAsync();
                return new OkObjectResult(editedUser);
            }
            catch (UserValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpDelete("delete")]
        [AuthFilter]
        public async Task<IActionResult> DeleteCurrentUser()
        {
            var currUser = await _context.Users.FirstAsync(u => u.UserName == HttpContext.User.Identity.Name);
            HttpContext.Session.Remove(currUser.UserName ?? ""); //if user tries to delete himself then he will be logged out
            _context.Remove(currUser);
            await _context.SaveChangesAsync();
            return new NoContentResult();
        }

        [HttpDelete("delete/{id}")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> DeleteUser(int? id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userToDelete == null)
            {
                return new NoContentResult();
            }
            var currUserName = HttpContext.User.Identity?.Name;

            if (userToDelete.UserName == currUserName) //if user tries to delete himself then he will be logged out
            {
                HttpContext.Session.Remove(currUserName ?? "");
            }
            _context.Remove(userToDelete);
            await _context.SaveChangesAsync();
            return new NoContentResult();
        }
    }
}
