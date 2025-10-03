# 🏗️ Sprigly – Build Instructions

This file defines the **step-by-step plan** for building Sprigly.  
It is meant for AI code assistants (Claude, Cursor, Copilot, etc.) to follow.  

---

## 🔹 Phase 1 – Setup

1. Initialize Next.js project with TailwindCSS:
   ```bash
   npx create-next-app@latest sprigly
   cd sprigly
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Install dependencies:
   ```bash
   npm install @prisma/client prisma next-auth bcrypt socket.io socket.io-client react-beautiful-dnd date-fns
   npm install -D typescript @types/node @types/react
   ```

3. Initialize Prisma & configure PostgreSQL connection:
   ```bash
   npx prisma init
   ```

4. Add `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/sprigly"
   NEXTAUTH_SECRET="supersecret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

---

## 🔹 Phase 2 – Database Models (Prisma)

Define `schema.prisma`:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  tasks     Task[]
  events    Event[]
  messages  Message[]
}

model Task {
  id        String   @id @default(cuid())
  title     String
  status    String   @default("todo")
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  createdAt DateTime @default(now())
}

model Event {
  id        String   @id @default(cuid())
  title     String
  date      DateTime
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  createdAt DateTime @default(now())
}

model Message {
  id        String   @id @default(cuid())
  content   String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  createdAt DateTime @default(now())
}
```

Run migrations:
```bash
npx prisma migrate dev --name init
```

---

## 🔹 Phase 3 – Authentication (NextAuth.js)

1. Configure `[...nextauth].ts` in `/app/api/auth/[...nextauth]/route.ts`.
2. Use **credentials provider** (email + password).  
3. Hash passwords with **bcrypt** on signup.  
4. Store sessions with JWT.  

---

## 🔹 Phase 4 – Features

### 1. Tasks (Kanban Board)
- API routes: `/api/tasks` for CRUD.  
- Frontend: Kanban UI with drag-and-drop (react-beautiful-dnd).  
- Store tasks in DB.  

### 2. Events (Calendar)
- API routes: `/api/events`.  
- Frontend: Calendar view with `date-fns`.  
- Create/edit/delete events.  

### 3. Chat (Realtime)
- Setup **Socket.io** server inside Next.js API.  
- `/api/chat` handles WebSocket connections.  
- Messages stored in DB.  
- Frontend has chat box with live updates.  

---

## 🔹 Phase 5 – UI/UX

- Use **Tailwind** for styling.  
- Dashboard layout with sidebar navigation.  
- Mobile responsive design.  
- Reusable components: Button, Modal, Card.  

---

## 🔹 Phase 6 – Deployment

1. Push code to GitHub.  
2. Deploy frontend/backend to **Vercel**.  
3. Deploy database to **Supabase/Neon**.  
4. Configure environment variables on Vercel.  

---

## ✅ Completion Checklist

- [ ] Users can register/login securely.  
- [ ] Tasks can be managed with Kanban board.  
- [ ] Events can be created & viewed.  
- [ ] Chat works in real-time & stores history.  
- [ ] Responsive design works on mobile & desktop.  
- [ ] App is live at `sprigly.vercel.app`.  

---

👉 This file acts as a **step-by-step sprint plan** for building Sprigly.  