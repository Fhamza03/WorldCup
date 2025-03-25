package com.fssm.worldcup.Repositories.Restoration;

import com.fssm.worldcup.Models.Restoration.MenuType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuTypeRepository extends JpaRepository<MenuType, Integer> {
    List<MenuType> findAllByOrderByDisplayOrderAsc();
}