# User Management API

A production-ready Node.js backend demonstrating Supabase Auth with secure role-based access control. Users can register and log in, while admins can manage all users safely through protected routes. Implements row-level security (RLS) and follows enterprise best practices, making it a real-world showcase for backend skills.

## 🚀 Overview

A production-ready backend built with **Node.js, Express, and Supabase** that implements:

- User authentication with Supabase Auth
- JWT-based protected routes
**- Role-based access control (user / admin)**
- Row-Level Security (RLS) for secure profile access
- Admin-only endpoints via service-role Supabase client

This project demonstrates real-world authentication and authorization patterns used in enterprise apps.

## 🧩 Features
✅ User registration & login with Supabase-managed tokens
✅ Access token validation for protected routes
✅ Admin-only routes for managing users
✅ RLS policies to ensure users can only access their own profiles
✅ Clean separation of clients: user vs admin/service-role

## 🛠️ Installation & Setup
1. Clone the repo:
   
    ```bash
    git clone https://github.com/Kertich/user-management-api
    cd user-management-api
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up ```.env```:

   ```ini
   SUPABASE_URL = your-supabase-url
   SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KELY = your-service-role-key
   ```

4. Start the server:

   ```bash
   npm run dev
   ```
   
 ---  

 ## 🔑 API Endpoints

| Route                | Method | Description                    |
| -------------------- | :------: | ------------------------------ |
| `/api/auth/register` | POST   | Create a new user              |
| `/api/auth/login`    | POST   | Login and get access token     |
| `/api/admin/users`   | GET    | Admin-only route to list users |

---

##🧹 Cleanup / Project Status

  - All custom JWTs and bcrypt login removed
  - RLS policies fixed to prevent recursion
  - Roles enforced safely via admin client
  - Logs and debug code cleaned up
  - Fully production-ready and GitHub-ready

---

##💡 Why This Project Matters
This project shows enterprise-grade backend skills:
- Real-world authentication and authorization
- Supabase RLS best practices
- Admin/user role separation
- Secure API development
Perfect for ***portfolios, interviews, or starting real projects.***

