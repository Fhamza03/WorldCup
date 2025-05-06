package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.VehicleRoute;
import com.fssm.worldcup.Repositories.Transportation.VehicleRouteRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleRouteService {

    @Autowired
    private VehicleRouteRepository vehicleRouteRepository;

    public VehicleRoute saveVehicleRoute(VehicleRoute vehicleRoute) {
        try {
            return vehicleRouteRepository.save(vehicleRoute);
        } catch (Exception e) {
            throw new RuntimeException("Error saving vehicle route: " + e.getMessage());
        }
    }

    public VehicleRoute findVehicleRouteById(Integer id) {
        Optional<VehicleRoute> vehicleRoute = vehicleRouteRepository.findById(id);
        if (vehicleRoute.isEmpty()) {
            throw new ResourceNotFoundException("Vehicle route not found with id: " + id);
        }
        return vehicleRoute.get();
    }

    public List<VehicleRoute> findAllVehicleRoutes() {
        return vehicleRouteRepository.findAll();
    }

    public void deleteVehicleRouteById(Integer id) {
        if (!vehicleRouteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle route not found with id: " + id);
        }
        vehicleRouteRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return vehicleRouteRepository.existsById(id);
    }

    public VehicleRoute getVehiculeRouteByStrateAndEndDPoint(String startPoint, String endPoint) {
        try {
            return vehicleRouteRepository.findVehicleRouteByStartPointAndEndPoint(startPoint, endPoint);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Cannot find a route with that start and end point");
        }
    }
}
