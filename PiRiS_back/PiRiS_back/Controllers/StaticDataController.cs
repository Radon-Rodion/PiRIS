using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Middleware;
using PiRiS_back.Services;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class StaticDataController: ControllerBase
    {
        ApplicationDbContext _context;
        ContractsServiceSingletone _contractsService;

        public StaticDataController(ApplicationDbContext context, ContractsServiceSingletone contractsService)
        {
            _context = context;
            _contractsService = contractsService;
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

        [HttpGet("app-date")]
        public IActionResult GetAppDate()
        {
            return new OkObjectResult(_contractsService.AppDateTime);
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
