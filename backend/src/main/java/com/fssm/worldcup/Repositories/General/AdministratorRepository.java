package com.fssm.worldcup.Repositories.General;

import com.fssm.worldcup.Models.General.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
}
