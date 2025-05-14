package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, String> {
}