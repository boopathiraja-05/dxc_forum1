package com.dxc.forum.service;


import com.dxc.forum.entity.JwtRequest;
import com.dxc.forum.entity.JwtResponse;
import com.dxc.forum.entity.User;
import com.dxc.forum.repository.UserDao;
import com.dxc.forum.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception{
       String userName =  jwtRequest.getUserName();
       String userPassword = jwtRequest.getUserPassword();
       authenticate(userName,userPassword);

     final UserDetails userDetails = loadUserByUsername(userName);

     String newGeneratedToken = jwtUtil.generateToken(userDetails);

    User user =  userDao.findById(userName).get();

    return new JwtResponse(user, newGeneratedToken);

    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user =  userDao.findById(username).get();
       if (user != null){
           return new org.springframework.security.core.userdetails.User(
                   user.getUserName(),
                   user.getUserPassword(),
                   getAuthorities(user)

           );
       }else {
            throw new UsernameNotFoundException("Username is not valid");

       }
    }

    private Set getAuthorities(User user){
        Set authorities = new HashSet();

        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        });

        return authorities;
    }

    private void authenticate(String userName, String userPassword) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        }catch (DisabledException e){
            System.out.println("User is disabled");
        }catch (BadCredentialsException e){
            System.out.println("Bad Credentials from user");
        }

    }

}
