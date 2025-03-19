package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Services.General.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @PostMapping("/createProvider")
    public Provider createProvider(@RequestBody Provider provider) {
        return providerService.saveProvider(provider);
    }

    @GetMapping("/getProvider/{id}")
    public Provider getProvider(@PathVariable Integer id) {
        return providerService.findProviderById(id);
    }

    @GetMapping("/getAllProviders")
    public List<Provider> getAllProviders() {
        return providerService.findAllProviders();
    }

    @DeleteMapping("/deleteProvider/{id}")
    public void deleteProvider(@PathVariable Integer id) {
        providerService.deleteProviderById(id);
    }

    @GetMapping("/providerExists/{id}")
    public boolean providerExists(@PathVariable Integer id) {
        return providerService.existsById(id);
    }
}
