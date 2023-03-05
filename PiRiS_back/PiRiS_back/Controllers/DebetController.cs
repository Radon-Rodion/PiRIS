using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PiRiS_back.Enums;
using PiRiS_back.Middleware;
using PiRiS_back.Services;
using PiRiS_back.ViewModels;

namespace PiRiS_back.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DebetController: ControllerBase
    {
        ApplicationDbContext _context;
        ContractsServiceSingletone _contractsService;
        readonly IOptions<BankAccConfig> _config;
        AccountsService _accountsService;

        public DebetController(ApplicationDbContext context, ContractsServiceSingletone contractsService, IOptions<BankAccConfig> config, AccountsService accountsService)
        {
            _context = context;
            _contractsService = contractsService;
            _config = config;
            _accountsService = accountsService;
        }

        [HttpGet]
        [AuthFilter]
        public async Task<IActionResult> GetCurrentDebetContractsList()
        {
            var userName = HttpContext.User.Identity?.Name;
            var user = await _context.Users.FirstAsync(u => u.UserName == userName);
            return new OkObjectResult(_context.DebetContracts.Where(con => con.Account1Id == user.Id).ToList());
        }

        [HttpGet("{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetNumberForNewContract(int id)
        {
            var userId = (await _context.Users.FirstAsync(u => u.UserName == HttpContext.User.Identity.Name)).Id;
            return new OkObjectResult(await _contractsService.GetContractNumberAsync(_context, id, userId, true));
        }

        [HttpGet("{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetDebetContract(int? id)
        {
            var contract = await _context.DebetContracts.FirstOrDefaultAsync(dc => dc.Id == id);
            var userName = HttpContext.User.Identity?.Name;
            var user = await _context.Users.FirstAsync(u => u.UserName == userName);

            if(contract == null) return new BadRequestObjectResult($"Invalid debet contract Id: {id}");
            if (contract.Account1Id != user.Id) return new StatusCodeResult(403);

            return new OkObjectResult(new ContractViewModel(contract, _context));
        }

        [HttpGet("all")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetAllDebetContractsList()
        {
            return new OkObjectResult(await _context.DebetContracts.ToListAsync());
        }

        [HttpGet("options")]
        [AuthFilter]
        public async Task<IActionResult> GetDebetContractOptionsList()
        {
            return new OkObjectResult(await _context.DebetContractOptions.ToListAsync());
        }

        [HttpGet("options/{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetDebetContractOption(int? id)
        {
            var res = new OkObjectResult(await _context.DebetContractOptions.FirstOrDefaultAsync(opt => opt.Id == id));
            if (res == null) return new BadRequestObjectResult($"Invalid debet contract option Id: {id}");
            return new OkObjectResult(res);
        }

        [HttpPost("options/{id}")]
        [AuthFilter]
        public async Task<IActionResult> SignDebetContract(int? id, ContractViewModel contract)
        {
            contract.OptionId = id;
            var userName = HttpContext.User.Identity?.Name;
            try
            {
                await _contractsService.SignDebetContractAsync(contract, userName, _context, _accountsService);
            }
            catch(ContractValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new StatusCodeResult(201);
        }

    }
}
