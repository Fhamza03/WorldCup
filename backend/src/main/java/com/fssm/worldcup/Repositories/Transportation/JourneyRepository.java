package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer> {
}
