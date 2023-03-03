namespace PiRiS_back.Models
{
    public class DebetContractOption
    {
        public int Id { get; set; }
        public bool IsRequestable { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string AvailableCurrencies { get; set; }
        public decimal? SumFrom { get; set; }
        public decimal? SumTo { get; set; }
        public int? MinDurationInMonth { get; set; }
        public int? MaxDurationInMonth { get; set; }
        public decimal PercentPerYear { get; set; }
    }
}
