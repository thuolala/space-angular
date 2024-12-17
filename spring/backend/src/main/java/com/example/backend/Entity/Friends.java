package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
}
