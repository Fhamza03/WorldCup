package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.Models.Restoration.Menu;
import com.fssm.worldcup.Services.Restoration.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        return ResponseEntity.ok(menuService.getAllMenus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Integer id) {
        return menuService.getMenuById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Menu>> getMenusByRestaurant(@PathVariable Integer restaurantId) {
        return ResponseEntity.ok(menuService.getMenusByRestaurant(restaurantId));
    }

    @GetMapping("/restaurant/{restaurantId}/special-offers")
    public ResponseEntity<List<Menu>> getSpecialOffersByRestaurant(@PathVariable Integer restaurantId) {
        return ResponseEntity.ok(menuService.getSpecialOffersByRestaurant(restaurantId));
    }

    @GetMapping("/restaurant/{restaurantId}/fan-id")
    public ResponseEntity<List<Menu>> getFanIdMenusByRestaurant(@PathVariable Integer restaurantId) {
        return ResponseEntity.ok(menuService.getFanIdMenusByRestaurant(restaurantId));
    }

    @PostMapping("/restaurant/{restaurantId}/type/{menuTypeId}")
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu,
                                           @PathVariable Integer restaurantId,
                                           @PathVariable Integer menuTypeId) {
        try {
            Menu createdMenu = menuService.createMenu(menu, restaurantId, menuTypeId);
            return new ResponseEntity<>(createdMenu, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Integer id,
                                           @RequestBody Menu menu) {
        try {
            Menu updatedMenu = menuService.updateMenu(id, menu);
            return ResponseEntity.ok(updatedMenu);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/special-offer")
    public ResponseEntity<Menu> createSpecialOffer(@PathVariable Integer id,
                                                   @RequestParam Double originalPrice,
                                                   @RequestParam Double discountedPrice,
                                                   @RequestParam String promotionDetails,
                                                   @RequestParam Boolean requiresFanId) {
        try {
            Menu updatedMenu = menuService.createSpecialOffer(id, originalPrice,
                    discountedPrice, promotionDetails, requiresFanId);
            return ResponseEntity.ok(updatedMenu);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
}