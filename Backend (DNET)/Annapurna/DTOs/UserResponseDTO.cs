using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.DTOs
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public AddressResponseDTO? Address { get; set; }

        public static UserResponseDTO FromUser(User user)
        {
            return new UserResponseDTO
            {
                Id = (int)user.Id,
                FullName = user.FullName,
                Email = user.Email,
                MobileNumber = user.MobileNumber,
                Role = user.Role.ToString(),
                Address = user.Address != null ? new AddressResponseDTO
                {
                    Id = (int)user.Address.Id,
                    Street = user.Address.Street,
                    City = user.Address.City,
                    State = user.Address.State,
                    PinCode = user.Address.PinCode,
                    Country = user.Address.Country
                } : null
            };
        }
    }
}
