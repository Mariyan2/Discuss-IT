package com.debateproject.backend.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "discussions")
public class Discussion {
    @Id
    private String id;                           // Unique topic ID
    private String topic;                        // topic ( title )
    private String category;                     //
    private int leftAgreeRatio;                  // Colors the like bar trough calculating the ratio of the left users likes
    private int rightAgreeRatio;                 // Identical as leftAgreeRatio but for right user
    private String creator;                      // Creator of the discussion
    private String opponent;                     // Second (opponent) in the discussion
    private List<Map<String, String>> chat;      // Discussions chat
    private List<String> creatorLikes;           // Number of likes the creator side received
    private List<String> opponentLikes;          // Number of likes the opponent received
    private String creatorImageUrl;
    private String opponentImageUrl;


    // Constructors
    public Discussion() {
        this.chat = new ArrayList<>(); // Initialize chat to avoid null pointers
        this.creatorLikes = new ArrayList<>();
        this.opponentLikes = new ArrayList<>();
    }

    public Discussion(String topic, String category, String creator) {
        this.topic = topic;
        this.category = category;
        this.creator = creator;
        this.opponent = null; // the opponent is initially empty
        this.leftAgreeRatio = 50; // default value
        this.rightAgreeRatio = 50; // Default value
        this.chat = new ArrayList<>();
        this.creatorLikes = new ArrayList<>();
        this.opponentLikes = new ArrayList<>();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getLeftAgreeRatio() {
        return leftAgreeRatio;
    }

    public void setLeftAgreeRatio(int leftAgreeRatio) {
        this.leftAgreeRatio = leftAgreeRatio;
    }

    public int getRightAgreeRatio() {
        return rightAgreeRatio;
    }

    public void setRightAgreeRatio(int rightAgreeRatio) {
        this.rightAgreeRatio = rightAgreeRatio;
    }

    public String getCreator() { return creator; }

    public void setCreator(String creator) { this.creator = creator; }

    public String getOpponent() { return opponent; }

    public void setOpponent(String opponent) { this.opponent = opponent; }

    public List<Map<String, String>> getChat() {
        return chat;
    }

    public void setChat(List<Map<String, String>> chat) {
        this.chat = chat;
    }

    public List<String> getCreatorLikes() {
        return creatorLikes;
    }

    public void setCreatorLikes(List<String> creatorLikes) {
        this.creatorLikes = creatorLikes;
    }

    public List<String> getOpponentLikes() {
        return opponentLikes;
    }

    public void setOpponentLikes(List<String> opponentLikes) {
        this.opponentLikes = opponentLikes;
    }

    public void addChatMessage(Map<String, String> message) {
        if (this.chat == null) {
            this.chat = new ArrayList<>();
        }
        this.chat.add(message);
    }
}
