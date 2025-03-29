package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.DTOs.ProviderDTO;
import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Models.General.ServiceType;
import com.fssm.worldcup.Repositories.General.ProviderRepository;
import com.fssm.worldcup.Repositories.General.ServiceTypeRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository; // You'll need to create this if it doesn't exist

    public Provider saveProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    public Provider findProviderById(Integer id) {
        return providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found with id " + id));
    }

    public List<Provider> findAllProviders() {
        return providerRepository.findAll();
    }

    public void deleteProviderById(Integer id) {
        if (!providerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Provider not found with id " + id);
        }
        providerRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return providerRepository.existsById(id);
    }

    public Provider updateProvider(Integer id, ProviderDTO providerDTO) {
        Provider existingProvider = providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found with id " + id));

        // Update basic properties
        existingProvider.setEmail(providerDTO.getEmail());
        existingProvider.setFirstName(providerDTO.getFirstName());
        existingProvider.setLastName(providerDTO.getLastName());
        existingProvider.setBirthDate(providerDTO.getBirthDate());
        existingProvider.setNationality(providerDTO.getNationality());
        existingProvider.setNationalCode(providerDTO.getNationalCode());

        // Update profile picture if provided
        if (providerDTO.getProfilePicture() != null) {
            existingProvider.setProfilePicture(providerDTO.getProfilePicture());
        }

        // Update service types if provided
        if (providerDTO.getServiceTypeIds() != null && !providerDTO.getServiceTypeIds().isEmpty()) {
            List<ServiceType> serviceTypes = providerDTO.getServiceTypeIds().stream()
                    .map(typeId -> serviceTypeRepository.findById(typeId)
                            .orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with id " + typeId)))
                    .collect(Collectors.toList());
            existingProvider.setServiceTypes(serviceTypes);
        }

        return providerRepository.save(existingProvider);
    }
}