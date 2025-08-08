namespace AnnapurnaAPI.DTOs
{
    public class TiffinDTO
    {
        public long Id { get; set; } // changed from int to long
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public string? VendorName { get; set; }
        public string? Category { get; set; }
        public string? ImageUrl { get; set; }
    }
}
