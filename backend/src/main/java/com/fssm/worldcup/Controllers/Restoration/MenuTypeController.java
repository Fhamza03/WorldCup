package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.Models.Restoration.MenuType;
import com.fssm.worldcup.Services.Restoration.MenuTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-types")
public class MenuTypeController {

    @Autowired
    private MenuTypeService menuTypeService;

    @GetMapping
    public ResponseEntity<List<MenuType>> getAllMenuTypes() {
        return ResponseEntity.ok(menuTypeService.getAllMenuTypes());
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<MenuType>> getAllMenuTypesSorted() {
        return ResponseEntity.ok(menuTypeService.getAllMenuTypesSorted());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuType> getMenuTypeById(@PathVariable Integer id) {
        return menuTypeService.getMenuTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MenuType> createMenuType(@RequestBody MenuType menuType) {
        MenuType createdMenuType = menuTypeService.createMenuType(menuType);
        return new ResponseEntity<>(createdMenuType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuType> updateMenuType(@PathVariable Integer id,
                                                   @RequestBody MenuType menuType) {
        try {
            MenuType updatedMenuType = menuTypeService.updateMenuType(id, menuType);
            return ResponseEntity.ok(updatedMenuType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuType(@PathVariable Integer id) {
        menuTypeService.deleteMenuType(id);
        return ResponseEntity.noContent().build();
    }
}