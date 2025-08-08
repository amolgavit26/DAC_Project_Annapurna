using Microsoft.EntityFrameworkCore;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.Services
{
    public class TiffinService
    {
        private readonly ApplicationDbContext _context;

        public TiffinService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tiffin>> GetTiffinsForCustomerByPinCode(string pinCode)
        {
            return await _context.Tiffins
                .Include(t => t.Vendor)
                .Include(t => t.Vendor.Address)
                .Where(t => t.Vendor.Address != null && t.Vendor.Address.PinCode == pinCode)
                .ToListAsync();
        }
    }
}
