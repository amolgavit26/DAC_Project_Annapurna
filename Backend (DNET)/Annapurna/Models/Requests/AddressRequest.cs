namespace Annapurna.Models.Requests
{
    public class AddressRequest
    {
        public string Street { get; set; } = "";
        public string City { get; set; } = "";
        public string State { get; set; } = "";
        public string PinCode { get; set; } = "";
        public string Country { get; set; } = "";
    }
}
