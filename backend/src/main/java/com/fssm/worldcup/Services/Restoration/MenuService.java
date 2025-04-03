package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.Restoration.Menu;
import com.fssm.worldcup.Models.Restoration.MenuType;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Repositories.Restoration.MenuRepository;
import com.fssm.worldcup.Repositories.Restoration.MenuTypeRepository;
import com.fssm.worldcup.Repositories.Restoration.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuTypeRepository menuTypeRepository;

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Optional<Menu> getMenuById(Integer id) {
        return menuRepository.findById(id);
    }

    public List<Menu> getMenusByRestaurant(Integer restaurantId) {
        return menuRepository.findByRestaurantId(restaurantId);
    }

    public List<Menu> getSpecialOffersByRestaurant(Integer restaurantId) {
        return menuRepository.findByRestaurantIdAndIsSpecialOffer(restaurantId, true);
    }

    public List<Menu> getFanIdMenusByRestaurant(Integer restaurantId) {
        return menuRepository.findByRestaurantIdAndRequiresFanId(restaurantId, true);
    }

    @Transactional
    public Menu createMenu(Menu menu, Integer restaurantId, Integer menuTypeId) {
        Optional<Restaurant> restaurantOpt = restaurantRepository.findById(restaurantId);
        Optional<MenuType> menuTypeOpt = menuTypeRepository.findById(menuTypeId);

        if (restaurantOpt.isPresent() && menuTypeOpt.isPresent()) {
            menu.setRestaurant(restaurantOpt.get());
            menu.setMenuType(menuTypeOpt.get());
            return menuRepository.save(menu);
        }
        throw new IllegalArgumentException("Restaurant or MenuType not found");
    }

    @Transactional
    public Menu updateMenu(Integer id, Menu menuDetails) {
        Optional<Menu> menuOpt = menuRepository.findById(id);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();

            menu.setName(menuDetails.getName());
            menu.setDescription(menuDetails.getDescription());
            menu.setIsSpecialOffer(menuDetails.getIsSpecialOffer());
            menu.setRequiresFanId(menuDetails.getRequiresFanId());
            menu.setOriginalPrice(menuDetails.getOriginalPrice());
            menu.setDiscountedPrice(menuDetails.getDiscountedPrice());
            menu.setPromotionDetails(menuDetails.getPromotionDetails());

            return menuRepository.save(menu);
        }
        throw new IllegalArgumentException("Menu not found with ID: " + id);
    }

    @Transactional
    public Menu createSpecialOffer(Integer menuId, Double originalPrice, Double discountedPrice,
                                   String promotionDetails, Boolean requiresFanId) {
        Optional<Menu> menuOpt = menuRepository.findById(menuId);
        if (menuOpt.isPresent()) {
            Menu menu = menuOpt.get();

            menu.setIsSpecialOffer(true);
            menu.setOriginalPrice(originalPrice);
            menu.setDiscountedPrice(discountedPrice);
            menu.setPromotionDetails(promotionDetails);
            menu.setRequiresFanId(requiresFanId);

            return menuRepository.save(menu);
        }
        throw new IllegalArgumentException("Menu not found with ID: " + menuId);
    }

    @Transactional
    public void deleteMenu(Integer id) {
        menuRepository.deleteById(id);
    }
}