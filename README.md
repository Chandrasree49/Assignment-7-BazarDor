1.Project name-(BazarDor)

2.Short description:BazarDor is a modern, dynamic, and responsive web application that provides reliable information on the daily market prices of essential commodities in Bangladesh, price fluctuations, and detailed market-based analysis of major wholesale and retail markets across the country.
The main goal of this platform is to deliver accurate information about price changes in various market commodities to buyers and sellers in simple and fluent Bengali. Users can explore the national average, minimum, and maximum prices, along with historical price trends for essential commodities such as rice, lentils, oil, vegetables, fish, and meat.

3.Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- BetterAuth
- React Hot Toast
- Hind Siliguri

4.5 Key Features of BazarDor
1. Live Price Ticker & Category Navigation
- An infinite scrolling marquee strip at the top of the website that displays each product’s emoji, name, current price, and percentage price change (▲/▼) in real time.
- An attractive logo featuring the Bengali date, along with a navigation bar that highlights the active category.
2. Top Price Risers, Fallers & Responsive Product Grid
- Today's Price Risers ▲: Highlights the top six products with the largest price increases in the market using distinctive red badges.
- Today's Price Fallers ▼: Highlights the top six products with the largest price decreases using distinctive green badges.
- All Products Grid: A fully responsive grid layout for mobile, tablet, and desktop screens, displaying product prices in Bengali numerals.
3. Protected Product Details & Market-Based Price Breakdown
- Product detail pages are protected routes. If a user is not signed in, a toast notification appears automatically, and the user is redirected to the sign-in page.
- Summary cards displaying national minimum, maximum, and average prices.
- Comparative price analysis covering yesterday, last week, and last month.
- Market-specific price listings for eight regional markets, including Karwan Bazar, Green Market, and Amtali Bazar, with filtering options by division.
4. Smart Numeric Sorting & Search (C1)
- A dropdown on category pages for sorting products by their actual numerical prices:
  - Default
  - Price: Low to High
  - Price: High to Low
- Ensures accurate sorting based on actual numerical values rather than string comparisons.
5. Complete Authentication & Profile Update (Better Auth & C3)
- Email/password authentication and social login with Google and GitHub.
- Automatic redirection to the sign-in page after registration.
- A profile view and a C3 – Update Information page that allows users to easily update their names.
- A custom, 4MD-friendly 404 error page and skeleton loaders for data loading states.



