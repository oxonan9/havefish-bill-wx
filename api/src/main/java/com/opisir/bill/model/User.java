package com.opisir.bill.model;

import lombok.*;

import javax.persistence.*;

/**
 * @Auther: dingjn
 * @Desc:
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String openid;
    private String nickname;
    private String avatar;
}
