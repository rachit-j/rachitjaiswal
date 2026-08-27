---
layout: home
title: Rachit Jaiswal — AI, robotics, and systems
description: Technical work across AI, robotics, systems, and research.
---

{% assign featured_work = site.data.projects | where: 'featured', true %}
{% assign featured_experience = site.data.experience | where: 'featured', true %}
<section class="hero" aria-labelledby="hero-title" data-landing-hero>
  <canvas class="hero__flow-field" data-flow-field aria-hidden="true"></canvas><div class="hero__veil" aria-hidden="true"></div>
  <div class="hero__content site-shell" data-hero-content><h1 id="hero-title" class="hero__identity"><span class="hero__typewriter" data-typewriter aria-hidden="true">I am Rachit Jaiswal</span><span class="hero__cursor" aria-hidden="true">|</span><span class="sr-only">I am Rachit Jaiswal</span></h1><p class="hero__domains">AI <span aria-hidden="true">•</span> Robotics <span aria-hidden="true">•</span> Systems Engineering</p><a class="hero__scroll" href="#selected-work" data-scroll-guide><span class="sr-only">Scroll to selected work</span><span class="hero__scroll-label" aria-hidden="true">Scroll to explore</span><span class="hero__scroll-line" aria-hidden="true"></span></a></div>
</section>

<div class="home-story" data-home-story>
  <svg class="signal-path" viewBox="0 0 2 1000" preserveAspectRatio="none" aria-hidden="true"><path data-signal-path d="M1 0 V1000"/></svg>
  <section id="selected-work" class="work-story site-shell" data-home-section data-signal-stop="work" aria-labelledby="selected-work-title">
    <header class="story-heading"><p>01 / Selected Work</p><h2 id="selected-work-title">Systems made tangible.</h2><span>Scroll to follow the work</span></header>
    <div class="work-sequence" data-work-sequence>{% for project in featured_work %}<article class="feature-project" data-featured-project data-project-index="{{ forloop.index }}"><div class="feature-project__stage" data-project-media><span class="feature-project__number">0{{ forloop.index }}</span><span class="feature-project__domain">{{ project.categories | join: ' / ' }}</span>{% if project.image %}<img src="{{ project.image | relative_url }}" alt="{{ project.title }} mark" loading="lazy">{% endif %}<span class="feature-project__trace" aria-hidden="true"></span></div><div class="feature-project__copy" data-project-copy><p>{{ project.categories | join: ' · ' }}</p><h3>{{ project.short_title }}</h3><p class="feature-project__summary">{{ project.summary }}</p><dl><div><dt>Role</dt><dd>{{ project.role | replace: 'TODO: VERIFY', 'Role details forthcoming' }}</dd></div><div><dt>Context</dt><dd>{{ project.organization }}</dd></div></dl><a href="{{ '/projects/' | append: project.slug | append: '/' | relative_url }}">View project <span aria-hidden="true">→</span></a></div></article>{% endfor %}</div>
    <a class="story-link" href="{{ '/work/' | relative_url }}">All work <span aria-hidden="true">→</span></a>
  </section>

  <section class="experience-story site-shell" data-home-section data-signal-stop="experience" aria-labelledby="experience-title"><header class="story-heading"><p>02 / Experience + Research</p><h2 id="experience-title">A technical path through teams and research.</h2></header><div class="timeline-frame"><svg class="timeline-path" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true"><path data-timeline-path d="M5 0 V100"/></svg><ol class="experience-timeline" data-experience-timeline>{% for item in featured_experience %}<li data-timeline-item><span class="experience-timeline__node" data-timeline-node aria-hidden="true"></span><div data-timeline-copy><p>{{ item.timeframe | replace: ' – TODO: VERIFY', '' }}</p><h3>{{ item.organization }}</h3><strong>{{ item.role }}</strong><span>{{ item.description }}</span></div></li>{% endfor %}</ol></div></section>

  <section class="capability-story site-shell" data-home-section data-signal-stop="capabilities" aria-labelledby="capabilities-title"><p>03 / Areas of work</p><h2 id="capabilities-title"><span>AI</span><span>Robotics</span><span>Systems</span><span>Networks</span><span>HCI</span></h2><div><p>Technical depth in context—not a list of badges.</p><a href="{{ '/about/' | relative_url }}">More about the practice <span aria-hidden="true">→</span></a></div></section>

  <section class="writing-story site-shell" data-home-section data-signal-stop="writing" aria-labelledby="writing-title"><header class="story-heading"><p>04 / Writing</p><h2 id="writing-title">Notes from building.</h2></header>{% assign selected_posts = site.posts | where_exp: 'post', "post.title == 'Terraform Vs Ansible' or post.title == 'Some CORS and DotENV Notes' or post.title == 'Nginx Error - could not build the server_names_hash'" %}<div class="writing-list">{% for post in selected_posts %}<a href="{{ post.url | relative_url }}"><span>{{ post.date | date: '%Y' }}</span><strong>{{ post.title }}</strong><i aria-hidden="true">↗</i></a>{% endfor %}</div></section>

  <section class="home-contact" data-home-section data-signal-stop="contact"><canvas data-contact-field aria-hidden="true"></canvas><div class="site-shell"><p>Signal received.</p><h2>Let’s build something that holds up in the real world.</h2><a href="mailto:{{ site.email }}">{{ site.email }}</a></div></section>
</div>
