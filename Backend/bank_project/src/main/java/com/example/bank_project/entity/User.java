package com.example.bank_project.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

	@Entity
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class User {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@Column(nullable = false, unique = true)
		private String username;

		@Column(nullable = false)
		private String password;

		@ManyToMany(fetch = FetchType.EAGER)
		@JoinTable(name = "users_roles",
		        joinColumns = @JoinColumn(name = "user_id"),
		        inverseJoinColumns = @JoinColumn(name = "role_id"))
		private Set<Role> roles;

		public User() {
			super();
			// TODO Auto-generated constructor stub
		}

		public User(Long id, String username, String password, Set<Role> roles) {
			super();
			this.id = id;
			this.username = username;
			this.password = password;
			this.roles = roles;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Set<Role> getRoles() {
			return roles;
		}

		public void setRoles(Set<Role> roles) {
			this.roles = roles;
		}


}
