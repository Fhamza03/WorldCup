package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.Transportation;
import com.fssm.worldcup.Repositories.Transportation.TransportationRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationService {

    @Autowired
    private TransportationRepository transportationRepository;

    public Transportation saveTransportation(Transportation transportation) {
        try {
            return transportationRepository.save(transportation);
        } catch (Exception e) {
            throw new RuntimeException("Error saving transportation: " + e.getMessage());
        }
    }

    public Transportation findTransportationById(Integer id) {
        Optional<Transportation> transportation = transportationRepository.findById(id);
        if (transportation.isEmpty()) {
            throw new ResourceNotFoundException("Transportation not found with id: " + id);
        }
        return transportation.get();
    }

    public List<Transportation> findAllTransportations() {
        return transportationRepository.findAll();
    }

    public void deleteTransportationById(Integer id) {
        if (!transportationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transportation not found with id: " + id);
        }
        transportationRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return transportationRepository.existsById(id);
    }
}
