# SmartShop E-Commerce Platform

A premium, senior-level e-commerce application built with Next.js 14, Tailwind CSS, FastAPI, and Supabase.

## Architecture
- **Frontend**: Next.js 14 App Router (`/frontend`)
- **Backend**: FastAPI + Python (`/backend`)
- **Database**: Supabase PostgreSQL
- **AI**: LangChain integration placeholder for recommendations

## Quick Start

### Frontend (Next.js)
1. `cd frontend`
2. Copy `.env.example` to `.env.local` and add your keys.
3. `npm install`
4. `npm run dev`

### Backend (FastAPI)
1. `cd backend`
2. Copy `.env.example` to `.env` and add your Supabase/OpenAI keys.
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`

### Docker (Backend Setup)
Run `docker-compose up --build` in the root directory to spin up the FastAPI service and a local Redis container.

## Environment Variables Security
**NEVER** commit your `.env` or `.env.local` files to version control. They are automatically ignored by `.gitignore`. 
Ensure you inject your actual credentials directly into Vercel (for frontend) and Render/Railway (for backend) dashboards during real production deployments.

