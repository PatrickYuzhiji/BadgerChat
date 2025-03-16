# BadgerChat

BadgerChat is my personal React application project built as a chat platform where users can interact in various chatrooms. This project showcases my ability to build a full-featured React app using modern tools and libraries like Vite, React Router, and React Bootstrap.

**This project is inspired and guided by the CS571 course (https://cs571.org/) HW6 , one of the best open source online courses about React and React Native. CS571 @ UW-Madison is co-taught by Cole Nelson and Yaxin Hu.**

When making API requests, you have to apply your own API key ID from https://cs571.org/. A Badger ID (a unique ID representing you) is needed; you can get one by visiting the BadgerAuth Center.

## Features

- **User Authentication:**  
  Users can register, log in, and log out. Authentication is handled by a remote API with proper session management using `sessionStorage` and context.

- **Chatrooms:**  
  Dynamic chatrooms are retrieved from an API, and navigation links to each chatroom are automatically generated.

- **Posting Messages:**  
  Authenticated users can post messages in any chatroom. If a user is not logged in, they will see a prompt telling them to log in before posting.

- **Message Display & Pagination:**  
  Messages are fetched for each chatroom and displayed with pagination (four pages with up to 25 messages per page). The design is responsive using React Bootstrap.

- **User-Specific Controls:**  
  Users can delete only their own posts, with feedback provided for both successful and unsuccessful deletions.

## Technologies Used

- **React:** For building interactive UI components.
- **Vite:** As the fast build tool and development server.
- **React Router:** For managing navigation and routing.
- **React Bootstrap & Bootstrap:** For responsive design and prebuilt UI components.
- **ESLint:** For maintaining code quality and consistency.

## Project Structure

```
.eslintrc.cjs
.gitignore
API_DOCUMENTATION.md
index.html
LICENSE
package.json
README.md
vite.config.js
_figures/
  step1.png
  ...
public/
  vite.svg
src/
  index.css
  main.jsx
  assets/
    react.svg
    uw-crest.svg
  components/
    auth/
      BadgerLogin.jsx
      BadgerLogout.jsx
      BadgerRegister.jsx
    content/
      BadgerChatHome.jsx
      BadgerChatroom.jsx
      BadgerMessage.jsx
      BadgerNoMatch.jsx
    contexts/
      BadgerLoginStatusContext.js
    structural/
      BadgerApp.jsx
      BadgerLayout.jsx
```

- **public/**: Contains static assets including images.
- **src/**: Contains the main codebase.
  - **assets/**: Image and asset files.
  - **components/**: Reusable React components.
    - **auth/**: Authentication-related components.
    - **content/**: Chatroom and message display components.
    - **contexts/**: Context definitions to share login state.
    - **structural/**: Layout and routing components.
  - **main.jsx**: The entry point for the React application.

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/<your-username>/badgerchat.git
   cd badgerchat
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Run the Development Server:**

   ```sh
   npm run dev
   ```

## API Integration

All data for BadgerChat is fetched from a live API at `https://cs571api.cs.wisc.edu/rest/f24/hw6/`. The API covers the following endpoints:

- **Chatrooms:** `GET /chatrooms`
- **Messages:**
  - `GET /messages?chatroom=NAME&page=NUM`
  - `POST /messages?chatroom=NAME`
  - `DELETE /messages?id=ID`
- **User Registration:** `POST /register`
- **User Login:** `POST /login`
- **User Logout:** `POST /logout`
- **Who Am I:** `GET /whoami`

Make sure to include the necessary headers like `X-CS571-ID` and `Content-Type: application/json` (and the `credentials: "include"` option when required).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Inspired and guided by the [CS571 course HW6](README_course.md), and [CS571 course assignment](API_DOCUMENTATION.md).
- Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), and [React Bootstrap](https://react-bootstrap.github.io/).

Enjoy exploring the code and feel free to contribute or reach out for any questions!
