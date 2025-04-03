package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.ProductMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMenuRepository extends JpaRepository<ProductMenu, Long> {

    List<ProductMenu> findByProductId(Long productId);

    List<ProductMenu> findByMenuId(Long menuId);

    void deleteByProductIdAndMenuId(Long productId, Long menuId);
}
