using Microsoft.EntityFrameworkCore;
using PiRiS_back.Models;

namespace PiRiS_back.ViewModels
{
    public class AccountStatesViewModel
    {
        public List<TransactionViewModel> TransactionList { get; set; }
        public Account Account { get; set; }
    }
}
