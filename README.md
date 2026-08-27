# Rachit Jaiswal — portfolio

This repository contains the source for [rachitjaiswal.com](https://rachitjaiswal.com), a static portfolio and writing site built with Jekyll.

## Local development

Prerequisites: a Ruby/Bundler environment compatible with the locked gems and Node.js after the redesign asset pipeline is added.

```sh
bundle install
bundle exec jekyll serve
```

Jekyll serves the site locally and prints its URL in the terminal. Build a production site with:

```sh
bundle exec jekyll build
```

The redesign introduces a Node-managed CSS/JavaScript build. When `package.json` is present, install and build those assets first using its documented scripts, then run Jekyll:

```sh
npm install
npm run build
bundle exec jekyll build
```

## Content and URLs

Project, experience, education, and site-wide content is being migrated to Jekyll data files so repeated content has one source of truth. Existing project and writing URLs are preserved; legacy navigation paths redirect to their new equivalents where applicable.

Facts not supported by repository material are intentionally marked `TODO: VERIFY` during the redesign rather than inferred.

## Deployment

The production workflow is intended to build Node assets before running Jekyll and publishing the resulting static site. The repository retains `CNAME` for the custom domain. Deployment workflow details will be added with the asset pipeline.

## Working conventions

See [AGENTS.md](AGENTS.md) for branch, content, build, and quality expectations. The root [plan.md](plan.md) is user-owned planning input and must not be edited or committed without explicit permission.
