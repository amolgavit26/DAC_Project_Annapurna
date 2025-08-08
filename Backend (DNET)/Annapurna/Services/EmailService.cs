using System.Net.Mail;
using System.Net;

namespace AnnapurnaAPI.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendStatusUpdateEmail(string email, string customerName, string tiffinName, string status)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["Email:Host"])
                {
                    Port = int.Parse(_configuration["Email:Port"] ?? "587"),
                    Credentials = new NetworkCredential(_configuration["Email:Username"], _configuration["Email:Password"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Email:Username"] ?? ""),
                    Subject = "Order Status Update",
                    Body = $"Dear {customerName},\n\nYour order for {tiffinName} has been updated to {status}.\n\nThank you for choosing Annapurna Tiffin Service!",
                    IsBodyHtml = false
                };

                mailMessage.To.Add(email);

                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Log the error but don't throw to avoid breaking the main flow
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
    }
}
