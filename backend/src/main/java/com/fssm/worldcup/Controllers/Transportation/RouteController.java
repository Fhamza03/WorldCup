package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.Route;
import com.fssm.worldcup.Services.Transportation.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/route")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping("/createRoute")
    @ResponseStatus(HttpStatus.CREATED)
    public Route createRoute(@RequestBody Route route) {
        return routeService.saveRoute(route);
    }

    @GetMapping("/getRoute/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Route getRoute(@PathVariable Integer id) {
        return routeService.findRouteById(id);
    }

    @GetMapping("/getAllRoutes")
    @ResponseStatus(HttpStatus.OK)
    public List<Route> getAllRoutes() {
        return routeService.findAllRoutes();
    }

    @DeleteMapping("/deleteRoute/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoute(@PathVariable Integer id) {
        routeService.deleteRouteById(id);
    }

    @GetMapping("/routeExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean routeExists(@PathVariable Integer id) {
        return routeService.existsById(id);
    }
}
