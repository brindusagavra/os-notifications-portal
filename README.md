# OS Notifications Portal

A web-based notification system portal built with Next.js, Tailwind CSS, and TypeScript.

## Features
- **Notification Center**: Real-time alerts for messages, stock updates, and security events.
- **Simulation Tools**: Trigger custom notifications to test the system.
- **User Preferences**: Enable/disable specific notification types in Settings.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer) installed on your machine.

### Installation
1.  Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/YOUR_USERNAME/os-notifications-portal.git
    cd os-notifications-portal
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## How to Use

### 1. The Dashboard
The home page allows you to simulate different events:
- **Simulate New Message**: Opens a modal to send a custom message.
- **Simulate Stock Alert**: Opens a modal to report low stock for a specific item.
- **Simulate Access Request**: Simulates a security alert for a user login.

### 2. Notification Center
Click the **Bell Icon** in the top right to see your notifications.
- **Red Badge**: Shows the number of unread notifications.
- **Mark as Read**: Click the checkmark next to a notification to mark it as read.

### 3. Settings
Click **Go to Settings** or navigate to `/settings`.
- Toggle switches to enable or disable specific notification types.
- **Note**: If you disable a type (e.g., "Stock Alerts"), the corresponding simulation button on the dashboard will be disabled.

