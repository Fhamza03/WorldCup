package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.DTOs.FanIdRequestDTO;
import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Services.General.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

//    @PostMapping("/createCard")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Card createCard(@RequestBody Card card) {
//        return cardService.saveCard(card);
//    }

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

    @PutMapping("/updateCard")
    @ResponseStatus(HttpStatus.OK)
    public Card updateCard(@RequestBody Card card) {
        return cardService.updateCard(card);
    }

    @GetMapping("/cardExists/{id}")
    @ResponseStatus(HttpStatus.OK)
    public boolean cardExists(@PathVariable Integer id) {
        return cardService.existsById(id);
    }
    @PostMapping("/createFanId")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createFanId(@RequestBody FanIdRequestDTO dto) {
        Card card = cardService.createFanId(dto);

        // Create a response map that includes the card ID explicitly
        Map<String, Object> response = new HashMap<>();
        response.put("cardId", card.getCardId());
        response.put("cardNumber", card.getCardNumber());
        response.put("cardType", card.getCardType());
        response.put("issueDate", card.getIssueDate());
        response.put("expiryDate", card.getExpiryDate());

        return response;
    }


}
