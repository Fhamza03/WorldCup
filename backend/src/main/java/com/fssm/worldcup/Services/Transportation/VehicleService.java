package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.Vehicle;
import com.fssm.worldcup.Repositories.Transportation.VehicleRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle saveVehicle(Vehicle vehicle) {
        try {
            return vehicleRepository.save(vehicle);
        } catch (Exception e) {
            throw new RuntimeException("Error saving vehicle: " + e.getMessage());
        }
    }

    public Vehicle findVehicleById(Integer id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        if (vehicle.isEmpty()) {
            throw new ResourceNotFoundException("Vehicle not found with id: " + id);
        }
        return vehicle.get();
    }

    public List<Vehicle> findAllVehicles() {
        return vehicleRepository.findAll();
    }

    public void deleteVehicleById(Integer id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }

    public Vehicle updateVehicle(Vehicle vehicle) {
        if (!vehicleRepository.existsById(vehicle.getVehicleId())) {
            throw new ResourceNotFoundException("Vehicle not found with id " + vehicle.getVehicleId());
        }
        return vehicleRepository.save(vehicle);
    }

    public boolean existsById(Integer id) {
        return vehicleRepository.existsById(id);
    }
}
