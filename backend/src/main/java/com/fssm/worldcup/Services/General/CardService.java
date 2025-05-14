package com.fssm.worldcup.Services.General;

import com.fssm.worldcup.DTOs.FanIdRequestDTO;
import com.fssm.worldcup.Models.General.Card;
import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Repositories.General.CardRepository;
import com.fssm.worldcup.Exceptions.ResourceNotFoundException;
import com.fssm.worldcup.Repositories.General.GameRepository;
import com.fssm.worldcup.Repositories.General.SupporterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private SupporterService supporterService;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private SupporterRepository supporterRepository;


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

    public Card updateCard(Card card) {
        if (!cardRepository.existsById(card.getCardId())) {
            throw new ResourceNotFoundException("Card not found with id " + card.getCardId());
        }
        return cardRepository.save(card);
    }

    public boolean existsById(Integer id) {
        return cardRepository.existsById(id);
    }

    @Transactional // Add this annotation to ensure transaction consistency
    public Card createFanId(FanIdRequestDTO dto) {
        // 1. Verify that the supporter exists, using userId instead of supporterId
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        Supporter supporter = supporterRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Supporter not found with id " + dto.getUserId()));

        // Verify if the supporter already has a card
        if (supporter.getCard() != null) {
            throw new IllegalArgumentException("Supporter already has a Fan ID card. Each supporter can only have one card.");
        }

        // 2. Verify that 3 game IDs are present
        if (dto.getGameIds() == null || dto.getGameIds().size() != 3) {
            throw new IllegalArgumentException("Exactly 3 game IDs must be provided");
        }

        // 3. Verify the existence of all 3 games
        for (String gameId : dto.getGameIds()) {
            if (!gameRepository.existsById(gameId)) {
                throw new ResourceNotFoundException("Game with ID " + gameId + " does not exist.");
            }
        }

        // 4. Create a card and link it to the supporter
        Card card = Card.builder()
                .cardType(dto.getCardType())
                .cardNumber(dto.getCardNumber() != null ? dto.getCardNumber() : "FAN-" + supporter.getUserId() + "-" + System.currentTimeMillis()) // Use provided number or generate one
                .issueDate(dto.getIssueDate())
                .expiryDate(dto.getExpiryDate())
                .supporter(supporter) // Set the supporter directly here
                .build();

        // Save the card first
        card = cardRepository.save(card);

        // Update the supporter with the card reference
        supporter.setCard(card);
        supporter.setIsFanIdValid(true);
        supporterRepository.save(supporter);

        return card;
    }
}