package com.fssm.worldcup.Services.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Reservation;
import com.fssm.worldcup.Repositories.Accommodation.ReservationRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation saveReservation(Reservation reservation) {
        try {
            return reservationRepository.save(reservation);
        } catch (Exception e) {
            throw new RuntimeException("Error saving reservation: " + e.getMessage());
        }
    }

    public Reservation findReservationById(Integer id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty()) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        return reservation.get();
    }

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    public void deleteReservationById(Integer id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return reservationRepository.existsById(id);
    }
}
