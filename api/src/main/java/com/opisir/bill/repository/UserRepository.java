package com.opisir.bill.repository;

import com.opisir.bill.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @Auther: dingjn
 * @Desc:
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findFirstById(Long id);
    User findFirstByOpenid(String openid);
}
