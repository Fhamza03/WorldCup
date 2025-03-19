package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.Vehicle;
import com.fssm.worldcup.Services.Transportation.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/createVehicle")
    @ResponseStatus(HttpStatus.CREATED)
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @GetMapping("/getVehicle/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vehicle getVehicle(@PathVariable Integer id) {
        return vehicleService.findVehicleById(id);
    }

    @GetMapping("/getAllVehicles")
    @ResponseStatus(HttpStatus.OK)
    public List<Vehicle> getAllVehicles() {
        return vehicleService.findAllVehicles();
    }

    @DeleteMapping("/deleteVehicle/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVehicle(@PathVariable Integer id) {
        vehicleService.deleteVehicleById(id);
    }

    @GetMapping("/vehicleExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean vehicleExists(@PathVariable Integer id) {
        return vehicleService.existsById(id);
    }
}
