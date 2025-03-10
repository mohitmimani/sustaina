# Sustaina: AI-powered Waste Management and Sustainability Tracking Platform

## Overview

Sustaina is an AI-powered platform designed to optimize waste management and track sustainability efforts. Our platform leverages advanced machine learning algorithms to provide actionable insights, helping organizations and consumers reduce waste, improve recycling rates, and achieve their sustainability goals.

Sustaina aligns with UN SDG 12: Responsible Consumption and Production, promoting sustainable habits without requiring users to manually track their consumption. The platform uses AI-driven automation, WhatsApp/Telegram notifications, voice-based consumption logging, and a web dashboard for advanced analytics.

This is our hackathon project for GDG 2025.

## How Sustaina Works

1️⃣ **Automated Purchase Tracking (Seamless Integration with Partnered Stores)**

- When a user shops at partnered marts or supermarkets, the store’s POS system automatically sends the receipt data to Sustaina.
- The AI extracts key product details:
  - 🏷 Product Name
  - 🏭 Manufacturer
  - ⏳ Expiry Date (if applicable)
  - 🔢 Quantity Purchased
  - 💰 Price (optional for spending insights)
- Users instantly receive a WhatsApp/Telegram message confirming the tracked purchase—no manual input required.

2️⃣ **Expiry Tracking & Smart Reminders**

- AI monitors expiry dates and notifies users in advance via chat apps.
- Reminders include:
  - ⚡ Urgent alerts: “Your milk expires in 2 days. Use it soon!”
  - 📅 Weekly summaries: “5 items are expiring this week. Check your fridge!”

3️⃣ **AI-Powered Consumption Logging (Voice & Text Input)**

- Users can confirm product usage by simply responding via voice or text.
- Example: If a user says “I finished the bread”, the system removes it from tracking.
- AI can suggest recipes based on expiring items to encourage usage before waste.

4️⃣ **Manual Receipt Scanning (For Non-Partnered Stores)**

- If a user shops at a non-integrated store, they can scan/upload their receipt manually.
- AI-powered OCR extracts product details and adds them to their waste tracking history.

5️⃣ **Web Dashboard (Sustainability & Waste Insights)**

- Users can log in to a web-based dashboard to view:
  - 📊 Waste reduction insights (“You saved 10kg of food waste this month!”)
  - 📈 Consumption habits tracking (“You buy 5 dairy products per week”)
  - 🔄 Recycling & sustainable disposal suggestions
- Businesses can track sustainability impact and get insights into waste trends.

## Key Features of Sustaina

- ✅ Automatic Receipt Integration (No manual entry for partnered stores)
- ✅ WhatsApp/Telegram Notifications (No need to install an app)
- ✅ Expiry Tracking & AI Suggestions (Reduces food & product waste)
- ✅ Voice-Based Logging (Easy tracking via chat)
- ✅ Manual Receipt Scanning (For non-partnered purchases)
- ✅ Sustainability Analytics Dashboard (Track waste & habits)

## Why Sustaina?

Sustaina removes the friction of waste tracking by automating the entire process. Users effortlessly track purchases, receive expiry reminders, and reduce waste—all through a simple AI-powered system integrated with their daily shopping habits.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohitmimani/sustaina.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sustaina
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the application:
   ```bash
   npm run dev
   ```
2. Access the platform through your web browser at `http://localhost:3000`.
