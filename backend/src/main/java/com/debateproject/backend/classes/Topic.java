package com.debateproject.backend.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "topics")
public class Topic {

    @Id
    private String id;
    private String title;
    private String category;
    private int viewers;

    public Topic() {}

    public Topic(String title, String category, int viewers) {
        this.title = title;
        this.category = category;
        this.viewers = viewers;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getViewers() {
        return viewers;
    }

    public void setViewers(int viewers) {
        this.viewers = viewers;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", viewers=" + viewers +
                '}';
    }
}
