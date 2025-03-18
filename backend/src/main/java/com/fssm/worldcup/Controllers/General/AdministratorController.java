package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Administrator;
import com.fssm.worldcup.Services.General.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/createAdministrator")
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        return administratorService.saveAdministrator(administrator);
    }

    @GetMapping("/getAdministrator/{id}")
    public Administrator getAdministrator(@PathVariable Integer id) {
        return administratorService.findAdministratorById(id);
    }

    @GetMapping("/getAllAdministrators")
    public List<Administrator> getAllAdministrators() {
        return administratorService.findAllAdministrators();
    }

    @DeleteMapping("/deleteAdministrator/{id}")
    public void deleteAdministrator(@PathVariable Integer id) {
        administratorService.deleteAdministratorById(id);
    }

    @GetMapping("/administratorExists/{id}")
    public boolean administratorExists(@PathVariable Integer id) {
        return administratorService.existsById(id);
    }
}
