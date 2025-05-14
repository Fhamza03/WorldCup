package com.fssm.worldcup.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FanIdRequestDTO {
        private Integer userId; // This matches what's sent from the frontend
        private String cardNumber;
        private String cardType;
        private String issueDate;
        private String expiryDate;
        private List<String> gameIds;

        public Integer getUserId() {
                return userId;
        }

        public void setUserId(Integer userId) {
                this.userId = userId;
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

        public List<String> getGameIds() {
                return gameIds;
        }

        public void setGameIds(List<String> gameIds) {
                this.gameIds = gameIds;
        }
}