using System.ComponentModel.DataAnnotations;

namespace AnnapurnaAPI.Models
{
    public class Order
    {
        [Key]
        public long Id { get; set; }

        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public DateTime OrderTime { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual User Customer { get; set; } = null!;
        public long CustomerId { get; set; }  //  Changed to long

        public virtual Tiffin Tiffin { get; set; } = null!;
        public long TiffinId { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.PENDING;
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.PENDING;

        // Razorpay fields
        public string? RazorpayOrderId { get; set; }
        public string? RazorpayReceipt { get; set; }
        public string? RazorpayStatus { get; set; }
        public string? RazorpayPaymentId { get; set; }
    }
}
