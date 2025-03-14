# GameGuides - Next.js Gaming Walkthrough Website

Welcome to GameGuides, a modern, interactive website for comprehensive video game walkthroughs using Next.js, React, and MongoDB.

## Features

- **Engaging Intro Animations**: Captivating entry animations for each game guide
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Interactive UI Elements**: Smooth scrolling, progress tracking, and dynamic content
- **Animated Transitions**: Enhanced user experience with subtle animations
- **MongoDB Integration**: Backend API for storing and retrieving guide content
- **Modern React Patterns**: Built with the latest React and Next.js best practices

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gameguides-nextjs.git
   cd gameguides-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/walkthroughs
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and database connection
- `/src/models`: MongoDB schema models
- `/src/styles`: Global CSS and animation styles
- `/public`: Static assets (images, videos, etc.)

## Adding New Game Guides

1. Create a new page in `/src/app/guides/[game-name]/page.js`
2. Add the game to the featured guides section in the home page
3. Add relevant images to the `/public/images` directory

## API Routes

- `GET /api/guides`: Fetch all guides
- `POST /api/guides`: Create a new guide
- `GET /api/guides/[id]`: Fetch a specific guide
- `PUT /api/guides/[id]`: Update a guide
- `DELETE /api/guides/[id]`: Delete a guide

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Framer Motion](https://www.framer.com/motion/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.