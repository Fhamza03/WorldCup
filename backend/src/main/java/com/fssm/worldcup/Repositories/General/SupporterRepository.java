package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Supporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupporterRepository extends JpaRepository<Supporter, Integer> {
}
