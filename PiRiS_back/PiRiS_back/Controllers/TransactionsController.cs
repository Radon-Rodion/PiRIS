using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Middleware;
using PiRiS_back.Services;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        ApplicationDbContext _context;
        ContractsServiceSingletone _contractsService;

        public TransactionsController(ApplicationDbContext context, ContractsServiceSingletone contractsService)
        {
            _context = context;
            _contractsService = contractsService;
        }

        [HttpGet]
        [AuthFilter]
        public async Task<IActionResult> GetTransactionsList()
        {
            var userName = HttpContext.User.Identity?.Name;
            try
            {
                return new OkObjectResult(await _contractsService.GetUserTransactionsAsync(userName, _context));
            } catch (TransactionValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpGet("all")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetAllTransactionsList()
        {
            return new OkObjectResult(await _context.Transactions.ToListAsync());
        }

        [HttpPost("perform")]
        [AuthFilter]
        public async Task<IActionResult> PerformTransaction()
        {
            return new StatusCodeResult(201);
        }
    }
}
