package com.fssm.worldcup.Controllers.Restoration;

import com.fssm.worldcup.Models.Restoration.*;
import com.fssm.worldcup.Services.Restoration.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/menu/{menuId}")
    public ResponseEntity<List<Product>> getProductsByMenu(@PathVariable Integer menuId) {
        return ResponseEntity.ok(productService.getProductsByMenu(menuId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProducts() {
        return ResponseEntity.ok(productService.getAvailableProducts());
    }

    @PostMapping("/with-add")
    public ResponseEntity<ProductWithAdd> createProductWithAdd(@RequestBody ProductWithAdd product) {
        ProductWithAdd createdProduct = productService.createProductWithAdd(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PostMapping("/without-add")
    public ResponseEntity<ProductWithoutAdd> createProductWithoutAdd(@RequestBody ProductWithoutAdd product) {
        ProductWithoutAdd createdProduct = productService.createProductWithoutAdd(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id,
                                                 @RequestBody Product product) {
        try {
            Product updatedProduct = productService.updateProduct(id, product);
            return ResponseEntity.ok(updatedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{productId}/menu/{menuId}")
    public ResponseEntity<ProductMenu> addProductToMenu(@PathVariable Integer productId,
                                                        @PathVariable Integer menuId) {
        System.out.println("Received productId: " + productId);
        System.out.println("Received menuId: " + menuId);

        try {
            ProductMenu productMenu = productService.addProductToMenu(productId, menuId, 0); // Ordre par défaut
            return new ResponseEntity<>(productMenu, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{productId}/additional/{additionalId}")
    public ResponseEntity<ProductAdditional> addAdditionalToProduct(@PathVariable Integer productId,
                                                                    @PathVariable Integer additionalId,
                                                                    @RequestParam(required = false) Double additionalPrice) {
        try {
            ProductAdditional productAdditional = productService.addAdditionalToProduct(
                    productId, additionalId, additionalPrice);
            return new ResponseEntity<>(productAdditional, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}