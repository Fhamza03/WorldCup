package com.fssm.worldcup.Repositories.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}
