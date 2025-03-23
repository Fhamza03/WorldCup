package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Supporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupporterRepository extends JpaRepository<Supporter, Integer> {
    Optional<Supporter> findByEmail(String email);
    boolean existsByEmail(String email);
}