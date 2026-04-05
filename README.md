  # PocketTrack Pro – Simple and Effective Finance Dashboard

## About the Project

This is a small finance dashboard I built using React. The idea was to create a clean and simple interface where users can track their income and expenses and get a quick overview of their financial situation. I have added visual graph for more usablility and efficent application.

I focused more on usability and layout rather than making it overly complex.

---

## What it does

### Dashboard

* Shows profile health, total balance, income, and expenses
* Also includes a savings rate just to give a quick idea of financial health

### Charts

* Line chart to show how money is changing over time
* Pie chart to show where money is being spent
* Bar chart to compare income vs expenses

---

### Transactions

* List of all transactions with date, category, type, and amount
* You can search transactions by category
* If no data is available, it handles that case properly

---

### Roles (basic simulation)

* Viewer -> can only see data
* Admin -> can add and delete transactions

This is just simulated on the frontend using a dropdown.

---

### Dark Mode

* Simple toggle between light and dark mode
* Makes it easier to use in different environments

---

### Data Storage

* Uses localStorage
* Data stays even after refreshing the page

---

## Tech Used

* React (functional components + hooks)
* Recharts for charts
* Basic CSS (inline styles)

---

** Live Demo Link <br>
xyz10-5sbz6jlds-arnesha-1s-projects.vercel.app

## How to Run

1. Clone the project

```bash
git clone <(https://github.com/ARNESHA-1/PocketTrack-Pro)>
cd finance-dashboard
```

2. Install dependencies

```bash
npm install
npm install recharts
```

3. Start the app

```bash
npm run dev
```

4. Open in browser

```
http://localhost:5173
```

---

## How I approached it

I kept everything in a single main component to keep it simple and easy to understand.

State is handled using React hooks:

* Transactions
* Search input
* User role
* Dark mode

I used `useMemo` in a few places to avoid unnecessary recalculations for charts and filtered data.

---

## Design choices

* Used a card layout because it’s easy to scan and analyse
* Kept colors simple and consistent
* Added small hover effects to make it feel more interactive
* Tried to make it responsive without overcomplicating things

---

## What could be improved

* Add edit functionality for transactions
* Better filtering (date range, categories)
* Export data option
* Connect to backend for real data

---

## Final note

This project is mainly focused on frontend structure, UI design, and handling state properly. It’s not meant to be production-ready, but more of a demonstration of how I approach building a dashboard.

* I hope You Enjoyed using #PocketTrack Pro :)

---
