using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Annapurna.Models.Entities
{
    public class Address
    {
        [Key]
        public int Id { get; set; } // changed from long to int

        public string Street { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string State { get; set; } = string.Empty;

        public string PinCode { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        [ForeignKey("User")]
        public int UserId { get; set; } // changed from long to int

        public User User { get; set; } = null!;
    }
}
