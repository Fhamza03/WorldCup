package com.fssm.worldcup.Services.Transportation;

import com.fssm.worldcup.Models.Transportation.Route;
import com.fssm.worldcup.Repositories.Transportation.RouteRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public Route saveRoute(Route route) {
        try {
            return routeRepository.save(route);
        } catch (Exception e) {
            throw new RuntimeException("Error saving route: " + e.getMessage());
        }
    }

    public Route findRouteById(Integer id) {
        Optional<Route> route = routeRepository.findById(id);
        if (route.isEmpty()) {
            throw new ResourceNotFoundException("Route not found with id: " + id);
        }
        return route.get();
    }

    public List<Route> findAllRoutes() {
        return routeRepository.findAll();
    }

    public void deleteRouteById(Integer id) {
        if (!routeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Route not found with id: " + id);
        }
        routeRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return routeRepository.existsById(id);
    }
}
