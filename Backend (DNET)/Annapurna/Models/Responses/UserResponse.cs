namespace Annapurna.Models.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string MobileNumber { get; set; } = default!;
        public string Role { get; set; } = default!;
        public AddressResponse Address { get; set; } = new();
    }
}
