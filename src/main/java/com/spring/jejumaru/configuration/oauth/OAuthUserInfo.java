package com.spring.jejumaru.configuration.oauth;

public interface OAuthUserInfo {
	String getProviderId();
	String getProvider();
	String getEmail();
	String getName();
}
