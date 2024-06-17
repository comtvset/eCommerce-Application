import { describe, it, expect, beforeEach } from 'vitest';

import {
  saveCredentials,
  updateEmail,
  setPassword,
  getPassword,
  getCredentials,
  state,
} from 'src/services/userData/saveEmailPassword.ts';

describe('CredentialsUtils functions', () => {
  beforeEach(() => {
    state.savedEmail = '';
    state.savedPassword = 'null';
  });

  it('saveCredentials should save the email and password correctly', () => {
    const email = 'e@mail.com';
    const password = 'password123';

    saveCredentials(email, password);

    expect(state.savedEmail).toBe(email);
    expect(state.savedPassword).toBe(password);
  });

  it('updateEmail should update the email correctly', () => {
    const initialEmail = 'upd-e@mail.com';
    const password = 'password123';
    saveCredentials(initialEmail, password);

    const newEmail = 'new-e@mail.com';
    updateEmail(newEmail);

    expect(state.savedEmail).toBe(newEmail);
    expect(state.savedPassword).toBe(password);
  });

  it('setPassword should update the password correctly', () => {
    const email = 'e@mail.com';
    const initialPassword = 'initialPassword';
    saveCredentials(email, initialPassword);

    const newPassword = 'newPassword123';
    setPassword(newPassword);

    expect(state.savedEmail).toBe(email);
    expect(state.savedPassword).toBe(newPassword);
  });

  it('getPassword should return the correct password', () => {
    const email = 'e@mail.com';
    const password = 'password123';
    saveCredentials(email, password);

    const retrievedPassword = getPassword();

    expect(retrievedPassword).toBe(password);
  });

  it('getCredentials should return the correct credentials', () => {
    const email = 'e@mail.com';
    const password = 'password123';
    saveCredentials(email, password);

    const credentials = getCredentials();

    expect(credentials).toEqual({ email, password });
  });
});
