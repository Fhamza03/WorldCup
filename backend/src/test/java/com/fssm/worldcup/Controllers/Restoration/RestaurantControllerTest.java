package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.General.Provider;
import com.fssm.worldcup.Models.Restoration.Restaurant;
import com.fssm.worldcup.Services.Restoration.RestaurantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.DayOfWeek;
import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RestaurantController.class)
public class RestaurantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestaurantService restaurantService;

    @Autowired
    private ObjectMapper objectMapper;

    private Restaurant restaurant1;
    private Restaurant restaurant2;
    private List<Restaurant> restaurantList;
    private Provider provider;
    private Map<DayOfWeek, String> openingHours;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(restaurantService);

        // Créer un provider pour les tests
        provider = new Provider();


        // Créer des heures d'ouverture
        openingHours = new HashMap<>();
        openingHours.put(DayOfWeek.MONDAY, "09:00-22:00");
        openingHours.put(DayOfWeek.TUESDAY, "09:00-22:00");
        openingHours.put(DayOfWeek.WEDNESDAY, "09:00-22:00");
        openingHours.put(DayOfWeek.THURSDAY, "09:00-22:00");
        openingHours.put(DayOfWeek.FRIDAY, "09:00-23:00");
        openingHours.put(DayOfWeek.SATURDAY, "10:00-23:00");
        openingHours.put(DayOfWeek.SUNDAY, "10:00-21:00");

        // Créer des restaurants pour les tests
        restaurant1 = new Restaurant();
        restaurant1.setId(1);
        restaurant1.setName("Italian Bistro");
        restaurant1.setDescription("Authentic Italian cuisine");
        restaurant1.setCuisineType("Italian");
        restaurant1.setLocation("Stadium A");
        restaurant1.setAddress("123 Main St");
        restaurant1.setContactPhone("+1234567890");
        restaurant1.setEmail("italian@example.com");
        restaurant1.setIsPartner(true);
        restaurant1.setProvider(provider);
        restaurant1.setOpeningHours(openingHours);

        restaurant2 = new Restaurant();
        restaurant2.setId(2);
        restaurant2.setName("Sushi Bar");
        restaurant2.setDescription("Fresh Japanese food");
        restaurant2.setCuisineType("Japanese");
        restaurant2.setLocation("Stadium B");
        restaurant2.setAddress("456 Second St");
        restaurant2.setContactPhone("+0987654321");
        restaurant2.setEmail("sushi@example.com");
        restaurant2.setIsPartner(false);
        restaurant2.setProvider(provider);

        restaurantList = Arrays.asList(restaurant1, restaurant2);
    }

    @Test
    void getAllRestaurants_ShouldReturnAllRestaurants() throws Exception {
        when(restaurantService.getAllRestaurants()).thenReturn(restaurantList);

        mockMvc.perform(get("/api/restaurants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Italian Bistro")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Sushi Bar")));

        verify(restaurantService, times(1)).getAllRestaurants();
    }

    @Test
    void getRestaurantById_WithExistingId_ShouldReturnRestaurant() throws Exception {
        when(restaurantService.getRestaurantById(1)).thenReturn(Optional.of(restaurant1));

        mockMvc.perform(get("/api/restaurants/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Italian Bistro")))
                .andExpect(jsonPath("$.description", is("Authentic Italian cuisine")))
                .andExpect(jsonPath("$.cuisineType", is("Italian")))
                .andExpect(jsonPath("$.location", is("Stadium A")))
                .andExpect(jsonPath("$.isPartner", is(true)));

        verify(restaurantService, times(1)).getRestaurantById(1);
    }

    @Test
    void getRestaurantById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(restaurantService.getRestaurantById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/restaurants/99"))
                .andExpect(status().isNotFound());

        verify(restaurantService, times(1)).getRestaurantById(99);
    }

    @Test
    void getRestaurantsByProvider_ShouldReturnProviderRestaurants() throws Exception {
        when(restaurantService.getRestaurantsByProvider(1)).thenReturn(restaurantList);

        mockMvc.perform(get("/api/restaurants/provider/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Italian Bistro")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Sushi Bar")));

        verify(restaurantService, times(1)).getRestaurantsByProvider(1);
    }

    @Test
    void getRestaurantsByCuisineType_ShouldReturnCuisineTypeRestaurants() throws Exception {
        when(restaurantService.getRestaurantsByCuisineType("Italian")).thenReturn(Arrays.asList(restaurant1));

        mockMvc.perform(get("/api/restaurants/cuisine/Italian"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Italian Bistro")))
                .andExpect(jsonPath("$[0].cuisineType", is("Italian")));

        verify(restaurantService, times(1)).getRestaurantsByCuisineType("Italian");
    }

    @Test
    void getRestaurantsByLocation_ShouldReturnLocationRestaurants() throws Exception {
        when(restaurantService.getRestaurantsByLocation("Stadium A")).thenReturn(Arrays.asList(restaurant1));

        mockMvc.perform(get("/api/restaurants/location/Stadium A"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Italian Bistro")))
                .andExpect(jsonPath("$[0].location", is("Stadium A")));

        verify(restaurantService, times(1)).getRestaurantsByLocation("Stadium A");
    }

    @Test
    void getPartnerRestaurants_ShouldReturnPartnerRestaurants() throws Exception {
        when(restaurantService.getPartnerRestaurants()).thenReturn(Arrays.asList(restaurant1));

        mockMvc.perform(get("/api/restaurants/partners"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Italian Bistro")))
                .andExpect(jsonPath("$[0].isPartner", is(true)));

        verify(restaurantService, times(1)).getPartnerRestaurants();
    }

    @Test
    void createRestaurant_ShouldCreateAndReturnRestaurant() throws Exception {
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setName("Mexican Food");
        newRestaurant.setDescription("Authentic Mexican cuisine");
        newRestaurant.setCuisineType("Mexican");
        newRestaurant.setLocation("Stadium C");
        newRestaurant.setAddress("789 Third St");
        newRestaurant.setContactPhone("+1122334455");
        newRestaurant.setEmail("mexican@example.com");

        Restaurant savedRestaurant = new Restaurant();
        savedRestaurant.setId(3);
        savedRestaurant.setName("Mexican Food");
        savedRestaurant.setDescription("Authentic Mexican cuisine");
        savedRestaurant.setCuisineType("Mexican");
        savedRestaurant.setLocation("Stadium C");
        savedRestaurant.setAddress("789 Third St");
        savedRestaurant.setContactPhone("+1122334455");
        savedRestaurant.setEmail("mexican@example.com");
        savedRestaurant.setIsPartner(true);
        savedRestaurant.setProvider(provider);

        when(restaurantService.createRestaurant(any(Restaurant.class), eq(1))).thenReturn(savedRestaurant);

        mockMvc.perform(post("/api/restaurants/provider/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newRestaurant)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("Mexican Food")))
                .andExpect(jsonPath("$.cuisineType", is("Mexican")))
                .andExpect(jsonPath("$.isPartner", is(true)));

        verify(restaurantService, times(1)).createRestaurant(any(Restaurant.class), eq(1));
    }

    @Test
    void createRestaurant_WithInvalidProvider_ShouldReturnBadRequest() throws Exception {
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setName("Invalid Restaurant");

        when(restaurantService.createRestaurant(any(Restaurant.class), eq(99)))
                .thenThrow(new IllegalArgumentException("Provider not found with ID: 99"));

        mockMvc.perform(post("/api/restaurants/provider/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newRestaurant)))
                .andExpect(status().isBadRequest());

        verify(restaurantService, times(1)).createRestaurant(any(Restaurant.class), eq(99));
    }

    @Test
    void updateRestaurant_WithExistingId_ShouldUpdateAndReturnRestaurant() throws Exception {
        Restaurant updatedDetails = new Restaurant();
        updatedDetails.setName("Updated Italian");
        updatedDetails.setDescription("Updated description");
        updatedDetails.setCuisineType("Italian-Fusion");
        updatedDetails.setLocation("Stadium A");
        updatedDetails.setAddress("Updated Address");
        updatedDetails.setContactPhone("+9988776655");
        updatedDetails.setEmail("updated@example.com");

        Restaurant updatedRestaurant = new Restaurant();
        updatedRestaurant.setId(1);
        updatedRestaurant.setName("Updated Italian");
        updatedRestaurant.setDescription("Updated description");
        updatedRestaurant.setCuisineType("Italian-Fusion");
        updatedRestaurant.setLocation("Stadium A");
        updatedRestaurant.setAddress("Updated Address");
        updatedRestaurant.setContactPhone("+9988776655");
        updatedRestaurant.setEmail("updated@example.com");
        updatedRestaurant.setIsPartner(true);
        updatedRestaurant.setProvider(provider);
        updatedRestaurant.setOpeningHours(openingHours);

        when(restaurantService.updateRestaurant(eq(1), any(Restaurant.class))).thenReturn(updatedRestaurant);

        mockMvc.perform(put("/api/restaurants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Italian")))
                .andExpect(jsonPath("$.description", is("Updated description")))
                .andExpect(jsonPath("$.cuisineType", is("Italian-Fusion")));

        verify(restaurantService, times(1)).updateRestaurant(eq(1), any(Restaurant.class));
    }

    @Test
    void updateRestaurant_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        Restaurant updatedDetails = new Restaurant();
        updatedDetails.setName("Updated Restaurant");
        updatedDetails.setDescription("Updated description");

        when(restaurantService.updateRestaurant(eq(99), any(Restaurant.class)))
                .thenThrow(new IllegalArgumentException("Restaurant not found with ID: 99"));

        mockMvc.perform(put("/api/restaurants/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());

        verify(restaurantService, times(1)).updateRestaurant(eq(99), any(Restaurant.class));
    }

    @Test
    void updateOpeningHours_ShouldUpdateAndReturnRestaurant() throws Exception {
        Map<DayOfWeek, String> newHours = new HashMap<>();
        newHours.put(DayOfWeek.MONDAY, "08:00-23:00");
        newHours.put(DayOfWeek.TUESDAY, "08:00-23:00");
        newHours.put(DayOfWeek.WEDNESDAY, "08:00-23:00");
        newHours.put(DayOfWeek.THURSDAY, "08:00-23:00");
        newHours.put(DayOfWeek.FRIDAY, "08:00-00:00");
        newHours.put(DayOfWeek.SATURDAY, "09:00-00:00");
        newHours.put(DayOfWeek.SUNDAY, "09:00-22:00");

        Restaurant updatedRestaurant = new Restaurant();
        updatedRestaurant.setId(1);
        updatedRestaurant.setName("Italian Bistro");
        updatedRestaurant.setDescription("Authentic Italian cuisine");
        updatedRestaurant.setCuisineType("Italian");
        updatedRestaurant.setLocation("Stadium A");
        updatedRestaurant.setAddress("123 Main St");
        updatedRestaurant.setContactPhone("+1234567890");
        updatedRestaurant.setEmail("italian@example.com");
        updatedRestaurant.setIsPartner(true);
        updatedRestaurant.setProvider(provider);
        updatedRestaurant.setOpeningHours(newHours);

        when(restaurantService.updateOpeningHours(eq(1), any(Map.class))).thenReturn(updatedRestaurant);

        mockMvc.perform(put("/api/restaurants/1/opening-hours")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newHours)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Italian Bistro")));

        verify(restaurantService, times(1)).updateOpeningHours(eq(1), any(Map.class));
    }

    @Test
    void updateOpeningHours_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        Map<DayOfWeek, String> newHours = new HashMap<>();
        newHours.put(DayOfWeek.MONDAY, "08:00-23:00");

        when(restaurantService.updateOpeningHours(eq(99), any(Map.class)))
                .thenThrow(new IllegalArgumentException("Restaurant not found with ID: 99"));

        mockMvc.perform(put("/api/restaurants/99/opening-hours")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newHours)))
                .andExpect(status().isNotFound());

        verify(restaurantService, times(1)).updateOpeningHours(eq(99), any(Map.class));
    }

    @Test
    void deleteRestaurant_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(restaurantService).deleteRestaurant(1);

        mockMvc.perform(delete("/api/restaurants/1"))
                .andExpect(status().isNoContent());

        verify(restaurantService, times(1)).deleteRestaurant(1);
    }
}