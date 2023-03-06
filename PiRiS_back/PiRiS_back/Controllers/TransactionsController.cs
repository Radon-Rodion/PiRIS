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
        AccountsService _accountsService;

        public TransactionsController(ApplicationDbContext context, ContractsServiceSingletone contractsService, AccountsService accountsService)
        {
            _context = context;
            _contractsService = contractsService;
            _accountsService = accountsService;
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

        [HttpGet("bank")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetBankTransactionsList()
        {
            return new OkObjectResult(await _context.Transactions.ToListAsync());
        }

        [HttpPost("closeDay")]
        public async Task<IActionResult> CloseBankDay()
        {
            try
            {
                await _contractsService.SkipDayAsync(_context, _accountsService);
                return new OkResult();
            } catch (Exception e)
            {
                return new BadRequestObjectResult($"{e.Message}");
            }
        }

        [HttpPost("closeMonth")]
        public async Task<IActionResult> CloseBankMonth()
        {
            try
            {
                await _contractsService.SkipMonthAsync(_context, _accountsService);
                return new OkResult();
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult($"{e.Message}");
            }
        }

        [HttpPost("perform")]
        public async Task<IActionResult> PerformTransaction()
        {
            return new StatusCodeResult(201); //TODO
        }

        [HttpPost("getMoney")]
        public async Task<IActionResult> GetMoney()
        {
            return new StatusCodeResult(201); //TODO
        }
    }
}
