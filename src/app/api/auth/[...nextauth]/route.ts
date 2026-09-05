// src/app/api/auth/[...nextauth]/route.ts
// NextAuth v5 catch-all API route handler.
// This file should not be modified — all config lives in src/auth.ts

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
