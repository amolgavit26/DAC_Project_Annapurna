namespace AnnapurnaAPI.DTOs
{
    public class OrderDTO
    {
        public long TiffinId { get; set; }
        public long OrderId { get; set; }
        public string TiffinName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerMobileNumber { get; set; } = string.Empty;
    }
}
