import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const redirectUrl = nextUrl.origin; // Extract the domain from the previous URL

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page on the same domain
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', redirectUrl)); // Navigate to the dashboard on the same domain
      }
      return true;
    },
  },
} satisfies NextAuthConfig;