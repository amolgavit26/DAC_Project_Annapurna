using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.DTOs
{
    public class OrderResponseDTO
    {
        public long OrderId { get; set; }     // changed
        public long TiffinId { get; set; }    // changed
        public string TiffinName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public OrderStatus Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public DateTime OrderTime { get; set; }
        public string? RazorpayOrderId { get; set; }

        public OrderResponseDTO() { }

        public OrderResponseDTO(long orderId, long tiffinId, string tiffinName, int quantity, double totalPrice, OrderStatus status, PaymentStatus paymentStatus, DateTime orderTime, string? razorpayOrderId)
        {
            OrderId = orderId;
            TiffinId = tiffinId;
            TiffinName = tiffinName;
            Quantity = quantity;
            TotalPrice = totalPrice;
            Status = status;
            PaymentStatus = paymentStatus;
            OrderTime = orderTime;
            RazorpayOrderId = razorpayOrderId;
        }
    }
}
