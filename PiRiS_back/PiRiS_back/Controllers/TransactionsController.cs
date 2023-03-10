using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PiRiS_back.Enums;
using PiRiS_back.Middleware;
using PiRiS_back.Models;
using PiRiS_back.Services;
using PiRiS_back.ViewModels;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        ApplicationDbContext _context;
        ContractsServiceSingletone _contractsService;
        readonly IOptions<BankAccConfig> _config;
        AccountsService _accountsService;

        public TransactionsController(ApplicationDbContext context, ContractsServiceSingletone contractsService, AccountsService accountsService, IOptions<BankAccConfig> config)
        {
            _context = context;
            _contractsService = contractsService;
            _config = config;
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
            try
            {
                return new OkObjectResult(await _contractsService.GetBankTransactionsAsync(_context));
            }
            catch (TransactionValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
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
        public async Task<IActionResult> PerformTransaction(BankomatViewModel model)
        {
            bool? fromActive = (await _context.Accounts.FirstOrDefaultAsync(acc => acc.Number == model.Acc))?.IsActive;
            bool? toActive = (await _context.Accounts.FirstOrDefaultAsync(acc => acc.Number == model.To))?.IsActive;
            await _accountsService.CreateTransactionAsync(model.Acc, fromActive==false, model.To, toActive==true, model.Sum, _context.Currencies.First(cur => cur.Name=="BYN"), _context, _contractsService.AppDateTime, true);
            return new StatusCodeResult(201);
        }

        [HttpPost("getMoney")]
        public async Task<IActionResult> GetMoney(BankomatViewModel model)
        {
            bool? fromActive = (await _context.Accounts.FirstOrDefaultAsync(acc => acc.Number == model.Acc))?.IsActive;
            var cassaNumber = (await _context.Accounts.FirstAsync(acc => acc.Code == _config.Value.BankAccountActive)).Number;
            await _accountsService.CreateTransactionAsync(model.Acc, fromActive==false, cassaNumber, false, model.Sum, _context.Currencies.First(cur => cur.Name == "BYN"), _context, _contractsService.AppDateTime, true);
            return new StatusCodeResult(201);
        }
    }
}
