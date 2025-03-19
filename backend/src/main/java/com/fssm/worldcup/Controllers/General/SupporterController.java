package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Services.General.SupporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supporter")
public class SupporterController {

    @Autowired
    private SupporterService supporterService;

    @PostMapping("/createSupporter")
    @ResponseStatus(HttpStatus.CREATED)
    public Supporter createSupporter(@RequestBody Supporter supporter) {
        return supporterService.saveSupporter(supporter);
    }

    @GetMapping("/getSupporter/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Supporter getSupporter(@PathVariable Integer id) {
        return supporterService.findSupporterById(id);
    }

    @GetMapping("/getAllSupporters")
    @ResponseStatus(HttpStatus.OK)
    public List<Supporter> getAllSupporters() {
        return supporterService.findAllSupporters();
    }

    @DeleteMapping("/deleteSupporter/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSupporter(@PathVariable Integer id) {
        supporterService.deleteSupporterById(id);
    }

    @GetMapping("/supporterExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean supporterExists(@PathVariable Integer id) {
        return supporterService.existsById(id);
    }
}
