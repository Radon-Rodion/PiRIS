using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Middleware;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class StaticDataController: ControllerBase
    {
        ApplicationDbContext _context;

        public StaticDataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("roles")]
        
        public async Task<IActionResult> GetRoles()
        {
            return new OkObjectResult(await _context.Roles.ToListAsync());
        }

        [HttpGet("citizenships")]

        public async Task<IActionResult> GetCitizenships()
        {
            return new OkObjectResult(await _context.Citizenships.ToListAsync());
        }

        [HttpGet("cities")]
        
        public async Task<IActionResult> GetCities()
        {
            return new OkObjectResult(await _context.Cities.ToListAsync());
        }

        [HttpGet("currencies")]

        public async Task<IActionResult> GetCurrencies()
        {
            return new OkObjectResult(await _context.Currencies.ToListAsync());
        }

        [HttpGet("disabilities")]
        
        public async Task<IActionResult> GetDisabilities()
        {
            return new OkObjectResult(await _context.Disabilities.ToListAsync());
        }

        [HttpGet("familyStatuses")]
        
        public async Task<IActionResult> GetFamilyStatuses()
        {
            return new OkObjectResult(await _context.FamilyStatuses.ToListAsync());
        }
    }
}
