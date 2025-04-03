package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.Models.Restoration.Additional;
import com.fssm.worldcup.Services.Restoration.AdditionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/additionals")
public class AdditionalController {

    @Autowired
    private AdditionalService additionalService;

    @GetMapping
    public ResponseEntity<List<Additional>> getAllAdditionals() {
        return ResponseEntity.ok(additionalService.getAllAdditionals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Additional> getAdditionalById(@PathVariable Integer id) {
        return additionalService.getAdditionalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Additional>> getAdditionalsByProduct(@PathVariable Integer productId) {
        return ResponseEntity.ok(additionalService.getAdditionalsByProduct(productId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Additional>> getAvailableAdditionals() {
        return ResponseEntity.ok(additionalService.getAvailableAdditionals());
    }

    @PostMapping
    public ResponseEntity<Additional> createAdditional(@RequestBody Additional additional) {
        Additional createdAdditional = additionalService.createAdditional(additional);
        return new ResponseEntity<>(createdAdditional, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Additional> updateAdditional(@PathVariable Integer id,
                                                       @RequestBody Additional additional) {
        try {
            Additional updatedAdditional = additionalService.updateAdditional(id, additional);
            return ResponseEntity.ok(updatedAdditional);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdditional(@PathVariable Integer id) {
        additionalService.deleteAdditional(id);
        return ResponseEntity.noContent().build();
    }
}