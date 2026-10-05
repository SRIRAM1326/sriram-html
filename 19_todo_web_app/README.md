# To-Do Web App

## Description

A fully functional, persistent task management application. Users can add, edit, delete, and mark tasks as complete. Features built-in text search and status filtering.

## Features

- **Local Storage Persistence**: Data remains even after refreshing or closing the browser.
- **Filtering**: View All, Active, or Completed tasks.
- **Live Search**: Instantly filter tasks by typing in the search bar.
- **Editing**: Dedicated modal for editing existing tasks.
- **Counters**: Automatically tracks how many active tasks remain.
- Custom styled checkboxes.

## Technologies

- HTML5
- CSS3
- JavaScript (DOM, Array Methods, LocalStorage)

## How to Run

Open `index.html` in a web browser. Add a task to see it save locally.

## What I Learned

- Complex state management in Vanilla JS using a central `todos` array and a `renderTodos()` function that syncs the UI to the data.
- Persisting array data using `JSON.stringify` into `localStorage` and retrieving it via `JSON.parse`.
- Designing custom checkboxes by visually hiding the default HTML input and styling a sibling `span` element based on the `:checked` pseudo-class.
