# Chat UI

## Description

A modern, responsive messaging interface. Features a sidebar for the contact list and a main chat window. Built using HTML, CSS, and basic JavaScript to append new messages.

## Features

- Flexbox layout differentiating `.received` and `.sent` messages (left vs right alignment)
- Distinct styling for message bubbles mimicking modern chat apps (iMessage/Messenger)
- Fixed header and footer (input area) with a scrollable central message history
- JavaScript functionality to type and send messages to the DOM with dynamic timestamps

## Technologies

- HTML5
- CSS3 (Flexbox, `overflow-y: auto`)
- JavaScript (DOM manipulation, Date formatting)

## How to Run

Open `index.html` in a web browser. Type a message in the input field and hit enter (or click the send icon) to see it appear in the chat.

## What I Learned

- Structuring a web app with a fixed height (`100vh`) and using `overflow-y: auto` to make only specific interior containers scrollable.
- Using CSS Flexbox `align-self: flex-end` and `flex-direction: row-reverse` to effortlessly mirror the layout for sent messages compared to received messages.
- Programmatically creating DOM elements and appending them, then automatically scrolling the container to the bottom using `scrollTop = scrollHeight`.
