using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Annapurna.Models.Enums;

namespace Annapurna.Models.Entities
{
    public class Tiffin
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public byte[] Image { get; set; }

        public string ImageUrl { get; set; }

        public TiffinCategory Category { get; set; }

        // Foreign key
        public long VendorId { get; set; }

        public User Vendor { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
