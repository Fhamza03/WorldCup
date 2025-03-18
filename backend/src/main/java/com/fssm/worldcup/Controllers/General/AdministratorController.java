package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Administrator;
import com.fssm.worldcup.Services.General.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {

    @Autowired
    private AdministratorService administratorService;

    @PostMapping("/createAdministrator")
    @ResponseStatus(HttpStatus.CREATED)
    public Administrator createAdministrator(@RequestBody Administrator administrator) {
        return administratorService.saveAdministrator(administrator);
    }

    @GetMapping("/getAdministrator/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Administrator getAdministrator(@PathVariable Integer id) {
        return administratorService.findAdministratorById(id);
    }

    @GetMapping("/getAllAdministrators")
    @ResponseStatus(HttpStatus.OK)
    public List<Administrator> getAllAdministrators() {
        return administratorService.findAllAdministrators();
    }

    @DeleteMapping("/deleteAdministrator/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAdministrator(@PathVariable Integer id) {
        administratorService.deleteAdministratorById(id);
    }

    @GetMapping("/administratorExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean administratorExists(@PathVariable Integer id) {
        return administratorService.existsById(id);
    }
}
