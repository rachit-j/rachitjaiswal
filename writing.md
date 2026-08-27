---
layout: page
title: Writing
kicker: ENGINEERING NOTES + ARCHIVE
description: Notes on infrastructure, deployment, and the decisions around building technical systems.
permalink: /writing/
---

{% assign selected_posts = site.posts | where_exp: 'post', "post.title == 'Terraform Vs Ansible' or post.title == 'Some CORS and DotENV Notes' or post.title == 'Nginx Error - could not build the server_names_hash'" %}
{% assign archived_posts = site.posts | where_exp: 'post', "post.title != 'Terraform Vs Ansible' and post.title != 'Some CORS and DotENV Notes' and post.title != 'Nginx Error - could not build the server_names_hash'" %}
<section class="writing-section" aria-labelledby="writing-list-heading"><div class="section-heading"><p class="eyebrow">ENGINEERING NOTES</p><h2 id="writing-list-heading">Selected notes</h2></div><div class="writing-list writing-list--full">{% for post in selected_posts %}<a href="{{ post.url | relative_url }}"><span>{{ post.date | date: '%b %Y' }}</span><strong>{{ post.title }}</strong><span>{% if post.tags %}{{ post.tags | join: ' · ' }}{% endif %}</span><span aria-hidden="true">↗</span></a>{% endfor %}</div></section>
<section class="writing-section archive-writing" aria-labelledby="writing-archive-heading"><div class="section-heading"><p class="eyebrow">ARCHIVE / OPERATIONAL DOCUMENTATION</p><h2 id="writing-archive-heading">Historical notes</h2><p class="section-heading__copy">These posts are retained for context; platform-specific instructions may no longer reflect current versions.</p></div><div class="writing-list writing-list--full">{% for post in archived_posts %}<a href="{{ post.url | relative_url }}"><span>{{ post.date | date: '%b %Y' }}</span><strong>{{ post.title }}</strong><span>{% if post.tags %}{{ post.tags | join: ' · ' }}{% endif %}</span><span aria-hidden="true">↗</span></a>{% endfor %}</div></section>
