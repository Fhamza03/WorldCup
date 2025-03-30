package com.fssm.worldcup.Controllers.Transportation;

import com.fssm.worldcup.Models.Transportation.Journey;
import com.fssm.worldcup.Services.Transportation.JourneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journey")
public class JourneyController {

    @Autowired
    private JourneyService journeyService;

    @PostMapping("/createJourney")
    @ResponseStatus(HttpStatus.CREATED)
    public Journey createJourney(@RequestBody Journey journey) {
        return journeyService.saveJourney(journey);
    }

    @GetMapping("/getJourney/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Journey getJourney(@PathVariable Integer id) {
        return journeyService.findJourneyById(id);
    }

    @GetMapping("/getAllJourneys")
    @ResponseStatus(HttpStatus.OK)
    public List<Journey> getAllJourneys() {
        return journeyService.findAllJourneys();
    }

    @DeleteMapping("/deleteJourney/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJourney(@PathVariable Integer id) {
        journeyService.deleteJourneyById(id);
    }

    @PutMapping("/updateJourney")
    @ResponseStatus(HttpStatus.OK)
    public Journey updateJourney(@RequestBody Journey journey) {
        return journeyService.updateJourney(journey);
    }

    @GetMapping("/journeyExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean journeyExists(@PathVariable Integer id) {
        return journeyService.existsById(id);
    }
}
