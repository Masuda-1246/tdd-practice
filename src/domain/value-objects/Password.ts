export class Password {
  private readonly _value: string;

  constructor(value: string) {
    if (value.length < 8) {
      throw new Error('パスワードは8文字以上である必要があります');
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new Error('パスワードは大文字、小文字、数字をすべて含む必要があります');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: Password): boolean {
    return this._value === other._value;
  }
}
