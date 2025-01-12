package com.debateproject.backend.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "discussions")
public class Discussion {
    @Id
    private String id;

    private String topic;
    private String category;
    private int leftAgreeRatio;
    private int rightAgreeRatio;

    // Constructors
    public Discussion() {}

    public Discussion(String topic, String category, int leftAgreeRatio, int rightAgreeRatio) {
        this.topic = topic;
        this.category = category;
        this.leftAgreeRatio = leftAgreeRatio;
        this.rightAgreeRatio = rightAgreeRatio;
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
}
