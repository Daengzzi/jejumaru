package com.spring.jejumaru.payload.request;

import java.util.List;

public class SignOutRequest {
    private List<Integer> mno;

    public List<Integer> getMno() {
        return mno;
    }

    public void setMno(List<Integer> mno) {
        this.mno = mno;
    }
}
