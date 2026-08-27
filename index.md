---
layout: home
title: Rachit Jaiswal — AI, robotics, and systems
description: Technical work across AI, robotics, systems, and research.
---

{% assign profile = site.data.site %}
{% assign featured_work = site.data.projects | where: 'featured', true %}
{% assign featured_experience = site.data.experience | where: 'featured', true %}
<section class="hero site-shell" aria-labelledby="hero-title">
  <p class="eyebrow hero__eyebrow" data-hero-item>AI / ROBOTICS / SYSTEMS</p>
  <h1 id="hero-title" class="hero__name" data-hero-name><span>Rachit</span><span>Jaiswal</span></h1>
  <div class="hero__statement" data-hero-item><p>{{ profile.hero_statement }}</p><a href="#selected-work">Explore selected work <span aria-hidden="true">↓</span></a></div>
</section>

<section id="selected-work" class="site-shell home-section" aria-labelledby="selected-work-title">
  {% include section-heading.html kicker="01 / SELECTED WORK" title="Work that connects research, systems, and the real world." id="selected-work-title" %}
  <div class="featured-work">
    {% for project in featured_work %}{% include project-card.html project=project index=forloop.index %}{% endfor %}
  </div>
  <a class="text-link" href="{{ '/work/' | relative_url }}">View all work <span aria-hidden="true">→</span></a>
</section>

<section class="site-shell home-section" aria-labelledby="experience-title">
  {% include section-heading.html kicker="02 / EXPERIENCE + RESEARCH" title="A practice shaped by teams, experiments, and deployment." id="experience-title" %}
  <div class="experience-list">{% for item in featured_experience %}{% include experience-row.html item=item %}{% endfor %}</div>
  <p class="verification-note">Selected dates and current status are being verified.</p>
</section>

<section class="site-shell home-section capabilities" aria-labelledby="capabilities-title">
  {% include section-heading.html kicker="03 / AREAS OF WORK" title="Technical range, applied with context." id="capabilities-title" %}
  <div class="capability-grid">
    <article><p class="eyebrow">01</p><h3>Machine intelligence</h3><p>Computer vision, applied ML, and intelligent systems built to meet real constraints.</p></article>
    <article><p class="eyebrow">02</p><h3>Systems</h3><p>Networking, cloud infrastructure, automation, and dependable computing environments.</p></article>
    <article><p class="eyebrow">03</p><h3>Robotics</h3><p>Perception, autonomy, control, and the practical work of making machines respond reliably.</p></article>
    <article><p class="eyebrow">04</p><h3>Human + computing</h3><p>Interfaces and tools that make complex technical systems more useful to the people around them.</p></article>
  </div>
</section>

<section class="site-shell home-section writing-preview" aria-labelledby="writing-title">
  {% include section-heading.html kicker="04 / SELECTED WRITING" title="Engineering notes, kept useful." id="writing-title" %}
  {% assign selected_posts = site.posts | where_exp: 'post', "post.title == 'Terraform Vs Ansible' or post.title == 'Some CORS and DotENV Notes' or post.title == 'Nginx Error - could not build the server_names_hash'" %}
  <div class="writing-list">{% for post in selected_posts %}<a href="{{ post.url | relative_url }}"><span>{{ post.date | date: '%Y' }}</span><strong>{{ post.title }}</strong><span aria-hidden="true">↗</span></a>{% endfor %}</div>
  <a class="text-link" href="{{ '/writing/' | relative_url }}">Read the writing archive <span aria-hidden="true">→</span></a>
</section>
