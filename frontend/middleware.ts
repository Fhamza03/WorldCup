import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cette fonction peut être marquée comme `async` si elle utilise `await`
export function middleware(request: NextRequest) {
  // Récupérer le token depuis les cookies
  const token = request.cookies.get('token')?.value;
  
  // Vérifier si l'utilisateur accède à une route protégée
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/auth/profile');
  
  // Rediriger vers la page de connexion si l'accès à une route protégée sans token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Continuer la requête si tout est OK
  return NextResponse.next();
}

// Configuration des chemins sur lesquels ce middleware doit s'exécuter
export const config = {
  matcher: ['/auth/profile/:path*'],
};