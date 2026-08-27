---
layout: page
title: Work
kicker: SELECTED PROJECTS + ARCHIVE
description: Systems, AI, robotics, and research work—organized by the problem rather than a technology list.
permalink: /work/
---

{% assign featured_work = site.data.projects | where: 'featured', true %}
{% assign archive_work = site.data.projects | where: 'archived', true %}
<section class="work-section" aria-labelledby="featured-work-heading">
  <div class="work-toolbar"><h2 id="featured-work-heading">Featured work</h2><div class="filter-controls" role="group" aria-label="Filter work" hidden><button class="is-active" type="button" data-filter="all" aria-pressed="true">All</button><button type="button" data-filter="ai" aria-pressed="false">AI</button><button type="button" data-filter="systems" aria-pressed="false">Systems</button><button type="button" data-filter="robotics" aria-pressed="false">Robotics</button><button type="button" data-filter="research" aria-pressed="false">Research</button></div></div><p class="sr-only" aria-live="polite" data-filter-status>All featured and archived work is shown.</p>
  <div class="featured-work" data-project-list>{% for project in featured_work %}{% include project-card.html project=project index=forloop.index %}{% endfor %}</div>
</section>

<section class="work-section archive" aria-labelledby="archive-heading"><div class="section-heading"><p class="eyebrow">EARLIER WORK</p><h2 id="archive-heading">Archive</h2><p class="section-heading__copy">Meaningful earlier projects, preserved in a compact form.</p></div><div class="archive-list">{% for project in archive_work %}{% assign timeframe = project.timeframe | replace: ' – TODO: VERIFY', '' | replace: 'TODO: VERIFY', '' %}<a href="{{ '/projects/' | append: project.slug | append: '/' | relative_url }}" data-project data-categories="{{ project.categories | join: ' ' | downcase }}"><span>{{ timeframe | default: 'Earlier work' }}</span><strong>{{ project.short_title }}</strong><span>{{ project.categories | join: ' · ' }}</span><span aria-hidden="true">→</span></a>{% endfor %}</div></section>
