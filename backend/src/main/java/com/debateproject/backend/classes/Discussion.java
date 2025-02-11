package com.debateproject.backend.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "discussions")
public class Discussion {
    @Id
    private String id;

    private String topic;
    private String category;
    private int leftAgreeRatio;
    private int rightAgreeRatio;
    private String creator;
    private String opponent;
    private List<Map<String, String>> chat;



    // Constructors
    public Discussion() {
        this.chat = new ArrayList<>(); // Initialize chat to avoid null pointers
    }

    public Discussion(String topic, String category, String creator) {
        this.topic = topic;
        this.category = category;
        this.creator = creator;
        this.opponent = null; // Initially, no opponent until they join
        this.chat = new ArrayList<>();
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

    public void addChatMessage(Map<String, String> message) {
        if (this.chat == null) {
            this.chat = new ArrayList<>();
        }
        this.chat.add(message);
    }
}
