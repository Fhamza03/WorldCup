package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p JOIN p.productMenus pm WHERE pm.menu.id = :menuId")
    List<Product> findByMenuId(Integer menuId);

    List<Product> findByIsAvailable(Boolean isAvailable);
}
