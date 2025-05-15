package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.Restoration.MenuType;
import com.fssm.worldcup.Services.Restoration.MenuTypeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MenuTypeController.class)
public class MenuTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MenuTypeService menuTypeService;

    @Autowired
    private ObjectMapper objectMapper;

    private MenuType menuType1;
    private MenuType menuType2;
    private List<MenuType> menuTypeList;
    private List<MenuType> sortedMenuTypeList;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(menuTypeService);

        // Créer des types de menu pour les tests
        menuType1 = new MenuType();
        menuType1.setId(1);
        menuType1.setName("Lunch");
        menuType1.setDescription("Lunch menus");
        menuType1.setDisplayOrder(2);

        menuType2 = new MenuType();
        menuType2.setId(2);
        menuType2.setName("Breakfast");
        menuType2.setDescription("Breakfast menus");
        menuType2.setDisplayOrder(1);

        menuTypeList = Arrays.asList(menuType1, menuType2);
        sortedMenuTypeList = Arrays.asList(menuType2, menuType1); // Sorted by display order
    }

    @Test
    void getAllMenuTypes_ShouldReturnAllMenuTypes() throws Exception {
        when(menuTypeService.getAllMenuTypes()).thenReturn(menuTypeList);

        mockMvc.perform(get("/api/menu-types"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Lunch")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Breakfast")));

        verify(menuTypeService, times(1)).getAllMenuTypes();
    }

    @Test
    void getAllMenuTypesSorted_ShouldReturnSortedMenuTypes() throws Exception {
        when(menuTypeService.getAllMenuTypesSorted()).thenReturn(sortedMenuTypeList);

        mockMvc.perform(get("/api/menu-types/sorted"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(2)))
                .andExpect(jsonPath("$[0].name", is("Breakfast")))
                .andExpect(jsonPath("$[0].displayOrder", is(1)))
                .andExpect(jsonPath("$[1].id", is(1)))
                .andExpect(jsonPath("$[1].name", is("Lunch")))
                .andExpect(jsonPath("$[1].displayOrder", is(2)));

        verify(menuTypeService, times(1)).getAllMenuTypesSorted();
    }

    @Test
    void getMenuTypeById_WithExistingId_ShouldReturnMenuType() throws Exception {
        when(menuTypeService.getMenuTypeById(1)).thenReturn(Optional.of(menuType1));

        mockMvc.perform(get("/api/menu-types/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Lunch")))
                .andExpect(jsonPath("$.description", is("Lunch menus")))
                .andExpect(jsonPath("$.displayOrder", is(2)));

        verify(menuTypeService, times(1)).getMenuTypeById(1);
    }

    @Test
    void getMenuTypeById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(menuTypeService.getMenuTypeById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/menu-types/99"))
                .andExpect(status().isNotFound());

        verify(menuTypeService, times(1)).getMenuTypeById(99);
    }

    @Test
    void createMenuType_ShouldCreateAndReturnMenuType() throws Exception {
        MenuType newMenuType = new MenuType();
        newMenuType.setName("Dinner");
        newMenuType.setDescription("Dinner menus");
        newMenuType.setDisplayOrder(3);

        MenuType savedMenuType = new MenuType();
        savedMenuType.setId(3);
        savedMenuType.setName("Dinner");
        savedMenuType.setDescription("Dinner menus");
        savedMenuType.setDisplayOrder(3);

        when(menuTypeService.createMenuType(any(MenuType.class))).thenReturn(savedMenuType);

        mockMvc.perform(post("/api/menu-types")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newMenuType)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("Dinner")))
                .andExpect(jsonPath("$.description", is("Dinner menus")))
                .andExpect(jsonPath("$.displayOrder", is(3)));

        verify(menuTypeService, times(1)).createMenuType(any(MenuType.class));
    }

    @Test
    void updateMenuType_WithExistingId_ShouldUpdateAndReturnMenuType() throws Exception {
        MenuType updatedDetails = new MenuType();
        updatedDetails.setName("Updated Lunch");
        updatedDetails.setDescription("Updated lunch menus");
        updatedDetails.setDisplayOrder(4);

        MenuType updatedMenuType = new MenuType();
        updatedMenuType.setId(1);
        updatedMenuType.setName("Updated Lunch");
        updatedMenuType.setDescription("Updated lunch menus");
        updatedMenuType.setDisplayOrder(4);

        when(menuTypeService.updateMenuType(eq(1), any(MenuType.class))).thenReturn(updatedMenuType);

        mockMvc.perform(put("/api/menu-types/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Lunch")))
                .andExpect(jsonPath("$.description", is("Updated lunch menus")))
                .andExpect(jsonPath("$.displayOrder", is(4)));

        verify(menuTypeService, times(1)).updateMenuType(eq(1), any(MenuType.class));
    }

    @Test
    void updateMenuType_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        MenuType updatedDetails = new MenuType();
        updatedDetails.setName("Updated Type");
        updatedDetails.setDescription("Updated description");
        updatedDetails.setDisplayOrder(5);

        when(menuTypeService.updateMenuType(eq(99), any(MenuType.class)))
                .thenThrow(new IllegalArgumentException("MenuType not found with ID: 99"));

        mockMvc.perform(put("/api/menu-types/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());

        verify(menuTypeService, times(1)).updateMenuType(eq(99), any(MenuType.class));
    }

    @Test
    void deleteMenuType_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(menuTypeService).deleteMenuType(1);

        mockMvc.perform(delete("/api/menu-types/1"))
                .andExpect(status().isNoContent());

        verify(menuTypeService, times(1)).deleteMenuType(1);
    }
}