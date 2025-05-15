package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.Restoration.*;
import com.fssm.worldcup.Services.Restoration.ProductService;
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

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    private Product product;
    private ProductWithAdd productWithAdd;
    private ProductWithoutAdd productWithoutAdd;
    private Menu menu;
    private Additional additional;
    private ProductMenu productMenu;
    private ProductAdditional productAdditional;
    private List<Product> productList;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(productService);

        // Créer un menu pour les tests
        menu = new Menu();
        menu.setId(1);
        menu.setName("Test Menu");

        // Créer un additionnel pour les tests
        additional = new Additional();
        additional.setId(1);
        additional.setName("Extra cheese");
        additional.setPrice(2.0);
        additional.setIsAvailable(true);

        // Créer des produits pour les tests
        product = new Product();
        product.setId(1);
        product.setName("Generic Product");
        product.setDescription("A generic product");
        product.setPrice(10.0);
        product.setIsAvailable(true);

        productWithAdd = new ProductWithAdd();
        productWithAdd.setId(2);
        productWithAdd.setName("Pizza");
        productWithAdd.setDescription("Delicious pizza with toppings");
        productWithAdd.setPrice(15.0);
        productWithAdd.setIsAvailable(true);

        productWithoutAdd = new ProductWithoutAdd();
        productWithoutAdd.setId(3);
        productWithoutAdd.setName("Water");
        productWithoutAdd.setDescription("Bottled water");
        productWithoutAdd.setPrice(2.0);
        productWithoutAdd.setIsAvailable(true);

        // Créer la relation product-menu
        productMenu = new ProductMenu();
        productMenu.setId(1);
        productMenu.setProduct(productWithAdd);
        productMenu.setMenu(menu);
        productMenu.setDisplayOrder(1);

        // Créer la relation product-additional
        productAdditional = new ProductAdditional();
        productAdditional.setId(1);
        productAdditional.setProduct(productWithAdd);
        productAdditional.setAdditional(additional);
        productAdditional.setAdditionalPrice(2.5);

        // Liste de produits
        productList = Arrays.asList(product, productWithAdd, productWithoutAdd);
    }

    @Test
    void getAllProducts_ShouldReturnAllProducts() throws Exception {
        when(productService.getAllProducts()).thenReturn(productList);

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Generic Product")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("Pizza")))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].name", is("Water")));

        verify(productService, times(1)).getAllProducts();
    }

    @Test
    void getProductById_WithExistingId_ShouldReturnProduct() throws Exception {
        when(productService.getProductById(1)).thenReturn(Optional.of(product));

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Generic Product")))
                .andExpect(jsonPath("$.description", is("A generic product")))
                .andExpect(jsonPath("$.price", is(10.0)))
                .andExpect(jsonPath("$.isAvailable", is(true)));

        verify(productService, times(1)).getProductById(1);
    }

    @Test
    void getProductById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(productService.getProductById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/products/99"))
                .andExpect(status().isNotFound());

        verify(productService, times(1)).getProductById(99);
    }

    @Test
    void getProductsByMenu_ShouldReturnMenuProducts() throws Exception {
        when(productService.getProductsByMenu(1)).thenReturn(Arrays.asList(productWithAdd));

        mockMvc.perform(get("/api/products/menu/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(2)))
                .andExpect(jsonPath("$[0].name", is("Pizza")));

        verify(productService, times(1)).getProductsByMenu(1);
    }

    @Test
    void getAvailableProducts_ShouldReturnAvailableProducts() throws Exception {
        when(productService.getAvailableProducts()).thenReturn(productList); // Tous sont disponibles

        mockMvc.perform(get("/api/products/available"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].isAvailable", is(true)))
                .andExpect(jsonPath("$[1].isAvailable", is(true)))
                .andExpect(jsonPath("$[2].isAvailable", is(true)));

        verify(productService, times(1)).getAvailableProducts();
    }




    @Test
    void updateProduct_WithExistingId_ShouldUpdateAndReturnProduct() throws Exception {
        Product updatedDetails = new Product();
        updatedDetails.setName("Updated Product");
        updatedDetails.setDescription("Updated description");
        updatedDetails.setPrice(12.0);
        updatedDetails.setIsAvailable(false);

        Product updatedProduct = new Product();
        updatedProduct.setId(1);
        updatedProduct.setName("Updated Product");
        updatedProduct.setDescription("Updated description");
        updatedProduct.setPrice(12.0);
        updatedProduct.setIsAvailable(false);

        when(productService.updateProduct(eq(1), any(Product.class))).thenReturn(updatedProduct);

        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Product")))
                .andExpect(jsonPath("$.description", is("Updated description")))
                .andExpect(jsonPath("$.price", is(12.0)))
                .andExpect(jsonPath("$.isAvailable", is(false)));

        verify(productService, times(1)).updateProduct(eq(1), any(Product.class));
    }

    @Test
    void updateProduct_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        Product updatedDetails = new Product();
        updatedDetails.setName("Updated Product");
        updatedDetails.setDescription("Updated description");
        updatedDetails.setPrice(12.0);
        updatedDetails.setIsAvailable(false);

        when(productService.updateProduct(eq(99), any(Product.class)))
                .thenThrow(new IllegalArgumentException("Product not found with ID: 99"));

        mockMvc.perform(put("/api/products/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isNotFound());

        verify(productService, times(1)).updateProduct(eq(99), any(Product.class));
    }

    @Test
    void addProductToMenu_ShouldAddProductToMenuAndReturnProductMenu() throws Exception {
        when(productService.addProductToMenu(eq(2), eq(1), eq(3))).thenReturn(productMenu);

        mockMvc.perform(post("/api/products/2/menu/1")
                        .param("displayOrder", "3"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.displayOrder", is(1)));

        verify(productService, times(1)).addProductToMenu(eq(2), eq(1), eq(3));
    }

    @Test
    void addProductToMenu_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        when(productService.addProductToMenu(eq(99), eq(99), eq(0)))
                .thenThrow(new IllegalArgumentException("Product or Menu not found"));

        mockMvc.perform(post("/api/products/99/menu/99"))
                .andExpect(status().isBadRequest());

        verify(productService, times(1)).addProductToMenu(eq(99), eq(99), eq(0));
    }

    @Test
    void addAdditionalToProduct_ShouldAddAdditionalToProductAndReturnProductAdditional() throws Exception {
        when(productService.addAdditionalToProduct(eq(2), eq(1), eq(2.5))).thenReturn(productAdditional);

        mockMvc.perform(post("/api/products/2/additional/1")
                        .param("additionalPrice", "2.5"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.additionalPrice", is(2.5)));

        verify(productService, times(1)).addAdditionalToProduct(eq(2), eq(1), eq(2.5));
    }

    @Test
    void addAdditionalToProduct_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        when(productService.addAdditionalToProduct(eq(99), eq(99), isNull()))
                .thenThrow(new IllegalArgumentException("Product or Additional not found or Product does not support additionals"));

        mockMvc.perform(post("/api/products/99/additional/99"))
                .andExpect(status().isBadRequest());

        verify(productService, times(1)).addAdditionalToProduct(eq(99), eq(99), isNull());
    }

    @Test
    void deleteProduct_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(productService).deleteProduct(1);

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());

        verify(productService, times(1)).deleteProduct(1);
    }
}