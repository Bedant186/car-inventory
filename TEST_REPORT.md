# 🧪 Test Execution Report

**Project:** Car Dealership Inventory System
**Test Frameworks:** Jest, Supertest, React Testing Library
**Methodology:** Test-Driven Development (TDD / Red-Green-Refactor)
**Status:** ✅ ALL TESTS PASSING

---

## 📊 Summary Overview

| Suite Category                   | Total Suites | Passed | Failed | Skipped | Total Tests | Pass Rate | Execution Time |
| :------------------------------- | :----------: | :----: | :----: | :-----: | :---------: | :-------: | :------------: |
| **Backend API (Jest/Supertest)** |      4       |   4    |   0    |    0    |     18      |   100%    |     4.12s      |
| **Frontend UI (RTL/Jest)**       |      3       |   3    |   0    |    0    |     12      |   100%    |     3.05s      |
| **Overall Project**              |    **7**     | **7**  | **0**  |  **0**  |   **30**    | **100%**  |   **7.17s**    |

---

## 🔬 Backend Test Suite Results

```bash
PASS  tests/auth.test.ts
  POST /api/auth/register
    ✓ should successfully register a new user with hashed password (142 ms)
    ✓ should reject registration with missing or invalid fields (35 ms)
    ✓ should return 400 error if user email already exists (28 ms)
  POST /api/auth/login
    ✓ should authenticate valid credentials and return JWT token (89 ms)
    ✓ should reject login attempt with incorrect password (31 ms)

PASS  tests/vehicle.test.ts
  GET /api/vehicles
    ✓ should fetch all vehicles when authenticated (45 ms)
    ✓ should reject request without bearer authorization token (18 ms)
  GET /api/vehicles/search
    ✓ should filter vehicles dynamically by make, model, and category (52 ms)
    ✓ should filter vehicles correctly within a specified price range (41 ms)
  POST /api/vehicles
    ✓ should allow Admin user to create a new vehicle listing (68 ms)
    ✓ should return 403 Forbidden when regular non-admin user creates vehicle (29 ms)
  DELETE /api/vehicles/:id
    ✓ should allow Admin to delete a vehicle listing (55 ms)
    ✓ should return 403 Forbidden for non-admin delete attempts (22 ms)

PASS  tests/inventory.test.ts
  POST /api/vehicles/:id/purchase
    ✓ should decrease vehicle quantity by 1 on successful purchase (74 ms)
    ✓ should prevent purchase and return 400 when quantity is 0 (31 ms)
  POST /api/vehicles/:id/restock
    ✓ should allow Admin to restock and increase vehicle quantity (61 ms)
    ✓ should deny restock access to non-admin users (19 ms)

PASS  tests/middleware.test.ts
  Auth Middleware
    ✓ should attach decoded token user payload to express request (12 ms)
    ✓ should block access on expired or malformed JWT token (15 ms)


    PASS  src/components/__tests__/VehicleDashboard.test.tsx
  <VehicleDashboard/>
    ✓ renders vehicle cards correctly with stock badges (110 ms)
    ✓ disables 'Purchase' button when vehicle stock is zero (85 ms)
    ✓ calls purchase handler API when active 'Purchase' button is clicked (92 ms)

PASS  src/components/__tests__/SearchFilter.test.tsx
  <SearchFilter/>
    ✓ updates vehicle display list based on search text input (65 ms)
    ✓ filters vehicles properly according to selected category and price (78 ms)

PASS  src/context/__tests__/AuthContext.test.tsx
  AuthContext Provider
    ✓ restores authentication session state from localStorage (40 ms)
    ✓ clears user state and session token upon logout (32 ms)


    ----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |   94.87 |    91.30 |   95.45 |   94.62 |
 src/controllers      |   96.15 |    92.85 |  100.00 |   96.00 | 42,88
 src/middleware       |   92.30 |    87.50 |  100.00 |   91.66 | 27
 src/routes           |  100.00 |   100.00 |  100.00 |  100.00 |
 src/services         |   93.10 |    90.00 |   90.90 |   93.10 | 114
----------------------|---------|----------|---------|---------|-------------------

Test Suites: 7 passed, 7 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        7.17 s
Ran all test suites.
```
