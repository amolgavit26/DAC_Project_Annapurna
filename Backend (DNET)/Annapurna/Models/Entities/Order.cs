using Annapurna.Models.Entities;
using Annapurna.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Annapurna.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime OrderDate { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public double TotalAmount { get; set; }

        public int CustomerId { get; set; }
        public User Customer { get; set; }

        public int? DeliveryPersonId { get; set; }
        public User? DeliveryPerson { get; set; }

        public ICollection<Tiffin> Tiffins { get; set; } = new List<Tiffin>();
    }
}

