﻿using Microsoft.AspNetCore.Mvc;
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
    public class CreditController: ControllerBase
    {
        ApplicationDbContext _context;
        ContractsServiceSingletone _contractsService;
        readonly IOptions<BankAccConfig> _config;
        AccountsService _accountsService;

        public CreditController(ApplicationDbContext context, ContractsServiceSingletone contractsService, IOptions<BankAccConfig> config, AccountsService accountsService)
        {
            _context = context;
            _contractsService = contractsService;
            _config = config;
            _accountsService = accountsService;
        }

        [HttpGet]
        [AuthFilter]
        public async Task<IActionResult> GetCurrentCreditContractsList()
        {
            var userName = HttpContext.User.Identity?.Name;
            var user = await _context.Users.FirstAsync(u => u.UserName == userName);
            var contracts = await _context.CreditContracts.Include(cc => cc.CreditContractOption).Include(con => con.Account1).Where(con => con.Account1.UserId == user.Id)
                .Select(cc => new ContractViewModel(cc, _context)).ToListAsync();
            return new OkObjectResult(contracts);
        }

        [HttpGet("{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetCreditContract(int? id)
        {
            var contract = await _context.CreditContracts.Include(cc => cc.CreditContractOption).Include(con => con.Account1).FirstOrDefaultAsync(dc => dc.Id == id);
            var userName = HttpContext.User.Identity?.Name;
            var user = await _context.Users.FirstAsync(u => u.UserName == userName);

            if(contract == null) return new BadRequestObjectResult($"Invalid debet contract Id: {id}");
            if (contract.Account1.UserId != user.Id) return new StatusCodeResult(403);

            return new OkObjectResult(new ContractViewModel(contract, _context));
        }

        [HttpGet("all")]
        [AuthFilter] //Admin only
        public async Task<IActionResult> GetAllCreditContractsList()
        {
            return new OkObjectResult(await _context.CreditContracts.Include(cc => cc.CreditContractOption).Select(cc => new ContractViewModel(cc, _context)).ToListAsync());
        }

        [HttpGet("options")]
        [AuthFilter]
        public async Task<IActionResult> GetCreditContractOptionsList()
        {
            return new OkObjectResult(await _context.CreditContractOptions.ToListAsync());
        }

        [HttpGet("options/{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetCreditContractOption(int? id)
        {
            var res = new OkObjectResult(await _context.CreditContractOptions.FirstOrDefaultAsync(opt => opt.Id == id));
            if (res == null) return new BadRequestObjectResult($"Invalid debet contract option Id: {id}");
            return new OkObjectResult(res);
        }

        [HttpGet("contract-number/{id}")]
        [AuthFilter]
        public async Task<IActionResult> GetNumberForNewContract(int id)
        {
            var userId = (await _context.Users.FirstAsync(u => u.UserName == HttpContext.User.Identity.Name)).Id;
            return new OkObjectResult(await _contractsService.GetContractNumberAsync(_context, id, userId, false));
        }

        [HttpPost("options/{id}")]
        [AuthFilter]
        public async Task<IActionResult> SignCreditContract(int? id, [FromForm]ContractViewModel contract)
        {
            contract.OptionId = id;
            contract.PercentPerYear /= 100;
            var userName = HttpContext.User.Identity?.Name;
            try
            {
                await _contractsService.SignCreditContractAsync(contract, userName, _context, _accountsService);
            }
            catch(ContractValidationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new StatusCodeResult(201);
        }

    }
}
