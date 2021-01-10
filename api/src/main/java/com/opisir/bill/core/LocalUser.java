package com.opisir.bill.core;

import com.opisir.bill.model.User;

/**
 * @Auther: dingjn
 * @Desc:
 */
public class LocalUser {

    private static ThreadLocal<User> threadLocal = new ThreadLocal();

    public static void set(User user) {
        threadLocal.set(user);
    }

    public static Long getUserId() {
        if (getUser() != null) {
            return getUser().getId();
        }
        return 0L;
    }

    public static User getUser() {
        return threadLocal.get();
    }

    public static void clear() {
        threadLocal.remove();
    }
}
