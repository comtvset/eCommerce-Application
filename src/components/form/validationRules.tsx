export const validationRuleForEmail = {
  rule1: (value: string) => /^[^@]/.test(value) || '⚠ Email cannot start with @',
  rule2: (value: string) => /^[^.]/.test(value) || '⚠ Email cannot start with a dot',
  rule3: (value: string) => /^\S*$/.test(value) || '⚠ Email cannot contain spaces',
  rule4: (value: string) => /^[a-zA-Z0-9@.]+$/.test(value) || '⚠ Email can only contain English letters or digits',
  rule5: (value: string) => /@/.test(value) || '⚠ Email must contain @',
  rule6: (value: string) => /^\S+@\S+\.\S+$/.test(value) || '⚠ Email must contain a domain name like example.com',
  rule7: (value: string) => (value.match(/\./g) || []).length === 1 || '⚠ Email must contain only one dot',
  rule8: (value: string) => /^[^@\s]+@[^.@\s]+\.[^@\s]+$/.test(value) || '⚠ Email must be in the correct format like user@example.com',
  rule9: (value: string) => value.length > 5 || '⚠ Not shorter than 5 characters',
};

export const validationRuleForPassword = {
  rule1: (value: string) => /^\S/.test(value) || '⚠ Password must not start with whitespace',
  rule2: (value: string) => value.length > 8 || '⚠ Password not shorter than 8 characters',
  rule3: (value: string) => /\S$/.test(value) || '⚠ Password must not end with whitespace',
  rule4: (value: string) => /[A-Z]/.test(value) || '⚠ Password must contain at least one uppercase letter',
  rule5: (value: string) => /[a-z]/.test(value) || '⚠ Password must contain at least one lowercase letter',
  rule6: (value: string) => /[0-9]/.test(value) || '⚠ Password must contain at least one digit',
  rule7: (value: string) => /[!@#$%^&*]/.test(value) || '⚠ Password must contain at least one special character',
};
