"use client";

class TokenStorage {
  static value = "";
  static get() {
    return TokenStorage.value;
  }
  static set(value: string) {
    TokenStorage.value = value;
  }
}

function TokenProvider({ token }: { token: string }) {
  TokenStorage.set(token);
  return null;
}

export { TokenStorage, TokenProvider };
