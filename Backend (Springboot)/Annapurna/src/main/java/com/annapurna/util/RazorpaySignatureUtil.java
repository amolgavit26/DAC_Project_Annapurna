package com.annapurna.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class RazorpaySignatureUtil {

    public static boolean verifySignature(String orderId, String paymentId, String razorpaySignature, String secret) throws Exception {
        String payload = orderId + '|' + paymentId;

        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secret_key);

        byte[] hash = sha256_HMAC.doFinal(payload.getBytes());
        String generatedSignature = Base64.getEncoder().encodeToString(hash);

        return generatedSignature.equals(razorpaySignature);
    }
}
