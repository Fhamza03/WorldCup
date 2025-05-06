package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.VehicleRoute;
import com.fssm.worldcup.Services.Transportation.VehicleRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicleRoute")
public class VehicleRouteController {

    @Autowired
    private VehicleRouteService vehicleRouteService;

    @PostMapping("/createVehicleRoute")
    @ResponseStatus(HttpStatus.CREATED)
    public VehicleRoute createVehicleRoute(@RequestBody VehicleRoute vehicleRoute) {
        return vehicleRouteService.saveVehicleRoute(vehicleRoute);
    }

    @GetMapping("/getVehicleRoute/{id}")
    @ResponseStatus(HttpStatus.OK)
    public VehicleRoute getVehicleRoute(@PathVariable Integer id) {
        return vehicleRouteService.findVehicleRouteById(id);
    }

    @GetMapping("/getAllVehicleRoutes")
    @ResponseStatus(HttpStatus.OK)
    public List<VehicleRoute> getAllVehicleRoutes() {
        return vehicleRouteService.findAllVehicleRoutes();
    }

    @DeleteMapping("/deleteVehicleRoute/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVehicleRoute(@PathVariable Integer id) {
        vehicleRouteService.deleteVehicleRouteById(id);
    }

    @PutMapping("/updateVehicleRoute")
    @ResponseStatus(HttpStatus.OK)
    public VehicleRoute updateVehicleRoute(@RequestBody VehicleRoute vehicleRoute) {
        return vehicleRouteService.updateVehicleRoute(vehicleRoute);
    }

    @GetMapping("/vehicleRouteExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean vehicleRouteExists(@PathVariable Integer id) {
        return vehicleRouteService.existsById(id);
    }

    @GetMapping("/findByStrateAndEndDPoint/{startPoint}/{endPoint}")
    @ResponseStatus(HttpStatus.OK)
    public VehicleRoute findVehiculeRouteByStrateAndEndDPoint(@PathVariable String startPoint,@PathVariable String endPoint) {
        return vehicleRouteService.getVehiculeRouteByStrateAndEndDPoint(startPoint, endPoint);
    }
}
