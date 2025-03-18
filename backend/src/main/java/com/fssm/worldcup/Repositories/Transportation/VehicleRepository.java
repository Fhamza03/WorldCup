package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
}
