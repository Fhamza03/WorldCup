package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.TransportationType;
import com.fssm.worldcup.Services.Transportation.TransportationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transportationType")
public class TransportationTypeController {

    @Autowired
    private TransportationTypeService transportationTypeService;

    @PostMapping("/createTransportationType")
    @ResponseStatus(HttpStatus.CREATED)
    public TransportationType createTransportationType(@RequestBody TransportationType transportationType) {
        return transportationTypeService.saveTransportationType(transportationType);
    }

    @GetMapping("/getTransportationType/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TransportationType getTransportationType(@PathVariable Integer id) {
        return transportationTypeService.findTransportationTypeById(id);
    }

    @GetMapping("/getAllTransportationTypes")
    @ResponseStatus(HttpStatus.OK)
    public List<TransportationType> getAllTransportationTypes() {
        return transportationTypeService.findAllTransportationTypes();
    }

    @DeleteMapping("/deleteTransportationType/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransportationType(@PathVariable Integer id) {
        transportationTypeService.deleteTransportationTypeById(id);
    }

    @PutMapping("/updateTransportationType")
    @ResponseStatus(HttpStatus.OK)
    public TransportationType updateTransportationType(@RequestBody TransportationType transportationType) {
        return transportationTypeService.updateTransportationType(transportationType);
    }

    @GetMapping("/transportationTypeExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean transportationTypeExists(@PathVariable Integer id) {
        return transportationTypeService.existsById(id);
    }
}
