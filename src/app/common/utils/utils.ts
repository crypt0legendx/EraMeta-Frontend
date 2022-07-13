export const getErrorMessageForCode = (code: String) => {
  if ((code === 'auth/invalid-email') || code === 'auth/missing-email') {
    return "Please enter a valid email address";
  } else if (code === 'auth/internal-error') {
    return "Incorrect credentials, please try again";
  } else if (code === 'auth/wrong-password') {
    return "Incorrect password, please try again";
  } else if (code === 'auth/user-not-found') {
    return "No account linked to this email";
  } else if (code === 'auth/email-already-in-use') {
    return "There is already an account linked to this email";
  } else if (code === 'auth/weak-password') {
    return "Password must be at least 6 characters";
  } else if (code === 'auth/admin-restricted-operation') {
    return "Please enter your credentials";
  }
  return code;
}
