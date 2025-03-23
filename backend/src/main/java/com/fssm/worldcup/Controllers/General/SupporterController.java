package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.DTOs.SupporterDTO;
import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Services.General.SupporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supporter")
@CrossOrigin(origins = "http://localhost:3000") // Assuming your frontend runs on port 3000

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
    public SupporterDTO getSupporter(@PathVariable Integer id) {
        Supporter supporter = supporterService.findSupporterById(id);
        return SupporterDTO.fromEntity(supporter);
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
    @PutMapping("/updateSupporter/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Supporter updateSupporter(@PathVariable Integer id, @RequestBody Supporter updatedSupporter) {
        Supporter existingSupporter = supporterService.findSupporterById(id);

        // Update fields
        existingSupporter.setFirstName(updatedSupporter.getFirstName());
        existingSupporter.setLastName(updatedSupporter.getLastName());
        existingSupporter.setEmail(updatedSupporter.getEmail());
        existingSupporter.setBirthDate(updatedSupporter.getBirthDate());
        existingSupporter.setNationality(updatedSupporter.getNationality());
        existingSupporter.setNationalCode(updatedSupporter.getNationalCode());

        // Handle profile picture if needed
        if (updatedSupporter.getProfilePicture() != null) {
            existingSupporter.setProfilePicture(updatedSupporter.getProfilePicture());
        }

        return supporterService.saveSupporter(existingSupporter);
    }
}