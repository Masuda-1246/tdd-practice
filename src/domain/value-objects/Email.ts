// src/domain/value-objects/Email.ts
export class Email {
  private readonly _value: string;

  // エラーメッセージを定数として定義
  private static readonly ERROR_INVALID_FORMAT = 'Invalid email format';

  // メールアドレス形式を検証する正規表現
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(value: string) {
    this.validateEmail(value);
    this._value = value;
  }

  /**
   * メールアドレスのバリデーションを行う
   * @param value 検証するメールアドレス
   * @throws Error バリデーションエラーの場合
   */
  private validateEmail(value: string): void {
    if (!this.isValidFormat(value)) {
      throw new Error(Email.ERROR_INVALID_FORMAT);
    }
  }

  /**
   * メールアドレス形式が有効かチェックする
   * @param email チェックする文字列
   * @returns 有効なメールアドレス形式の場合はtrue
   */
  private isValidFormat(email: string): boolean {
    return Email.EMAIL_REGEX.test(email);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }
}
