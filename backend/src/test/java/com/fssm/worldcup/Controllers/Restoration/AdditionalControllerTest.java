package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.Restoration.Additional;
import com.fssm.worldcup.Services.Restoration.AdditionalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
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

@WebMvcTest(AdditionalController.class)
public class AdditionalControllerTest {



    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdditionalService additionalService;

    @Autowired
    private ObjectMapper objectMapper;

    private Additional additional1;
    private Additional additional2;
    private List<Additional> additionalList;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(additionalService);

        additional1 = new Additional();
        additional1.setId(1);
        additional1.setName("Extra cheese");
        additional1.setDescription("Add extra cheese");
        additional1.setPrice(2.0);
        additional1.setIsAvailable(true);

        additional2 = new Additional();
        additional2.setId(2);
        additional2.setName("Extra sauce");
        additional2.setDescription("Add extra sauce");
        additional2.setPrice(1.5);
        additional2.setIsAvailable(false);

        additionalList = Arrays.asList(additional1, additional2);
    }
    @Test
    void getAllAdditionals_ShouldReturnAllAdditionals() throws Exception {
        when(additionalService.getAllAdditionals()).thenReturn(additionalList);

        mockMvc.perform(get("/api/additionals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Extra cheese")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Extra sauce")));

        verify(additionalService, times(1)).getAllAdditionals();
    }

    @Test
    void getAdditionalById_WithExistingId_ShouldReturnAdditional() throws Exception {
        when(additionalService.getAdditionalById(1)).thenReturn(Optional.of(additional1));

        mockMvc.perform(get("/api/additionals/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Extra cheese")))
                .andExpect(jsonPath("$.description", is("Add extra cheese")))
                .andExpect(jsonPath("$.price", is(2.0)))
                .andExpect(jsonPath("$.isAvailable", is(true)));

        verify(additionalService, times(1)).getAdditionalById(1);
    }

    @Test
    void getAdditionalById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(additionalService.getAdditionalById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/additionals/99"))
                .andExpect(status().isNotFound());

        verify(additionalService, times(1)).getAdditionalById(99);
    }

    @Test
    void getAdditionalsByProduct_ShouldReturnProductAdditionals() throws Exception {
        when(additionalService.getAdditionalsByProduct(1)).thenReturn(Arrays.asList(additional1));

        mockMvc.perform(get("/api/additionals/product/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Extra cheese")));

        verify(additionalService, times(1)).getAdditionalsByProduct(1);
    }

    @Test
    void getAvailableAdditionals_ShouldReturnAvailableAdditionals() throws Exception {
        when(additionalService.getAvailableAdditionals()).thenReturn(Arrays.asList(additional1));

        mockMvc.perform(get("/api/additionals/available"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].isAvailable", is(true)));

        verify(additionalService, times(1)).getAvailableAdditionals();
    }

    @Test
    void createAdditional_ShouldCreateAndReturnAdditional() throws Exception {
        Additional newAdditional = new Additional();
        newAdditional.setName("New Additional");
        newAdditional.setDescription("New Description");
        newAdditional.setPrice(3.0);
        newAdditional.setIsAvailable(true);

        Additional savedAdditional = new Additional();
        savedAdditional.setId(3);
        savedAdditional.setName("New Additional");
        savedAdditional.setDescription("New Description");
        savedAdditional.setPrice(3.0);
        savedAdditional.setIsAvailable(true);

        when(additionalService.createAdditional(any(Additional.class))).thenReturn(savedAdditional);

        mockMvc.perform(post("/api/additionals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newAdditional)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("New Additional")))
                .andExpect(jsonPath("$.description", is("New Description")))
                .andExpect(jsonPath("$.price", is(3.0)))
                .andExpect(jsonPath("$.isAvailable", is(true)));

        verify(additionalService, times(1)).createAdditional(any(Additional.class));
    }

    @Test
    void updateAdditional_WithExistingId_ShouldUpdateAndReturnAdditional() throws Exception {
        Additional updatedDetails = new Additional();
        updatedDetails.setName("Updated Name");
        updatedDetails.setDescription("Updated Description");
        updatedDetails.setPrice(4.0);
        updatedDetails.setIsAvailable(false);

        Additional updatedAdditional = new Additional();
        updatedAdditional.setId(1);
        updatedAdditional.setName("Updated Name");
        updatedAdditional.setDescription("Updated Description");
        updatedAdditional.setPrice(4.0);
        updatedAdditional.setIsAvailable(false);

        when(additionalService.updateAdditional(eq(1), any(Additional.class))).thenReturn(updatedAdditional);

        mockMvc.perform(put("/api/additionals/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Name")))
                .andExpect(jsonPath("$.description", is("Updated Description")))
                .andExpect(jsonPath("$.price", is(4.0)))
                .andExpect(jsonPath("$.isAvailable", is(false)));

        verify(additionalService, times(1)).updateAdditional(eq(1), any(Additional.class));
    }

    @Test
    void updateAdditional_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        Additional updatedDetails = new Additional();
        updatedDetails.setName("Updated Name");
        updatedDetails.setDescription("Updated Description");
        updatedDetails.setPrice(4.0);
        updatedDetails.setIsAvailable(false);

        when(additionalService.updateAdditional(eq(99), any(Additional.class)))
                .thenThrow(new IllegalArgumentException("Additional not found with ID: 99"));

        mockMvc.perform(put("/api/additionals/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());

        verify(additionalService, times(1)).updateAdditional(eq(99), any(Additional.class));
    }

    @Test
    void deleteAdditional_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(additionalService).deleteAdditional(1);

        mockMvc.perform(delete("/api/additionals/1"))
                .andExpect(status().isNoContent());

        verify(additionalService, times(1)).deleteAdditional(1);
    }
}