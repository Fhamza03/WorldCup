package com.fssm.worldcup.Controllers.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Reservation;
import com.fssm.worldcup.Services.Accommodation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/createReservation")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.saveReservation(reservation);
    }

    @GetMapping("/getReservation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Reservation getReservation(@PathVariable Integer id) {
        return reservationService.findReservationById(id);
    }

    @GetMapping("/getAllReservations")
    @ResponseStatus(HttpStatus.OK)
    public List<Reservation> getAllReservations() {
        return reservationService.findAllReservations();
    }

    @DeleteMapping("/deleteReservation/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReservation(@PathVariable Integer id) {
        reservationService.deleteReservationById(id);
    }

    @GetMapping("/reservationExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean reservationExists(@PathVariable Integer id) {
        return reservationService.existsById(id);
    }
}
