package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Repositories.General.SupporterRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupporterService {

    @Autowired
    private SupporterRepository supporterRepository;

    public Supporter saveSupporter(Supporter supporter) {
        return supporterRepository.save(supporter);
    }

    public Supporter findSupporterById(Integer id) {
        return supporterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supporter not found with id " + id));
    }

    public List<Supporter> findAllSupporters() {
        return supporterRepository.findAll();
    }

    public void deleteSupporterById(Integer id) {
        if (!supporterRepository.existsById(id)) {
            throw new ResourceNotFoundException("Supporter not found with id " + id);
        }
        supporterRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return supporterRepository.existsById(id);
    }
}
