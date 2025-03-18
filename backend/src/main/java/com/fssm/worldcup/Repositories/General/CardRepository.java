package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
}
