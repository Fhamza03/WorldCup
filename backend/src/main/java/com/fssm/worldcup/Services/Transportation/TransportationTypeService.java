package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.TransportationType;
import com.fssm.worldcup.Repositories.Transportation.TransportationTypeRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationTypeService {

    @Autowired
    private TransportationTypeRepository transportationTypeRepository;

    public TransportationType saveTransportationType(TransportationType transportationType) {
        try {
            return transportationTypeRepository.save(transportationType);
        } catch (Exception e) {
            throw new RuntimeException("Error saving transportation type: " + e.getMessage());
        }
    }

    public TransportationType findTransportationTypeById(Integer id) {
        Optional<TransportationType> transportationType = transportationTypeRepository.findById(id);
        if (transportationType.isEmpty()) {
            throw new ResourceNotFoundException("Transportation type not found with id: " + id);
        }
        return transportationType.get();
    }

    public List<TransportationType> findAllTransportationTypes() {
        return transportationTypeRepository.findAll();
    }

    public void deleteTransportationTypeById(Integer id) {
        if (!transportationTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transportation type not found with id: " + id);
        }
        transportationTypeRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return transportationTypeRepository.existsById(id);
    }
}
