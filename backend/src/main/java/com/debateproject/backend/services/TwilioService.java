package com.debateproject.backend.services;
import com.twilio.Twilio;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.api.key}")
    private String apiKey;

    @Value("${twilio.api.secret}")
    private String apiSecret;

    public String generateToken(String roomName) {
        Twilio.init(apiKey, apiSecret, accountSid);

        VideoGrant grant = new VideoGrant();
        grant.setRoom(roomName);

        AccessToken token = new AccessToken.Builder(accountSid, apiKey, apiSecret)
                .identity("User_" + System.currentTimeMillis())
                .grant(grant)
                .build();

        return token.toJwt();


    }
}
