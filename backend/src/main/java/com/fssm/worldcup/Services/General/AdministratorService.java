package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.Models.General.Administrator;
import com.fssm.worldcup.Repositories.General.AdministratorRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    public Administrator saveAdministrator(Administrator administrator) {
        return administratorRepository.save(administrator);
    }

    public Administrator findAdministratorById(Integer id) {
        return administratorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administrator not found with id " + id));
    }

    public List<Administrator> findAllAdministrators() {
        return administratorRepository.findAll();
    }

    public void deleteAdministratorById(Integer id) {
        if (!administratorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Administrator not found with id " + id);
        }
        administratorRepository.deleteById(id);
    }

    public Administrator updateAdministrator(Administrator administrator) {
        if(!administratorRepository.existsById(administrator.getUserId())){
            throw new ResourceNotFoundException("Administrator not found with id " + administrator.getUserId());
        }
        return administratorRepository.save(administrator);
    }

    public boolean existsById(Integer id) {
        return administratorRepository.existsById(id);
    }
}
