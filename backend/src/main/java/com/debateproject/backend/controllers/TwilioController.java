package com.debateproject.backend.controllers;

import com.twilio.Twilio;
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/twilio")
public class TwilioController {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.api.key}")
    private String apiKey;

    @Value("${twilio.api.secret}")
    private String apiSecret;

    @GetMapping("/token")
    public Map<String, String> getTwilioToken(@RequestParam String identity, @RequestParam String roomName) {
        Twilio.init(apiKey, apiSecret, accountSid);

        VideoGrant grant = new VideoGrant().setRoom(roomName);

        AccessToken token = new AccessToken.Builder(accountSid, apiKey, apiSecret)
                .identity(identity)
                .grant(grant)
                .build();


        Map<String, String> response = new HashMap<>();
        response.put("token", token.toJwt());
        return response;
    }
}
