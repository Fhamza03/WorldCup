package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.ServiceType;
import com.fssm.worldcup.Services.General.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/serviceType")
public class ServiceTypeController {

    @Autowired
    private ServiceTypeService serviceTypeService;

    @PostMapping("/createServiceType")
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceType createServiceType(@RequestBody ServiceType serviceType) {
        return serviceTypeService.saveServiceType(serviceType);
    }

    @GetMapping("/getServiceType/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ServiceType getServiceType(@PathVariable Integer id) {
        return serviceTypeService.findServiceTypeById(id);
    }

    @GetMapping("/getAllServiceTypes")
    @ResponseStatus(HttpStatus.OK)
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeService.findAllServiceTypes();
    }

    @DeleteMapping("/deleteServiceType/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteServiceType(@PathVariable Integer id) {
        serviceTypeService.deleteServiceTypeById(id);
    }

    @PutMapping("/updateServiceType")
    @ResponseStatus(HttpStatus.OK)
    public ServiceType updateServiceType(@RequestBody ServiceType serviceType) {
        return serviceTypeService.updateServiceType(serviceType);
    }

    @GetMapping("/serviceTypeExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean serviceTypeExists(@PathVariable Integer id) {
        return serviceTypeService.existsById(id);
    }
}
