using System.ComponentModel.DataAnnotations;

namespace AnnapurnaAPI.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        [StringLength(15)]
        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        public Role Role { get; set; }

        // Navigation properties
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
        public virtual ICollection<Tiffin> Tiffins { get; set; } = new List<Tiffin>();
        public virtual Address? Address { get; set; }
    }
}
