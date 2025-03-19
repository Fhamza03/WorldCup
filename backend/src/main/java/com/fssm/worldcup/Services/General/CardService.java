package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Repositories.General.CardRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    public Card findCardById(Integer id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card not found with id " + id));
    }

    public List<Card> findAllCards() {
        return cardRepository.findAll();
    }

    public void deleteCardById(Integer id) {
        if (!cardRepository.existsById(id)) {
            throw new ResourceNotFoundException("Card not found with id " + id);
        }
        cardRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return cardRepository.existsById(id);
    }
}
