using System.Security.Cryptography;
using System.Text;

namespace AnnapurnaAPI.Utils
{
    public static class RazorpaySignatureUtil
    {
        public static bool VerifySignature(string razorpayOrderId, string razorpayPaymentId, string razorpaySignature, string secret)
        {
            try
            {
                var text = $"{razorpayOrderId}|{razorpayPaymentId}";
                var key = Encoding.UTF8.GetBytes(secret);
                var message = Encoding.UTF8.GetBytes(text);

                using (var hmac = new HMACSHA256(key))
                {
                    var hash = hmac.ComputeHash(message);
                    var expectedSignature = Convert.ToBase64String(hash);

                    return razorpaySignature == expectedSignature;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
