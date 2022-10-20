package com.dxc.forum.service;


import com.dxc.forum.entity.Role;
import com.dxc.forum.entity.User;
import com.dxc.forum.repository.RoleDao;
import com.dxc.forum.repository.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    public User registerNewUser(User user){
        Role role =  roleDao.findById("User").get();

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }
    public User registerNewAdmin(User adminUser){
        Role role = roleDao.findById("Admin").get();

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        adminUser.setRoles(roles);
        adminUser.setUserPassword(getEncodedPassword(adminUser.getUserPassword()));
        return userDao.save(adminUser);
    }
    public List<User> getAll() {
        return (List<User>) this.userDao.findAll();
    }


    @Autowired
    private PasswordEncoder passwordEncoder;


    public void initRolesAndUser(){
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

//        User adminUser = new User();
//        adminUser.setUserFirstName("admin");
//        adminUser.setUserLastName("admin");
//        adminUser.setUserName("admin123");
//        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(adminRole);
//        adminUser.setRoles(adminRoles);
//        userDao.save(adminUser);

    }

    public String getEncodedPassword(String password){
        return passwordEncoder.encode(password);
    }


}
