---
layout: post
title: Kasm Security Group Configuration
description: "A historical note on the network ports used by a Kasm deployment."
tags:
  - KasmV2
  - AWS
  - Developer
project_tag: kasmv2

excerpt: >-
  A historical note on the network ports used by a Kasm deployment.
archive_notice: true
nav: notebook
---

<p>Whenever Kasm is launched, the security group needs to allow access to the ports that the Kasm services run on. Here is a screenshot of the ports needed. Make sure to also add the port the Kasm service is running on.</p>

<p><img alt="image" src="https://github.com/nighthawkcoders/kasmv2-ansiblecode/assets/56803677/4562a14d-5fe6-4c84-865d-b498a98da6df" /></p>
