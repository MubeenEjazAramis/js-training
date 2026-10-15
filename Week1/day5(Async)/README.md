# Week 1 Day 5: Async JavaScript (GitHub Profile Finder)

Build task for Week 1 Day 5.

## Structure

```
Week1/day5(Async)/
├── index.html     # Root redirect to github-finder app
├── NOTES.md       # Async JavaScript concepts & notes
├── README.md      # Documentation and overview
└── github-finder/
    ├── index.html # Semantic HTML structure
    ├── script.js  # Async/await fetch logic
    └── styles.css # Clean dark theme styling
```

## Features Implemented

- **Search & Input:** Form input and Search button calling `https://api.github.com/users/{username}`.
- **Profile Card:** Displays avatar, name, bio, follower count, public repo count, and a direct profile link.
- **Recent Repositories:** Fetches and displays the user's 5 most recently updated repositories (`repos?sort=updated&per_page=5`).
- **Loading State:** Shows "Loading…" and disables the search button while the request is in progress.
- **Error Handling:** Shows "User not found" for 404 responses and "Something went wrong" for network/server errors.
- **Modern Async Logic:** Uses `async/await` with `try/catch/finally` for clean and readable asynchronous execution.

## How to Run

Open `github-finder/index.html` directly in any browser, or run a local server:

```bash
npx serve "Week1/day5(Async)/github-finder"
```
