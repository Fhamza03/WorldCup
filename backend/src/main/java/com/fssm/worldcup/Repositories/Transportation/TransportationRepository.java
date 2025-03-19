package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.Transportation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationRepository extends JpaRepository<Transportation, Integer> {
}
