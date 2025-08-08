using System.ComponentModel.DataAnnotations;

namespace AnnapurnaAPI.Models
{
    public class Address
    {
        [Key]
        public long Id { get; set; }

        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PinCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public long UserId { get; set; }

        // Navigation property
        public virtual User User { get; set; } = null!;
    }
}
