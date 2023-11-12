package com.bptn.weatherapp.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bptn.weatherapp.jpa.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByUsername(String username);

	Optional<User> findByEmailId(String email);

}
