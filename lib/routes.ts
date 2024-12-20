export const PRIVATE_ROUTES = [
  "/programas",
  "/programas/nuevo-programa",
  "/perfil",
  "/lista-usuarios",
  "/actividades",
]

export const PUBLIC_ROUTES = [
  "/",
  "/home",
  "/centros-deportivos",
]

export const AUTH_ROUTES = [
  "/iniciar-sesion",
  "/registrar",
  "/error",
  "/restablecer-contraseña",
] 

export const LOGIN_REDIRECT = "/home"

export const LOGOUT_REDIRECT = "/home"

export const API_PROVIDER = "/api/auth"

export const NOT_AUTHENTICATED_REDIRECT = "/home"