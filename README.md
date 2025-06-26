# Donation Platform

A modern, secure donation platform built with SvelteKit that enables users to discover and support meaningful projects through M-Pesa payments. The platform features a clean, responsive design and comprehensive admin dashboard for project and donation management.

##  Features

### For Donors

- **Project Discovery**: Browse and search through curated projects with filtering and sorting options
- **Secure Donations**: Make donations via M-Pesa integration with real-time payment processing
- **Anonymous Donations**: Option to donate anonymously for privacy
- **Impact Tracking**: View project progress and funding goals
- **Responsive Design**: Optimized for desktop and mobile devices

### For Administrators

- **Project Management**: Create, edit, and manage donation projects
- **Donation Tracking**: Monitor all donations with detailed analytics
- **Admin Dashboard**: Comprehensive overview of platform activity
- **Secure Authentication**: Protected admin area with bcrypt password hashing

### Technical Features

- **M-Pesa Integration**: Full STK Push integration for seamless mobile payments
- **SQLite Database**: Lightweight, reliable data storage
- **Real-time Updates**: Live project progress tracking
- **Security**: Secure payment processing and data protection
- **Modern UI**: Built with Tailwind CSS for beautiful, responsive design

##  Tech Stack

- **Frontend**: SvelteKit 2.x, TypeScript, Tailwind CSS 4.x
- **Backend**: SvelteKit API routes, Node.js
- **Database**: SQLite with sqlite3
- **Payments**: M-Pesa Daraja API integration
- **Authentication**: bcrypt for password hashing
- **Styling**: Tailwind CSS with custom design system
- **Development**: Vite, ESLint, Prettier

##  Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn
- M-Pesa Developer Account (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ombima56/donation-platform.git
   cd donation-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL=donation-platform.db

   # M-Pesa Configuration
   MPESA_CONSUMER_KEY=your_consumer_key
   MPESA_CONSUMER_SECRET=your_consumer_secret
   MPESA_SHORTCODE=your_shortcode
   MPESA_PASSKEY=your_passkey
   MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa-callback

   # Session Secret
   SESSION_SECRET=your_session_secret
   ```

4. **Initialize Database & Admin User**

   ```bash
   npm run seed-admin
   ```

   This creates an admin user with:

   - Email: `admin@example.com`
   - Password: `admin123` (change this immediately!)

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   npm run dev -- --open
   ```

## M-Pesa Integration

The platform integrates with Safaricom's M-Pesa Daraja API for payment processing:

- **STK Push**: Initiates payment requests directly to user's phone
- **Callback Handling**: Processes payment confirmations and updates
- **Transaction Tracking**: Stores M-Pesa receipt numbers and transaction details
- **Error Handling**: Comprehensive error handling for failed transactions

### M-Pesa Setup

1. Register at [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an app and obtain credentials
3. Configure your callback URL
4. Add credentials to your `.env` file

##  Database Schema

The platform uses SQLite with the following main tables:

- **projects**: Store donation projects with goals and descriptions
- **donations**: Track all donations with M-Pesa integration
- **admin_users**: Manage admin authentication

##  UI/UX Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Toast Notifications**: Real-time feedback for user actions

##  Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type checking
npm run lint         # Lint code
npm run format       # Format code
npm run seed-admin   # Create admin user
```

### Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── server/        # Server-side utilities
│   └── types.ts       # TypeScript type definitions
├── routes/
│   ├── admin/         # Admin dashboard routes
│   ├── api/           # API endpoints
│   ├── donate/        # Donation flow pages
│   ├── projects/      # Project listing and details
│   └── +page.svelte   # Homepage
└── app.html           # HTML template
```

##  Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Configure Environment Variables**
   Set up production environment variables on your hosting platform

3. **Database Setup**
   Ensure SQLite database is properly initialized in production

4. **Deploy**
   The app can be deployed to any Node.js hosting platform (Vercel, Netlify, Railway, etc.)

##  Security

- **Password Hashing**: Admin passwords secured with bcrypt
- **Environment Variables**: Sensitive data stored in environment variables
- **HTTPS Required**: M-Pesa callbacks require HTTPS endpoints
- **Input Validation**: Server-side validation for all user inputs
- **Anonymous Donations**: Option to protect donor privacy

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
