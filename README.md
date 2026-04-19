# MediStore Frontend - Pharmacy E-Commerce & Management System

## 1. Introduction

This project is the frontend of a pharmacy e-commerce and management system, built using ReactJS and TypeScript.

The application provides a responsive and user-friendly interface for both customers and administrators to interact with the system, including browsing products, placing orders, and managing data through API integration with the backend.

The frontend is designed as a Single Page Application (SPA) to ensure smooth user experience and efficient data handling.

---

## 2. Features

- User Interface
  - Responsive design for multiple screen sizes
  - Clean and intuitive user experience

- Authentication
  - Login and registration
  - JWT-based authentication integration

- Product Browsing
  - View product list and details
  - Search and filter functionality

- Cart and Checkout
  - Add/remove items from cart
  - Multi-step checkout (shipping, payment, review)

- Order Management
  - View order history
  - Track order status

- Admin Features
  - Manage products and inventory
  - View and manage orders

---

## 3. Technology Stack

- Frontend: ReactJS, TypeScript
- Styling: CSS / Responsive UI
- State Management: React state & props (custom state reuse)
- API Communication: REST API (Axios / Fetch)
- Routing: React Router
- Deployment: Vercel

---

## 4. Project Status

This project is currently under active development and continuous improvement.

Core features such as authentication, product browsing, cart, and checkout have been implemented. Additional improvements are being made to enhance performance, user experience, and scalability.

---

## 5. Planned Features

- Improved UI/UX design and animations
- Advanced filtering and search optimization
- State management optimization (global state handling)
- Error handling and loading states improvement
- Integration with real-time updates (WebSocket)
- Performance optimization and code splitting
- Unit testing

---

## 6. System Architecture

The frontend follows a component-based architecture:

- Components: Reusable UI components
- Pages: Main application views
- Services: API communication layer
- Routing: Navigation between pages

This structure improves reusability, maintainability, and scalability.

---

## 7. API Integration

The frontend communicates with the backend via RESTful APIs.

Key integrations include:
- Authentication APIs
- Product APIs
- Order APIs
- User APIs

Data is fetched and managed efficiently to reduce redundant API calls and improve responsiveness.

---

## 8. Installation and Setup (Local)

### 8.1 Requirements

- Node.js (v16 or later)
- npm or yarn

---

### 8.2 Clone the repository

```bash
git clone https://github.com/thvy815/MediStore_Frontend.git
cd MediStore_Frontend
```

8.3 Install dependencies

```bash
npm install
```

8.4 Configure environment variables

Create a .env file:

```bash
VITE_API_URL=http://localhost:8080
```

8.5 Run the application

```bash
npm run dev
```

8.6 Application runs at

http://localhost:5173

9. Deployment

The frontend is deployed on Vercel and connected to the backend API hosted on Render.

10. Notes

Some features are currently under development or planned for future implementation. The project is continuously being improved as part of learning and real-world system development practice.

This project was developed as part of a team-based academic project in a Software Engineering course.

It demonstrates practical experience in building a real-world frontend application, focusing on UI/UX design, API integration, and system interaction. The project emphasizes collaboration, problem-solving, and applying theoretical knowledge to real-world scenarios.
