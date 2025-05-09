package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.TransportationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportationTypeRepository extends JpaRepository<TransportationType, Integer> {
}
