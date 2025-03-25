package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.Restoration.MenuType;
import com.fssm.worldcup.Repositories.Restoration.MenuTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MenuTypeService {

    @Autowired
    private MenuTypeRepository menuTypeRepository;

    public List<MenuType> getAllMenuTypes() {
        return menuTypeRepository.findAll();
    }

    public List<MenuType> getAllMenuTypesSorted() {
        return menuTypeRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Optional<MenuType> getMenuTypeById(Integer id) {
        return menuTypeRepository.findById(id);
    }

    @Transactional
    public MenuType createMenuType(MenuType menuType) {
        return menuTypeRepository.save(menuType);
    }

    @Transactional
    public MenuType updateMenuType(Integer id, MenuType menuTypeDetails) {
        Optional<MenuType> menuTypeOpt = menuTypeRepository.findById(id);
        if (menuTypeOpt.isPresent()) {
            MenuType menuType = menuTypeOpt.get();

            menuType.setName(menuTypeDetails.getName());
            menuType.setDescription(menuTypeDetails.getDescription());
            menuType.setDisplayOrder(menuTypeDetails.getDisplayOrder());

            return menuTypeRepository.save(menuType);
        }
        throw new IllegalArgumentException("MenuType not found with ID: " + id);
    }

    @Transactional
    public void deleteMenuType(Integer id) {
        menuTypeRepository.deleteById(id);
    }
}