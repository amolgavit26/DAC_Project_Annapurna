namespace AnnapurnaAPI.DTOs
{
    public class SimpleUserDTO
    {
        public long Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? MobileNumber { get; set; }
    }
}
