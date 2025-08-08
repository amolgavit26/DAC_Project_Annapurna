using System.ComponentModel.DataAnnotations;

namespace AnnapurnaAPI.DTOs
{
    public class AddressDTO
    {
        [Required(ErrorMessage = "Street is required.")]
        public string Street { get; set; } = string.Empty;

        [Required(ErrorMessage = "City is required.")]
        public string City { get; set; } = string.Empty;

        [Required(ErrorMessage = "State is required.")]
        public string State { get; set; } = string.Empty;

        [Required(ErrorMessage = "PinCode is required.")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "PinCode must be exactly 6 digits.")]
        public string PinCode { get; set; } = string.Empty;

        [Required(ErrorMessage = "Country is required.")]
        public string Country { get; set; } = string.Empty;
    }
}
