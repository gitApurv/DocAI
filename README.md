# 🩺 DocAI

DocAI is an AI-powered medical assistant platform designed to streamline healthcare interactions. It integrates **voice agents, real-time speech recognition, AI doctor suggestions, and a powerful dashboard** to help users manage medical sessions, generate reports, and interact with AI-driven healthcare tools.


## 🚀 Features

-   **🤖 AI Medical Agents**

    -   Integrated multiple medical voice agents for intelligent healthcare conversations.

    -   Gemini-powered AI doctor for smart suggestions and guidance.

-   **🎤 Real-Time Voice & Speech**

    -   Vapi.ai + Assembly.ai for real-time speech-to-text and text-to-speech conversion.

    -   Session-specific voiceId management for personalized experiences.

-   **📊 Dashboard & Reports**

    -   Interactive dashboard with history tracking and report generation.

    -   Error handling, loading states, and improved UI components.

    -   Premium badge and session history checks in doctor agent cards.

-   **📱 Mobile-Friendly UI**

    -   Enhanced dashboard header with mobile menu support.

    -   Modern responsive layout and refined homepage structure.

-   **🔐 Authentication & Access**

    -   Clerk integration for user authentication and management.

    -   Premium access checks for exclusive features.

-   ⚠️ **Disclaimer**: DocAI provides **educational and informational assistance only**. It is **not a replacement for professional medical care**.

## 🛠️ Tech Stack

- **Framework**: Next.js (frontend + backend via API routes/server actions)

- **Styling**: Tailwind CSS, shadcn/ui

- **Database**: NeonDB (Postgres) with Drizzle ORM

- **Authentication + Billing**: Clerk (user auth, subscription management, payments)

- **AI / Integrations**:

  - GEMINI API (AI medical assistant)

  - AssemblyAI (speech-to-text transcription)

  - Vapi (text-to-speech audio responses)

- **Deployment**: Vercel
