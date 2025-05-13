package com.fssm.worldcup.Repositories.Accommodation;

import com.fssm.worldcup.Models.Accommondation.Accommodation;
import com.fssm.worldcup.Models.General.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation,Integer> {
    public List<Accommodation> findAccommodationByProvider(Provider provider);
}
