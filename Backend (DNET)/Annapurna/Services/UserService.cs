using Annapurna.Data;
using Annapurna.Models.Entities;
using Annapurna.Models.Requests;
using Microsoft.EntityFrameworkCore;
using Annapurna.Services.Interfaces;

namespace Annapurna.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(LoginRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || user.Password != request.Password)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            return user;
        }

        public async Task<User> RegisterAsync(RegisterRequest request)
        {
            if (await EmailExistsAsync(request.Email))
            {
                throw new InvalidOperationException("Email already exists.");
            }

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password,
                MobileNumber = request.MobileNumber,
                Role = request.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var address = new Address
            {
                Street = request.Street,
                City = request.City,
                State = request.State,
                PinCode = request.PinCode,
                Country = request.Country,
                UserId = user.Id
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }


    }
}
