using Razorpay.Api;
using System.Collections.Generic;

namespace AnnapurnaAPI.Services
{
    public class RazorpayService
    {
        private readonly RazorpayClient _client;

        public RazorpayService(IConfiguration configuration)
        {
            var keyId = configuration["Razorpay:KeyId"];
            var keySecret = configuration["Razorpay:KeySecret"];
            _client = new RazorpayClient(keyId, keySecret);
        }

        public Dictionary<string, object> CreateOrder(long amount, string currency, string receipt)
        {
            var options = new Dictionary<string, object>
            {
                { "amount", amount },
                { "currency", currency },
                { "receipt", receipt }
            };

            var order = _client.Order.Create(options);
            return order.Attributes;
        }
    }
}
