package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.Restoration.Additional;
import com.fssm.worldcup.Repositories.Restoration.AdditionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdditionalService {

    @Autowired
    private AdditionalRepository additionalRepository;

    public List<Additional> getAllAdditionals() {
        return additionalRepository.findAll();
    }

    public Optional<Additional> getAdditionalById(Integer id) {
        return additionalRepository.findById(id);
    }

    public List<Additional> getAdditionalsByProduct(Integer productId) {
        return additionalRepository.findByProductId(productId);
    }

    public List<Additional> getAvailableAdditionals() {
        return additionalRepository.findByIsAvailable(true);
    }

    @Transactional
    public Additional createAdditional(Additional additional) {
        return additionalRepository.save(additional);
    }

    @Transactional
    public Additional updateAdditional(Integer id, Additional additionalDetails) {
        Optional<Additional> additionalOpt = additionalRepository.findById(id);
        if (additionalOpt.isPresent()) {
            Additional additional = additionalOpt.get();

            additional.setName(additionalDetails.getName());
            additional.setDescription(additionalDetails.getDescription());
            additional.setPrice(additionalDetails.getPrice());
            additional.setIsAvailable(additionalDetails.getIsAvailable());

            return additionalRepository.save(additional);
        }
        throw new IllegalArgumentException("Additional not found with ID: " + id);
    }

    @Transactional
    public void deleteAdditional(Integer id) {
        additionalRepository.deleteById(id);
    }
}