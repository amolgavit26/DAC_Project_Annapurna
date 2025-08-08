using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Models;
using AnnapurnaAPI.DTOs;

namespace AnnapurnaAPI.Services
{
    public class AddressService
    {
        private readonly ApplicationDbContext _context;

        public AddressService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task UpdateAddress(User user, AddressDTO addressDTO)
        {
            var existingAddress = await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == user.Id);

            if (existingAddress != null)
            {
                // Update existing address
                existingAddress.Street = addressDTO.Street;
                existingAddress.City = addressDTO.City;
                existingAddress.State = addressDTO.State;
                existingAddress.PinCode = addressDTO.PinCode;
                existingAddress.Country = addressDTO.Country;
            }
            else
            {
                // Create new address
                var address = new Address
                {
                    Street = addressDTO.Street,
                    City = addressDTO.City,
                    State = addressDTO.State,
                    PinCode = addressDTO.PinCode,
                    Country = addressDTO.Country,
                    UserId = user.Id
                };

                _context.Addresses.Add(address);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<Address?> GetAddressByUser(User user)
        {
            return await _context.Addresses.FirstOrDefaultAsync(a => a.UserId == user.Id);
        }
    }
}
