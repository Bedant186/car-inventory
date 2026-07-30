# AI Interaction History & Prompt Log

This document records the prompts and interactions with AI tools (Gemini, ChatGPT, and GitHub Copilot) during the development of the **Car Dealership Inventory System**.

---

## Phase 1: Architecture, Setup & Backend TDD

### Prompt 1: Project Setup & Testing Boilerplate
* **Tool:** Gemini
* **Prompt:**
  > "I'm building a Car Dealership Inventory System using Node.js, Express, TypeScript, and MongoDB/Prisma using TDD (Red-Green-Refactor). Can you generate the initial project structure, TypeScript configuration, and Jest setup for API testing?"
* **Generated Response & Usage:**
  * Gemini provided standard `tsconfig.json`, `jest.config.js`, and basic directory layout.
  * Used as the foundational commit for the repository.

---

### Prompt 2: TDD Authentication (JWT & Middleware)
* **Tool:** ChatGPT
* **Prompt:**
  > "Write failing unit tests using Jest/Supertest for a JWT auth endpoint in Express (register, login, route protection). Follow TDD rules: test registration validation, password hashing with bcrypt, and token payload."
* **Generated Response & Usage:**
  * Used test cases to commit failing tests (`test(auth)`), then implemented `authController` and `authMiddleware` to turn them green (`feat(auth): implement JWT authentication`, `feat(auth): protect API routes using JWT middleware`).

---

### Prompt 3: TDD Vehicle Management Endpoints
* **Tool:** Gemini & VS Code Copilot
* **Prompt (Gemini):**
  > "Generate Jest tests for vehicle endpoints: POST /api/vehicles (create), GET /api/vehicles/search (filters make, model, price range), POST /api/vehicles/:id/purchase (atomic decrement stock), and DELETE /api/vehicles/:id (admin check)."
* **Prompt (GitHub Copilot):**
  > `// inline copilot suggestion: write mongoose query for searching vehicles by dynamic search terms and price ranges`
* **Generated Response & Usage:**
  * Gemini created test assertions for TDD cycles (`test(vehicle): add failing vehicle creation tests`).
  * Copilot auto-completed search query sanitization syntax inside the vehicle service layer.

---

## Phase 2: Frontend Implementation (React, Tailwind, Context API)

### Prompt 4: Authentication Context & Routing
* **Tool:** ChatGPT
* **Prompt:**
  > "How do I setup a React AuthContext in TypeScript to persist JWT tokens in localStorage, track logged-in user role (Admin vs User), and protect frontend routes?"
* **Generated Response & Usage:**
  * Boilerplate used to implement `AuthContext.tsx` and private routing components (`feat(ui): implement authentication context`).

---

### Prompt 5: Vehicle Dashboard & Search UI
* **Tool:** Gemini
* **Prompt:**
  > "Design a responsive React component using Tailwind CSS for a vehicle dashboard. Include search inputs (make, model, category, price range) and dynamic card displays with stock badges and 'Purchase' buttons that automatically disable when stock reaches zero."
* **Generated Response & Usage:**
  * Adapted Gemini's Tailwind layout for vehicle card grids and filter panels (`feat(ui): implement vehicle dashboard`, `feat(ui): implement vehicle search and filters`).

---

### Prompt 6: Frontend Testing
* **Tool:** GitHub Copilot & ChatGPT
* **Prompt (ChatGPT):**
  > "Provide React Testing Library tests for testing the Purchase button behavior (checking if API call fires when stock > 0, and button is disabled when quantity = 0)."
* **Generated Response & Usage:**
  * Added frontend unit tests for component rendering and interaction (`test(ui): add frontend component tests`).

---

## Phase 3: Deployment & Build Configuration

### Prompt 7: Build Fixes & Script Tweaks
* **Tool:** VS Code Copilot
* **Prompt:**
  > "Fix TypeScript build errors for express Request interface extension containing user payload."
* **Generated Response & Usage:**
  * Provided type extension declaration for express request object (`fix: add backend build configuration`).
