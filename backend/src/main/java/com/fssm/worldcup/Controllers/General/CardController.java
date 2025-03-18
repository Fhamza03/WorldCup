package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Services.General.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/createCard")
    public Card createCard(@RequestBody Card card) {
        return cardService.saveCard(card);
    }

    @GetMapping("/getCard/{id}")
    public Card getCard(@PathVariable Integer id) {
        return cardService.findCardById(id);
    }

    @GetMapping("/getAllCards")
    public List<Card> getAllCards() {
        return cardService.findAllCards();
    }

    @DeleteMapping("/deleteCard/{id}")
    public void deleteCard(@PathVariable Integer id) {
        cardService.deleteCardById(id);
    }

    @GetMapping("/cardExists/{id}")
    public boolean cardExists(@PathVariable Integer id) {
        return cardService.existsById(id);
    }
}
