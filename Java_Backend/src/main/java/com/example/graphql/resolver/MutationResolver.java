package com.example.graphql.resolver;

import com.example.graphql.model.User;
import com.example.graphql.model.Post;
import com.example.graphql.repository.UserRepository;
import com.example.graphql.repository.PostRepository;
import org.springframework.stereotype.Component;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.Argument;

@Component
public class MutationResolver {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public MutationResolver(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @MutationMapping
    public User createUser(@Argument String name, @Argument String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        return userRepository.save(user);
    }

    @MutationMapping
    public User updateUser(@Argument Long id, @Argument String name, @Argument String email) {
        User user = userRepository.findById(id).orElseThrow();
        if (name != null) user.setName(name);
        if (email != null) user.setEmail(email);
        return userRepository.save(user);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }
}
