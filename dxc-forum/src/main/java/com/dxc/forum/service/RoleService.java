package com.dxc.forum.service;


import com.dxc.forum.entity.Role;
import com.dxc.forum.repository.RoleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role){
       return roleDao.save(role);
    }
}
