# 🎬 Films On Video

A React-based web storefront for browsing, searching, and purchasing movies, powered by Supabase for data storage, authentication, and an admin interface.

---

## 🔍 Table of Contents

- [About](#about)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
  - [1. Clone the repo](#1-clone-the-repo)  
  - [2. Install dependencies](#2-install-dependencies)  
  - [3. Configure environment variables](#3-configure-environment-variables)  
- [Supabase Setup](#supabase-setup)  
  - [Database schema](#database-schema)  
  - [Authentication & Roles](#authentication--roles)  
  - [Row Level Security (RLS)](#row-level-security-rls)  
- [Running the App](#running-the-app)  
- [Admin Interface](#admin-interface)  
- [Helper Scripts](#helper-scripts)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## 📖 About

Films On Video is an online video store allowing customers to:

- Browse regular and adult movie collections  
- Search by title  
- Add movies to a persistent shopping cart  
- Checkout (mocked)  

Admins can sign in to a protected panel to **Create**, **Read**, **Update**, and **Delete** movie records stored in Supabase.

---

## 🛠️ Tech Stack

- **React** (v18+) with Hooks, Context API, React Router v6  
- **Supabase** for:  
  - PostgreSQL database  
  - Authentication (email/password)  
  - Storage (optional for poster uploads)  
- **CSS** (plain CSS modules or external)  
- **React Icons** (FontAwesome)  

---

## ✨ Features

- Public storefront with movie listings, detail pages, and search  
- Persistent cart (`CartContext`) with quantity controls and total price  
- Supabase Auth login for admin users  
- Admin panel at `/admin` to manage movie records  
- Local storage persistence for cart across reloads  
- Promotion script to assign `role: "admin"` metadata to users  

---

## 🚀 Prerequisites

- Node.js v16+  
- npm or Yarn  
- A Supabase project with:  
  - A `Regular_titles` table for movies  
  - Auth enabled  
  - (Optional) A Storage bucket for poster uploads  

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/films-on-video.git
cd films-on-video
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

#### Frontend env (`.env.local`)

Create a file named `.env.local` in the project root:

```bash
REACT_APP_SUPABASE_URL=https://<your-project-ref>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<your-anon-public-key>
```

#### Backend script env (`.env`)

Create a file named `.env` in the project root (for Node scripts):

```bash
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

---

## 🗄️ Supabase Setup

### Database schema

Ensure you have a table named `Regular_titles` with columns at least:

| Column       | Type    | Notes                                         |
|--------------|---------|-----------------------------------------------|
| id           | uuid    | Primary key (default `gen_random_uuid()`)     |
| Title        | text    | Movie title                                   |
| CurrentPrice | numeric | Price per unit                                |
| PosterURL    | text    | URL to poster image                           |

### Authentication & Roles

Promote a user to admin in the SQL Editor:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'::jsonb
)
WHERE id = '<user-uuid>';
```

### Row Level Security (RLS)

```sql
ALTER TABLE public."Regular_titles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read"
  ON public."Regular_titles"
  FOR SELECT
  USING ((current_setting('request.jwt.claims', true)::json->'user_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert"
  ON public."Regular_titles"
  FOR INSERT
  WITH CHECK ((current_setting('request.jwt.claims', true)::json->'user_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update"
  ON public."Regular_titles"
  FOR UPDATE
  USING ((current_setting('request.jwt.claims', true)::json->'user_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete"
  ON public."Regular_titles"
  FOR DELETE
  USING ((current_setting('request.jwt.claims', true)::json->'user_metadata'->>'role') = 'admin');
```

---

## ▶️ Running the App

```bash
npm start
# or
yarn start
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Admin Interface

- Log in at `/login` with admin credentials.  
- Visit `/admin` to access the dashboard.  

---

## 🧰 Helper Scripts

### `promoteUser.js`

```bash
node scripts/promoteUser.js <user-uuid>
```

---

## 🗂️ Project Structure

```
.
├── .env.local           
├── .env                 
├── package.json
├── scripts/
│   └── promoteUser.js   
└── src/
    ├── index.jsx
    ├── supabaseClient.js
    ├── context/
    ├── components/
    └── admin/
```

---

## 🤝 Contributing

1. Fork repo  
2. Create branch  
3. Commit & push  
4. Open PR  

---

## 📬 Contact

youremail@example.com
