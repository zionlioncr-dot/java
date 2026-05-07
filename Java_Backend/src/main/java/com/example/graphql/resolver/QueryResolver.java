package com.example.graphql.resolver;

import com.example.graphql.model.User;
import com.example.graphql.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;

import java.util.List;

@Component
public class QueryResolver {

    private final UserRepository userRepository;

    public QueryResolver(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @QueryMapping
    public String hello() {
        return "Hello GraphQL!";
    }

    @QueryMapping
    public User userById(@Argument Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @QueryMapping
    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
