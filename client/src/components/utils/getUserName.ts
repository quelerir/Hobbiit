export const getUserName = (email: string | undefined): string => {
  if (email) return email.substr(0, email.indexOf('@'));
  return '';
};
