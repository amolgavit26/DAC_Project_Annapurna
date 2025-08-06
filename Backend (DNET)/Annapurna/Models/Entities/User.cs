using Annapurna.Models.Entities;
using Annapurna.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Annapurna.Models.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string MobileNumber { get; set; } = string.Empty;

        public Role Role { get; set; }

        public Address Address { get; set; } = new Address();

        // Navigation: Orders placed by user
        public ICollection<Order> Orders { get; set; } = new List<Order>();

        // Navigation: Orders delivered by delivery boy
        public ICollection<Order> Deliveries { get; set; } = new List<Order>();
    }
}
