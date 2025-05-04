package com.fssm.worldcup.Models.General;

<<<<<<< HEAD
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> origin/main
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer cardId;

    String cardNumber;
    String cardType;
    String issueDate;
    String expiryDate;



    @OneToOne(mappedBy = "card")
<<<<<<< HEAD
    @JsonIgnoreProperties("card") // Use this instead of @JsonBackReference
    private Supporter supporter;

    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
=======
    @JsonIgnore
    Supporter supporter;
>>>>>>> origin/main
}
