export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Email or password entered incorrectly'
    case 'INVALID_DATA':
      return 'Email or password entered incorrectly'
    case 'EMAIL_NOT_FOUND':
      return ('Email or password entered incorrectly')
    case 'EMAIL EXISTS':
      return ('User with this Email already exists')
    default:
      return 'Too many login attempts try again later'
  }
}