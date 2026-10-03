---
title: Some CORS and DotENV Notes
description: "Notes from a 2024 classroom deployment project on CORS configuration and environment variables."
toc: true
layout: post
tags:
  - Rift
  - AWS
  - Teaching
project_tag: rift

excerpt: >-
  Notes from a 2024 classroom deployment project on CORS configuration and environment variables.
archive_notice: true
nav: notebook
---

Cross origin resource sharing, or cors, is something that configures security for requests with additional headers and can restrict what kind of requests and where the requests come from.

Here is how you configure them in your backend:


In SecurityConfig.java:
```java
                .authorizeHttpRequests(auth -> auth // set which endpoints need authentication
					.requestMatchers("/authenticate").permitAll() // okay
					.requestMatchers("/mvc/person/update/**", "/mvc/person/delete/**").authenticated() // needs auth
					.requestMatchers("/api/person/**").authenticated() // needs auth
					.requestMatchers("/**").permitAll() // everything except for the specified above does not need auth
				)
				// support cors
				.cors(Customizer.withDefaults())
				.headers(headers -> headers
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true")) // headers
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-ExposedHeaders", "*", "Authorization")) // allow exposed headers
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers", "Content-Type", "Authorization", "x-csrf-token")) // more headers
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-MaxAge", "600")) // Time for headers until they expire
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS", "HEAD")) // Methods that can go to the server
					.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "https://nighthawkcoders.github.io", "http://localhost:4000", "*")) // Locaitons that can send and recieve requests to the backend
				)

```


Sick of your API Keys being exposed in your code? Sick of them being placed in github? Sick of them being accessable on the web? DotENV can change that!

Simply put your keys with a name in a .env file. For historical discussion of integration with Spring Boot, see [DotENV and Spring Boot](https://stackoverflow.com/questions/58549361/using-dotenv-files-with-spring-boot).

