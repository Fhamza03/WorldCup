package com.fssm.worldcup.Repositories.Transportation;

import com.fssm.worldcup.Models.Transportation.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
}
