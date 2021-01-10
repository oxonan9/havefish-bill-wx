package com.opisir.bill.service;

import com.opisir.bill.repository.UserRepository;
import com.opisir.bill.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findFirstById(id);
    }

    public static void main(String[] args) {
        boolean flag= false;
        if(!flag){
            System.out.println("123");
        }else{
            System.out.println("456");
        }
    }
}
