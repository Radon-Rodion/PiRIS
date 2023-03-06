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

        [HttpPatch("acc")]
        public async Task<IActionResult> CheckAcc(int accNumber)
        {
            if (await _context.Accounts.AnyAsync(acc => acc.Number == accNumber.ToString() && (acc.IsActive == true || acc.IsActive == null)))
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("Счёт не существует или является пассивным!");
        }

        [HttpPatch("pin")]
        public async Task<IActionResult> CheckPin( BankomatViewModel model)
        {
            if (await _context.Accounts.AnyAsync(acc => acc.Number == model.Acc && (acc.IsActive == true || acc.IsActive == null) && acc.Pin == model.Pin))
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("Неверный PIN-код!");
        }

        [HttpPatch("sum")]
        public async Task<IActionResult> CheckSum( BankomatViewModel model)
        {
            if (await _context.Accounts.Include(acc => acc.Currency).
                AnyAsync(acc => acc.Number == model.Acc && (acc.IsActive == true || acc.IsActive == null) && ((acc.Debet - acc.Credit) >= (model.Sum / acc.Currency.BynPrice)))) //TODO: check comparison logic
            {
                return new OkResult();
            }
            else return new BadRequestObjectResult("На счету нет такой суммы!");
        }

        [HttpPatch("state")]
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
