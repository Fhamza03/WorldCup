package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer> {
    Optional<Provider> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsById(int id);
}