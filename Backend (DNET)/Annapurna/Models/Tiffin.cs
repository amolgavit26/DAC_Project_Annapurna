using System.ComponentModel.DataAnnotations;

namespace AnnapurnaAPI.Models
{
    public class Tiffin
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public double Price { get; set; }

        public byte[]? Image { get; set; }
        public string? ImageUrl { get; set; }

        public virtual User Vendor { get; set; } = null!;
        public long VendorId { get; set; }

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        [Required]
        public TiffinCategory Category { get; set; }
    }

}
