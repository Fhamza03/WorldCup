package com.fssm.worldcup.Services.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Accommodation;
import com.fssm.worldcup.Repositories.Accommodation.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccommodationService {
    @Autowired
    AccommodationRepository accommodationRepository;

    public Accommodation saveAccommodation(Accommodation accommodation) {
        try {
            return accommodationRepository.save(accommodation);
        } catch (Exception e) {
            throw new RuntimeException("Error saving accommodation: " + e.getMessage());
        }
    }

    public Accommodation updateAccommodation(Accommodation accommodation) {
        try {
            return accommodationRepository.save(accommodation);
        } catch (Exception e) {
            throw new RuntimeException("Error updating accommodation: " + e.getMessage());
        }
    }
    public void deleteAccommodation(Integer accommodationId) {
        try {
            accommodationRepository.deleteById(accommodationId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting accommodation: " + e.getMessage());
        }
    }
    public Accommodation findAccommodationById(Integer idAccommodation) {
        return accommodationRepository.findById(idAccommodation).orElseThrow(() -> new RuntimeException("Accommodation not found"));
    }

    public List<Accommodation> findAllAccommodation() {
        try {
            return accommodationRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error finding all accommodations: " + e.getMessage());
        }
    }

    public boolean existsById(Integer id) {
        return accommodationRepository.existsById(id);
    }

}
