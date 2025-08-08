using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Models;
using AnnapurnaAPI.DTOs;
using BCrypt.Net;

namespace AnnapurnaAPI.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterUser(UserDTO dto)
        {
            // Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this email already exists");
            }

            // Hash password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Instead of trying to parse, directly cast the role to the enum
            if (!Enum.IsDefined(typeof(Role), dto.Role))
            {
                throw new InvalidOperationException("Invalid role provided");
            }

            Role role = (Role)dto.Role;  // Cast integer to Role enum

            // Create user and optionally address
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = hashedPassword,
                Role = role,  // Ensure the Role is set as the enum (which will be saved as its int value)
                MobileNumber = dto.MobileNumber,
                Address = dto.Address != null ? new Address
                {
                    Street = dto.Address.Street,
                    City = dto.Address.City,
                    State = dto.Address.State,
                    PinCode = dto.Address.PinCode,
                    Country = dto.Address.Country
                } : null
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync(); // saves user and address together

            return user;
        }






        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> ValidatePassword(string email, string password)
        {
            var user = await GetUserByEmail(email);
            if (user == null) return false;

            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }

        public async Task DeleteVendorById(long vendorId)
        {
            var vendor = await _context.Users
                .Include(u => u.Tiffins)
                .ThenInclude(t => t.Orders)
                .FirstOrDefaultAsync(u => u.Id == vendorId && u.Role == Role.VENDOR);

            if (vendor != null)
            {
                _context.Users.Remove(vendor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
