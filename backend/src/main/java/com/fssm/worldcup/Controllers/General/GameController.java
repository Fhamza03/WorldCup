package com.fssm.worldcup.Controllers.General;

import com.fssm.worldcup.Models.General.Game;
import com.fssm.worldcup.Services.General.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    // ✅ GET /api/games
    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    // ✅ GET /api/games/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable String id) {
        Game game = gameService.getGameById(id);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(game);
    }
}
