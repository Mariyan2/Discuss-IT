package com.debateproject.backend.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

// User Class mapped to MongoDB document
@Document(collection = "users")
public class User {
    @Id
    private String id;
    @Field("user_name")
    private String userName;
    @Field("user_password")
    private String userPassword;
    @Field("tag_of_interest")
    private String tagOfInterest;
    @Field("join_data")
    private String joinData;
    @Field("chat_history")
    private String chatHistory;


    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getTagOfInterest() {
        return tagOfInterest;
    }

    public void setTagOfInterest(String tagOfInterest) {
        this.tagOfInterest = tagOfInterest;
    }

    public String getJoinData() {
        return joinData;
    }

    public void setJoinData(String joinData) {
        this.joinData = joinData;
    }

    public String getChatHistory() {
        return chatHistory;
    }

    public void setChatHistory(String chatHistory) {
        this.chatHistory = chatHistory;
    }
}
