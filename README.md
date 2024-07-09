# Real-Time Online Coding Web

This application enables mentors and students to collaborate remotely. Mentors share code blocks in read-only mode, while students can make real-time changes. Features include role management, student counts, solution verification, syntax highlighting, code synchronization using Socket.IO, and a lobby page for code block selection.

## Features

- Role Management: The first user to join a room is assigned the mentor role; others are students.
- Real-Time Code Collaboration: Code changes are broadcast to all participants in the room.
- Student Count: Displays the number of students currently in the room.
- Solution Verification: Automatically checks if the submitted code matches the correct solution.
- Mentor Handling: If the mentor leaves the room, all students are redirected to the lobby.

## Technologies Used

- Frontend: React, Ace Editor
- Backend: Node.js, Express, Socket.IO
- Database: MongoDB

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/OmerCS8/RealTime-Mentorship-App.git
   ```
2. Install server dependencies:
   ```
   cd server
   npm install
   ```
3. Install client dependencies:
   ```
   cd client
   npm install
   ```
4. Start the server:
   ```
   cd server
   node server.js
   ```
5. Start the client:

   ```
   cd client
   npm start
   ```

6. Open your browser and visit http://localhost:3000 to access the application.

## Deployment

The application is deployed on Railway. You can access the deployed app at `App-Url`.
