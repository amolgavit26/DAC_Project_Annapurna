using Annapurna.Models.Entities;
using Annapurna.Models.Requests;

namespace Annapurna.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> AuthenticateAsync(LoginRequest request);
        Task<bool> EmailExistsAsync(string email);
        Task<User> RegisterAsync(RegisterRequest request);
        Task<User?> GetUserByIdAsync(int id);
        Task SaveAsync();

    }
}
