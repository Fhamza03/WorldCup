package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.VehicleRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRouteRepository extends JpaRepository<VehicleRoute, Integer> {
}
