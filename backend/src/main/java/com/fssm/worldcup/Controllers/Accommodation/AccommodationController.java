package com.fssm.worldcup.Controllers.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Accommodation;
import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Services.Accommodation.AccommodationService;
import com.fssm.worldcup.Services.General.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccommodationController {
    @Autowired
    AccommodationService accommodationService;
    @Autowired
    ProviderService providerService;

    @PostMapping("/saveAccommodation")
    @ResponseStatus(HttpStatus.CREATED)
    public Accommodation saveAccommodation(@RequestBody Accommodation accommodation) {
        return accommodationService.saveAccommodation(accommodation);
    }

    @GetMapping("/getAccommodation/{accommodationId}")
    @ResponseStatus(HttpStatus.OK)
    public Accommodation getAccommodation(@PathVariable Integer accommodationId) {
        return accommodationService.findAccommodationById(accommodationId);
    }

    @DeleteMapping("/deleteAccommodation/{accommodationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAccommodation(@PathVariable Integer accommodationId) {
        accommodationService.deleteAccommodation(accommodationId);
    }

    @GetMapping("/getAccommodations")
    @ResponseStatus(HttpStatus.OK)
    public List<Accommodation> getAllAccommodations() {
        return accommodationService.findAllAccommodation();
    }

    @PutMapping("/updateAccommodation")
    @ResponseStatus(HttpStatus.OK)
    public Accommodation updateAccommodation(@RequestBody Accommodation accommodationDetails) {
        return accommodationService.updateAccommodation(accommodationDetails);
    }

    @GetMapping("/getAccommodationByProvider/{providerId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Accommodation> getAccommodationByProvider(@PathVariable Integer providerId) {
        Provider provider = providerService.findProviderById(providerId);
        return accommodationService.findAccommodationByProvider(provider);
    }


}
