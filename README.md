# TODO App — React + Vite

A clean, full-featured TODO application built with React.

## Features

- ✅ Add / toggle / delete / edit todos (double-click to edit)
- 🔍 Filter by All / Active / Completed
- 🧹 Clear completed, live counts
- 💾 Persists to `localStorage`
- 📱 Responsive, modern UI
- 🚀 Ready for GitHub Pages via Actions

## Components

```
src/
  App.jsx                  # state + composition + filtering
  components/
    TodoForm.jsx           # new-task input
    TodoList.jsx           # list + empty state
    TodoItem.jsx           # checkbox, edit, delete
    TodoFilter.jsx         # filter tabs + counts + clear
  hooks/
    useTodos.js            # CRUD + localStorage sync
  App.css / index.css      # styling
```

## Run locally

```bash
cd todo-app
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview production build
```

## Push to GitHub (repo root = this `todo-app/` folder)

This folder is already a git repo with an initial commit.

```bash
cd todo-app
# 1. Create an empty repo on github.com (no README), e.g. <user>/todo-app
# 2. Then:
git remote add origin https://github.com/<user>/todo-app.git
git branch -M main
git push -u origin main
```

Or with SSH:

```bash
git remote add origin git@github.com:<user>/todo-app.git
git branch -M main
git push -u origin main
```

## Enable GitHub Pages (free hosting)

1. Push to `main` as above.
2. On GitHub: repo **Settings → Pages → Source: GitHub Actions**.
3. The included workflow `.github/workflows/deploy.yml` builds `dist/` and deploys automatically on every push to `main`.
4. Your URL will be `https://<user>.github.io/todo-app/`.

> `vite.config.js` uses `base: './'` so assets work on both Pages project sites and custom domains.
