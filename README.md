# Maruti Solutions Website

A modern, responsive website for Maruti Solutions built with React, Vite, and TailwindCSS.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maruti-solutions
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

## 🛠 Tech Stack

- React 18
- Vite 6
- TailwindCSS
- Framer Motion
- React Three Fiber
- React Router DOM

## 📦 Project Structure

```
maruti-solutions/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Page components
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Root component
│   └── main.jsx     # Entry point
├── index.html
└── package.json
```

## 🚀 Deployment

This project is configured for easy deployment on various platforms:

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect it's a Vite project and configure the build settings

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `build` directory

3. Deploy the contents of the `build` directory to your hosting provider

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_GOOGLE_SHEETS_URL=your_google_sheets_url
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For support, email info@marutisolutions.in or visit our website.