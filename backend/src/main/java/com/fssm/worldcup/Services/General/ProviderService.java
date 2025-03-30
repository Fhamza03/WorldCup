package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Repositories.General.ProviderRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

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

    public Provider updateProvider(Provider provider) {
        if(!providerRepository.existsById(provider.getUserId())){
            throw new ResourceNotFoundException("Provider not found with id " + provider.getUserId());
        }
        return providerRepository.save(provider);
    }

    public boolean existsById(Integer id) {
        return providerRepository.existsById(id);
    }
}
