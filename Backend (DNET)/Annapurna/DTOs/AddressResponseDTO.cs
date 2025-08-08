namespace AnnapurnaAPI.DTOs
{
    public class AddressResponseDTO
    {
        public int Id { get; set; }
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PinCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public AddressResponseDTO() { }

        public AddressResponseDTO(string street, string city, string state, string pinCode, string country)
        {
            Street = street;
            City = city;
            State = state;
            PinCode = pinCode;
            Country = country;
        }
    }
}
