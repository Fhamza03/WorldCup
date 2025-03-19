package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.Transportation;
import com.fssm.worldcup.Services.Transportation.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transportation")
public class TransportationController {

    @Autowired
    private TransportationService transportationService;

    @PostMapping("/createTransportation")
    @ResponseStatus(HttpStatus.CREATED)
    public Transportation createTransportation(@RequestBody Transportation transportation) {
        return transportationService.saveTransportation(transportation);
    }

    @GetMapping("/getTransportation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Transportation getTransportation(@PathVariable Integer id) {
        return transportationService.findTransportationById(id);
    }

    @GetMapping("/getAllTransportations")
    @ResponseStatus(HttpStatus.OK)
    public List<Transportation> getAllTransportations() {
        return transportationService.findAllTransportations();
    }

    @DeleteMapping("/deleteTransportation/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransportation(@PathVariable Integer id) {
        transportationService.deleteTransportationById(id);
    }

    @GetMapping("/transportationExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean transportationExists(@PathVariable Integer id) {
        return transportationService.existsById(id);
    }
}
