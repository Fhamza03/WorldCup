package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.ServiceType;
import com.fssm.worldcup.Services.General.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/serviceType")
public class ServiceTypeController {

    @Autowired
    private ServiceTypeService serviceTypeService;

    @PostMapping("/createServiceType")
    public ServiceType createServiceType(@RequestBody ServiceType serviceType) {
        return serviceTypeService.saveServiceType(serviceType);
    }

    @GetMapping("/getServiceType/{id}")
    public ServiceType getServiceType(@PathVariable Integer id) {
        return serviceTypeService.findServiceTypeById(id);
    }

    @GetMapping("/getAllServiceTypes")
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeService.findAllServiceTypes();
    }

    @DeleteMapping("/deleteServiceType/{id}")
    public void deleteServiceType(@PathVariable Integer id) {
        serviceTypeService.deleteServiceTypeById(id);
    }

    @GetMapping("/serviceTypeExists/{id}")
    public boolean serviceTypeExists(@PathVariable Integer id) {
        return serviceTypeService.existsById(id);
    }
}
