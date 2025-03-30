package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.Models.General.ServiceType;
import com.fssm.worldcup.Repositories.General.ServiceTypeRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTypeService {

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public ServiceType saveServiceType(ServiceType serviceType) {
        return serviceTypeRepository.save(serviceType);
    }

    public ServiceType findServiceTypeById(Integer id) {
        return serviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with id " + id));
    }

    public List<ServiceType> findAllServiceTypes() {
        return serviceTypeRepository.findAll();
    }

    public void deleteServiceTypeById(Integer id) {
        if (!serviceTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("ServiceType not found with id " + id);
        }
        serviceTypeRepository.deleteById(id);
    }

    public ServiceType updateServiceType(ServiceType serviceType) {
        if (!serviceTypeRepository.existsById(serviceType.getServiceTypeId())) {
            throw new ResourceNotFoundException("ServiceType not found with id " + serviceType.getServiceTypeId());
        }
        return serviceTypeRepository.save(serviceType);
    }

    public boolean existsById(Integer id) {
        return serviceTypeRepository.existsById(id);
    }
}
