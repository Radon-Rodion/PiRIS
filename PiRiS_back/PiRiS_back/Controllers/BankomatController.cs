using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.ViewModels;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BankomatController: ControllerBase
    {
        ApplicationDbContext _context;

        public BankomatController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("acc")]
        public async Task<IActionResult> CheckAcc(string accNumber)
        {
            if (await _context.Accounts.AnyAsync(acc => acc.Number == accNumber && (acc.IsActive == true || acc.IsActive == null)))
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("Счёт не существует или является пассивным!");
        }

        [HttpGet("pin")]
        public async Task<IActionResult> CheckPin(string accNumber, string accPin)
        {
            if (await _context.Accounts.AnyAsync(acc => acc.Number == accNumber && (acc.IsActive == true || acc.IsActive == null) && acc.Pin == accPin))
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("Неверный PIN-код!");
        }

        [HttpGet("sum")]
        public async Task<IActionResult> CheckSum(string accNumber, decimal sum)
        {
            if (await _context.Accounts.Include(acc => acc.Currency).
                AnyAsync(acc => acc.Number == accNumber && (acc.IsActive == true || acc.IsActive == null) && ((acc.Debet + acc.Credit) >= (sum / acc.Currency.BynPrice))))
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("На счету нет такой суммы!");
        }

        [HttpGet("state")]
        public async Task<IActionResult> GetAccState( string accNumber)
        {
            var res = await _context.Accounts.Include(acc => acc.Currency).FirstOrDefaultAsync(acc => acc.Number == accNumber && (acc.IsActive == true || acc.IsActive == null));
            if (res != null)
            {
                res.Debet *= res.Currency.BynPrice;
                res.Credit *= res.Currency.BynPrice;

                return new OkObjectResult(res);
            }
            else return new BadRequestObjectResult("Счёт не существует или является пассивным!");
        }
    }
}
