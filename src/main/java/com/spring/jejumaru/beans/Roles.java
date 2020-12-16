package com.spring.jejumaru.beans;

import javax.persistence.*;

@Entity
public class Roles {
    @Id
    private int roleno;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleType rolename;

    public Roles() {

    }

    public Roles(RoleType rolename) {
        this.rolename = rolename;
    }

    public int getRoleno() {
        return roleno;
    }

    public void setRoleno(int roleno) {
        this.roleno = roleno;
    }

    public RoleType getRolename() {
        return rolename;
    }

    public void setRolename(RoleType rolename) {
        this.rolename = rolename;
    }
}
