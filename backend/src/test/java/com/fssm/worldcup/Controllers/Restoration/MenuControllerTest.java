package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.Restoration.Menu;
import com.fssm.worldcup.Models.Restoration.MenuType;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Services.Restoration.MenuService;
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

@WebMvcTest(MenuController.class)
public class MenuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MenuService menuService;

    @Autowired
    private ObjectMapper objectMapper;

    private Menu menu1;
    private Menu menu2;
    private Menu specialOfferMenu;
    private Menu fanIdMenu;
    private List<Menu> menuList;
    private Restaurant restaurant;
    private MenuType menuType;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(menuService);

        // Créer un restaurant et un type de menu pour les tests
        restaurant = new Restaurant();
        restaurant.setId(1);
        restaurant.setName("Test Restaurant");

        menuType = new MenuType();
        menuType.setId(1);
        menuType.setName("Breakfast");

        // Créer des menus pour les tests
        menu1 = new Menu();
        menu1.setId(1);
        menu1.setName("Classic Menu");
        menu1.setDescription("A classic menu for breakfast");
        menu1.setOriginalPrice(15.0);
        menu1.setIsSpecialOffer(false);
        menu1.setRequiresFanId(false);
        menu1.setRestaurant(restaurant);
        menu1.setMenuType(menuType);

        menu2 = new Menu();
        menu2.setId(2);
        menu2.setName("Lunch Menu");
        menu2.setDescription("A perfect lunch");
        menu2.setOriginalPrice(20.0);
        menu2.setIsSpecialOffer(false);
        menu2.setRequiresFanId(false);
        menu2.setRestaurant(restaurant);
        menu2.setMenuType(menuType);

        specialOfferMenu = new Menu();
        specialOfferMenu.setId(3);
        specialOfferMenu.setName("Special Offer");
        specialOfferMenu.setDescription("Limited time offer");
        specialOfferMenu.setOriginalPrice(25.0);
        specialOfferMenu.setDiscountedPrice(18.0);
        specialOfferMenu.setPromotionDetails("25% off");
        specialOfferMenu.setIsSpecialOffer(true);
        specialOfferMenu.setRequiresFanId(false);
        specialOfferMenu.setRestaurant(restaurant);
        specialOfferMenu.setMenuType(menuType);

        fanIdMenu = new Menu();
        fanIdMenu.setId(4);
        fanIdMenu.setName("Fan ID Special");
        fanIdMenu.setDescription("Only for fans with ID");
        fanIdMenu.setOriginalPrice(30.0);
        fanIdMenu.setDiscountedPrice(22.0);
        fanIdMenu.setPromotionDetails("Fan ID discount");
        fanIdMenu.setIsSpecialOffer(true);
        fanIdMenu.setRequiresFanId(true);
        fanIdMenu.setRestaurant(restaurant);
        fanIdMenu.setMenuType(menuType);

        menuList = Arrays.asList(menu1, menu2, specialOfferMenu, fanIdMenu);
    }

    @Test
    void getAllMenus_ShouldReturnAllMenus() throws Exception {
        when(menuService.getAllMenus()).thenReturn(menuList);

        mockMvc.perform(get("/api/menus"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Classic Menu")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Lunch Menu")));

        verify(menuService, times(1)).getAllMenus();
    }

    @Test
    void getMenuById_WithExistingId_ShouldReturnMenu() throws Exception {
        when(menuService.getMenuById(1)).thenReturn(Optional.of(menu1));

        mockMvc.perform(get("/api/menus/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Classic Menu")))
                .andExpect(jsonPath("$.description", is("A classic menu for breakfast")))
                .andExpect(jsonPath("$.originalPrice", is(15.0)))
                .andExpect(jsonPath("$.isSpecialOffer", is(false)));

        verify(menuService, times(1)).getMenuById(1);
    }

    @Test
    void getMenuById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(menuService.getMenuById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/menus/99"))
                .andExpect(status().isNotFound());

        verify(menuService, times(1)).getMenuById(99);
    }

    @Test
    void getMenusByRestaurant_ShouldReturnRestaurantMenus() throws Exception {
        when(menuService.getMenusByRestaurant(1)).thenReturn(menuList);

        mockMvc.perform(get("/api/menus/restaurant/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Classic Menu")));

        verify(menuService, times(1)).getMenusByRestaurant(1);
    }

    @Test
    void getSpecialOffersByRestaurant_ShouldReturnSpecialOffers() throws Exception {
        when(menuService.getSpecialOffersByRestaurant(1))
                .thenReturn(Arrays.asList(specialOfferMenu, fanIdMenu));

        mockMvc.perform(get("/api/menus/restaurant/1/special-offers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(3)))
                .andExpect(jsonPath("$[0].name", is("Special Offer")))
                .andExpect(jsonPath("$[0].isSpecialOffer", is(true)))
                .andExpect(jsonPath("$[1].id", is(4)))
                .andExpect(jsonPath("$[1].name", is("Fan ID Special")));

        verify(menuService, times(1)).getSpecialOffersByRestaurant(1);
    }

    @Test
    void getFanIdMenusByRestaurant_ShouldReturnFanIdMenus() throws Exception {
        when(menuService.getFanIdMenusByRestaurant(1)).thenReturn(Arrays.asList(fanIdMenu));

        mockMvc.perform(get("/api/menus/restaurant/1/fan-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(4)))
                .andExpect(jsonPath("$[0].name", is("Fan ID Special")))
                .andExpect(jsonPath("$[0].requiresFanId", is(true)));

        verify(menuService, times(1)).getFanIdMenusByRestaurant(1);
    }

    @Test
    void createMenu_ShouldCreateAndReturnMenu() throws Exception {
        Menu newMenu = new Menu();
        newMenu.setName("New Menu");
        newMenu.setDescription("Brand new menu");
        newMenu.setOriginalPrice(18.0);
        newMenu.setIsSpecialOffer(false);
        newMenu.setRequiresFanId(false);

        Menu savedMenu = new Menu();
        savedMenu.setId(5);
        savedMenu.setName("New Menu");
        savedMenu.setDescription("Brand new menu");
        savedMenu.setOriginalPrice(18.0);
        savedMenu.setIsSpecialOffer(false);
        savedMenu.setRequiresFanId(false);
        savedMenu.setRestaurant(restaurant);
        savedMenu.setMenuType(menuType);

        when(menuService.createMenu(any(Menu.class), eq(1), eq(1))).thenReturn(savedMenu);

        mockMvc.perform(post("/api/menus/restaurant/1/type/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newMenu)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(5)))
                .andExpect(jsonPath("$.name", is("New Menu")))
                .andExpect(jsonPath("$.description", is("Brand new menu")))
                .andExpect(jsonPath("$.originalPrice", is(18.0)));

        verify(menuService, times(1)).createMenu(any(Menu.class), eq(1), eq(1));
    }

    @Test
    void createMenu_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        Menu newMenu = new Menu();
        newMenu.setName("Invalid Menu");

        when(menuService.createMenu(any(Menu.class), eq(999), eq(999)))
                .thenThrow(new IllegalArgumentException("Restaurant or MenuType not found"));

        mockMvc.perform(post("/api/menus/restaurant/999/type/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newMenu)))
                .andExpect(status().isBadRequest());

        verify(menuService, times(1)).createMenu(any(Menu.class), eq(999), eq(999));
    }

    @Test
    void updateMenu_WithExistingId_ShouldUpdateAndReturnMenu() throws Exception {
        Menu updatedDetails = new Menu();
        updatedDetails.setName("Updated Menu");
        updatedDetails.setDescription("Updated description");
        updatedDetails.setOriginalPrice(22.0);
        updatedDetails.setIsSpecialOffer(false);
        updatedDetails.setRequiresFanId(false);

        Menu updatedMenu = new Menu();
        updatedMenu.setId(1);
        updatedMenu.setName("Updated Menu");
        updatedMenu.setDescription("Updated description");
        updatedMenu.setOriginalPrice(22.0);
        updatedMenu.setIsSpecialOffer(false);
        updatedMenu.setRequiresFanId(false);
        updatedMenu.setRestaurant(restaurant);
        updatedMenu.setMenuType(menuType);

        when(menuService.updateMenu(eq(1), any(Menu.class))).thenReturn(updatedMenu);

        mockMvc.perform(put("/api/menus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Menu")))
                .andExpect(jsonPath("$.description", is("Updated description")))
                .andExpect(jsonPath("$.originalPrice", is(22.0)));

        verify(menuService, times(1)).updateMenu(eq(1), any(Menu.class));
    }

    @Test
    void updateMenu_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        Menu updatedDetails = new Menu();
        updatedDetails.setName("Updated Menu");
        updatedDetails.setDescription("Updated description");

        when(menuService.updateMenu(eq(99), any(Menu.class)))
                .thenThrow(new IllegalArgumentException("Menu not found with ID: 99"));

        mockMvc.perform(put("/api/menus/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());

        verify(menuService, times(1)).updateMenu(eq(99), any(Menu.class));
    }

    @Test
    void createSpecialOffer_ShouldCreateSpecialOffer() throws Exception {
        Menu updatedMenu = new Menu();
        updatedMenu.setId(1);
        updatedMenu.setName("Classic Menu");
        updatedMenu.setDescription("A classic menu for breakfast");
        updatedMenu.setOriginalPrice(15.0);
        updatedMenu.setDiscountedPrice(12.0);
        updatedMenu.setPromotionDetails("Limited time offer");
        updatedMenu.setIsSpecialOffer(true);
        updatedMenu.setRequiresFanId(true);
        updatedMenu.setRestaurant(restaurant);
        updatedMenu.setMenuType(menuType);

        when(menuService.createSpecialOffer(eq(1), eq(15.0), eq(12.0), eq("Limited time offer"), eq(true)))
                .thenReturn(updatedMenu);

        mockMvc.perform(post("/api/menus/1/special-offer")
                        .param("originalPrice", "15.0")
                        .param("discountedPrice", "12.0")
                        .param("promotionDetails", "Limited time offer")
                        .param("requiresFanId", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.isSpecialOffer", is(true)))
                .andExpect(jsonPath("$.discountedPrice", is(12.0)))
                .andExpect(jsonPath("$.promotionDetails", is("Limited time offer")))
                .andExpect(jsonPath("$.requiresFanId", is(true)));

        verify(menuService, times(1)).createSpecialOffer(eq(1), eq(15.0), eq(12.0),
                eq("Limited time offer"), eq(true));
    }

    @Test
    void createSpecialOffer_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(menuService.createSpecialOffer(eq(99), any(Double.class), any(Double.class),
                any(String.class), any(Boolean.class)))
                .thenThrow(new IllegalArgumentException("Menu not found with ID: 99"));

        mockMvc.perform(post("/api/menus/99/special-offer")
                        .param("originalPrice", "15.0")
                        .param("discountedPrice", "12.0")
                        .param("promotionDetails", "Limited time offer")
                        .param("requiresFanId", "true"))
                .andExpect(status().isNotFound());

        verify(menuService, times(1)).createSpecialOffer(eq(99), eq(15.0), eq(12.0),
                eq("Limited time offer"), eq(true));
    }

    @Test
    void deleteMenu_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(menuService).deleteMenu(1);

        mockMvc.perform(delete("/api/menus/1"))
                .andExpect(status().isNoContent());

        verify(menuService, times(1)).deleteMenu(1);
    }
}