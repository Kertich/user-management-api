# User Management API

A simple backend API built with Node.js, Express, and Supabase.

## Features
- User authentication
- Role-based access
- RESTful APIs

## Tech Stack
- Node.js
- Express
- Supabase

## Authentication
- Uses Supabase Auth for user authentication
- User profiles stored in `public.users`
- Row Level Security enforced with `auth.uid()`
- Service role used server-side for profile creation
