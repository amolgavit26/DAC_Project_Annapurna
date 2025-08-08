using AnnapurnaAPI.Models;

namespace AnnapurnaAPI.DTOs
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;  // Change this to string for role as text
        public AddressResponseDTO? Address { get; set; }

        // Static method to map User to UserResponseDTO
        public static UserResponseDTO FromUser(User user)
        {
            return new UserResponseDTO
            {
                Id = (int)user.Id,
                FullName = user.FullName,
                Email = user.Email,
                MobileNumber = user.MobileNumber,
                Role = user.Role.ToString(),  // Convert Role to string
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
