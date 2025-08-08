using AnnapurnaAPI.DTOs;
using System.ComponentModel.DataAnnotations;

public class UserDTO
{
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public int Role { get; set; }  // Role ko ab integer type mein change kiya

    public AddressDTO? Address { get; set; }

    [Required(ErrorMessage = "Mobile number is required.")]
    [StringLength(15, MinimumLength = 10, ErrorMessage = "Mobile number must be between 10 and 15 digits.")]
    public string MobileNumber { get; set; } = string.Empty;
}
