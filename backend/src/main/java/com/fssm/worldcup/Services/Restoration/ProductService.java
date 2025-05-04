package com.fssm.worldcup.Services.Restoration;

import com.fssm.worldcup.Models.Restoration.*;
import com.fssm.worldcup.Repositories.Restoration.AdditionalRepository;
import com.fssm.worldcup.Repositories.Restoration.MenuRepository;
import com.fssm.worldcup.Repositories.Restoration.ProductMenuRepository;
import com.fssm.worldcup.Repositories.Restoration.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private AdditionalRepository additionalRepository;
    @Autowired
    private ProductMenuRepository productMenuRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByMenu(Integer menuId) {
        return productRepository.findByMenuId(menuId);
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findByIsAvailable(true);
    }

    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public ProductWithAdd createProductWithAdd(ProductWithAdd product) {
        return productRepository.save(product);
    }

    @Transactional
    public ProductWithoutAdd createProductWithoutAdd(ProductWithoutAdd product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Integer id, Product productDetails) {
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setImage(productDetails.getImage());
            product.setIsAvailable(productDetails.getIsAvailable());

            return productRepository.save(product);
        }
        throw new IllegalArgumentException("Product not found with ID: " + id);
    }

    @Transactional
    public ProductMenu addProductToMenu(Integer productId, Integer menuId, Integer displayOrder) {
        Optional<Product> productOpt = productRepository.findById(productId);
        Optional<Menu> menuOpt = menuRepository.findById(menuId);

        if (productOpt.isPresent() && menuOpt.isPresent()) {
            ProductMenu productMenu = new ProductMenu();
            productMenu.setProduct(productOpt.get());
            productMenu.setMenu(menuOpt.get());
            productMenu.setDisplayOrder(displayOrder);

            // 🔥 C'est ici qu'il faut l'enregistrer
            return productMenuRepository.save(productMenu);
        }
        throw new IllegalArgumentException("Product or Menu not found");
    }


    @Transactional
    public ProductAdditional addAdditionalToProduct(Integer productId, Integer additionalId, Double additionalPrice) {
        Optional<Product> productOpt = productRepository.findById(productId);
        Optional<Additional> additionalOpt = additionalRepository.findById(additionalId);

        if (productOpt.isPresent() && additionalOpt.isPresent() && productOpt.get() instanceof ProductWithAdd) {
            ProductWithAdd product = (ProductWithAdd) productOpt.get();

            ProductAdditional productAdditional = new ProductAdditional();
            productAdditional.setProduct(product);
            productAdditional.setAdditional(additionalOpt.get());
            productAdditional.setAdditionalPrice(additionalPrice);

            return productAdditional;
        }
        throw new IllegalArgumentException("Product or Additional not found or Product does not support additionals");
    }

    @Transactional
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}