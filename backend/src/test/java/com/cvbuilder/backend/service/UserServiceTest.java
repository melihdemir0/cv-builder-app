package com.cvbuilder.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.cvbuilder.backend.model.User;
import com.cvbuilder.backend.repository.UserRepository;

public class UserServiceTest {

	@Test
	void shouldReturnAllUsers() {
		// Arrange
		UserRepository userRepository = mock(UserRepository.class);
		UserService userService = new UserService(userRepository);

		User user = new User();
		user.setUsername("Melih");

		when(userRepository.findAll()).thenReturn(List.of(user));

		// Act
		List<User> result = userService.getAllUsers();

		// Assert
		assertEquals(1, result.size());
		assertEquals("Melih", result.get(0).getUsername());
	}

	@Test
	void shouldCreateUser() {
		// Arrange
		UserRepository userRepository = mock(UserRepository.class);
		UserService userService = new UserService(userRepository);

		User user = new User();
		user.setEmail("melih@example.com");

		when(userRepository.save(user)).thenReturn(user);

		// Act
		User result = userService.createUser(user);

		// Assert
		assertEquals("melih@example.com", result.getEmail());
	}
}
