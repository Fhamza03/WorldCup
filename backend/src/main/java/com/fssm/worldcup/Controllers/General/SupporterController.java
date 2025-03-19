package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Services.General.SupporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supporter")
public class SupporterController {

    @Autowired
    private SupporterService supporterService;

    @PostMapping("/createSupporter")
    public Supporter createSupporter(@RequestBody Supporter supporter) {
        return supporterService.saveSupporter(supporter);
    }

    @GetMapping("/getSupporter/{id}")
    public Supporter getSupporter(@PathVariable Integer id) {
        return supporterService.findSupporterById(id);
    }

    @GetMapping("/getAllSupporters")
    public List<Supporter> getAllSupporters() {
        return supporterService.findAllSupporters();
    }

    @DeleteMapping("/deleteSupporter/{id}")
    public void deleteSupporter(@PathVariable Integer id) {
        supporterService.deleteSupporterById(id);
    }

    @GetMapping("/supporterExists/{id}")
    public boolean supporterExists(@PathVariable Integer id) {
        return supporterService.existsById(id);
    }
}
