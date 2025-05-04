package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.Additional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdditionalRepository extends JpaRepository<Additional, Integer> {
    List<Additional> findByIsAvailable(Boolean isAvailable);

    @Query("SELECT a FROM Additional a JOIN a.productAdditionals pa WHERE pa.product.id = :productId")
    List<Additional> findByProductId(Integer productId);
}