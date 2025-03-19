package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.Journey;
import com.fssm.worldcup.Repositories.Transportation.JourneyRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JourneyService {

    @Autowired
    private JourneyRepository journeyRepository;

    public Journey saveJourney(Journey journey) {
        try {
            return journeyRepository.save(journey);
        } catch (Exception e) {
            throw new RuntimeException("Error saving journey: " + e.getMessage());
        }
    }

    public Journey findJourneyById(Integer id) {
        Optional<Journey> journey = journeyRepository.findById(id);
        if (journey.isEmpty()) {
            throw new ResourceNotFoundException("Journey not found with id: " + id);
        }
        return journey.get();
    }

    public List<Journey> findAllJourneys() {
        return journeyRepository.findAll();
    }

    public void deleteJourneyById(Integer id) {
        if (!journeyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Journey not found with id: " + id);
        }
        journeyRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return journeyRepository.existsById(id);
    }
}
