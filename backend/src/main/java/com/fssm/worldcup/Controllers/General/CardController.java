package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Services.General.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/createCard")
    @ResponseStatus(HttpStatus.CREATED)
    public Card createCard(@RequestBody Card card) {
        return cardService.saveCard(card);
    }

    @GetMapping("/getCard/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Card getCard(@PathVariable Integer id) {
        return cardService.findCardById(id);
    }

    @GetMapping("/getAllCards")
    @ResponseStatus(HttpStatus.OK)
    public List<Card> getAllCards() {
        return cardService.findAllCards();
    }

    @DeleteMapping("/deleteCard/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCard(@PathVariable Integer id) {
        cardService.deleteCardById(id);
    }

    @GetMapping("/cardExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean cardExists(@PathVariable Integer id) {
        return cardService.existsById(id);
    }
}
