// Types d'utilisateurs pour le système
export const USER_ROLES = {
  STUDENT: 'student',
  ADVISOR: 'advisor',
  ADMIN: 'admin'
};

// Structure d'un utilisateur
export const DEFAULT_USER = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  role: null,
  program: '',
  isAuthenticated: false
};
