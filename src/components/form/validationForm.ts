export const validationEmail = (value: string) => {
  if (value.length < 1) {
    return '⚠ This field is required';
  }
  if (value.startsWith('@')) {
    return '⚠ Email cannot start with @';
  }
  if (!/^[^.]/.test(value)) {
    return '⚠ Email cannot start with a dot';
  }
  if (!/^\S*$/.test(value)) {
    return '⚠ Email cannot contain spaces';
  }
  if (!/^[a-zA-Z0-9@.]+$/.test(value)) {
    return '⚠ Email can only contain English letters or digits';
  }
  if (!value.includes('@')) {
    return '⚠ Email must contain @';
  }
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return '⚠ Email must contain a domain name like example.com';
  }
  const dotMatches = value.match(/\./g);
  if (!(dotMatches !== null && dotMatches.length === 1)) {
    return '⚠ Email must contain only one dot';
  }
  if (!/^[^@\s]+@[^.@\s]+\.[^@\s]+$/.test(value)) {
    return '⚠ Email must be in the correct format like user@example.com';
  }
  return '';
};

export const validationPassword = (value: string) => {
  if (value.length < 1) {
    return '⚠ This field is required';
  }
  if (!/^\S/.test(value)) {
    return '⚠ Password must not start with whitespace';
  }
  if (value.length < 8) {
    return '⚠ Password not shorter than 8 characters';
  }
  if (!/\S$/.test(value)) {
    return '⚠ Password must not end with whitespace';
  }
  if (!/[A-Z]/.test(value)) {
    return '⚠ Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return '⚠ Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return '⚠ Password must contain at least one digit';
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return '⚠ Password must contain at least one special character';
  }
  return '';
};
