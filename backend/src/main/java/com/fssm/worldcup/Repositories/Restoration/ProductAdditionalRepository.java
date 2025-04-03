package com.fssm.worldcup.Repositories.Restoration;


import com.fssm.worldcup.Models.Restoration.ProductAdditional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAdditionalRepository extends JpaRepository<ProductAdditional, Long> {

    List<ProductAdditional> findByProductId(Long productId);

    List<ProductAdditional> findByAdditionalId(Long additionalId);

    void deleteByProductIdAndAdditionalId(Long productId, Long additionalId);
}
