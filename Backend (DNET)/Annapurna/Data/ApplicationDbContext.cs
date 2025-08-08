
using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Tiffin> Tiffins { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.FullName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Password).IsRequired();
                entity.Property(e => e.MobileNumber).HasMaxLength(15);

                // Set Role as integer in database
                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasConversion<int>();  // Store enum as integer in database
            });

            // Configure Address entity
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Street).IsRequired();
                entity.Property(e => e.City).IsRequired();
                entity.Property(e => e.State).IsRequired();
                entity.Property(e => e.PinCode).IsRequired();
                entity.Property(e => e.Country).IsRequired();

                // One-to-One relationship with User
                entity.HasOne(e => e.User)
                      .WithOne(e => e.Address)
                      .HasForeignKey<Address>(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Tiffin entity
            modelBuilder.Entity<Tiffin>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Price).IsRequired();
                entity.Property(e => e.Category).IsRequired()
                    .HasConversion<int>();  // Store enum as integer in database
                
                // Configure Image as nullable
                entity.Property(e => e.Image).IsRequired(false);
                entity.Property(e => e.ImageUrl).IsRequired(false);

                // Many-to-One relationship with User (Vendor)
                entity.HasOne(e => e.Vendor)
                      .WithMany(e => e.Tiffins)
                      .HasForeignKey(e => e.VendorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Order entity
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.TotalPrice).IsRequired();
                entity.Property(e => e.OrderTime).IsRequired();
                entity.Property(e => e.Status).IsRequired()
                    .HasConversion(
                        v => v.ToString(),
                        v => (OrderStatus)Enum.Parse(typeof(OrderStatus), v)
                    );
                entity.Property(e => e.PaymentStatus).IsRequired()
                    .HasConversion(
                        v => v.ToString(),
                        v => (PaymentStatus)Enum.Parse(typeof(PaymentStatus), v)
                    );

                // Many-to-One relationship with User (Customer)
                entity.HasOne(e => e.Customer)
                      .WithMany(e => e.Orders)
                      .HasForeignKey(e => e.CustomerId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Many-to-One relationship with Tiffin
                entity.HasOne(e => e.Tiffin)
                      .WithMany(e => e.Orders)
                      .HasForeignKey(e => e.TiffinId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

    }
}

