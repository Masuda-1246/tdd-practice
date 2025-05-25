export class Password {
  private readonly _value: string;

  // エラーメッセージを定数として定義
  private static readonly ERROR_TOO_SHORT = 'パスワードは8文字以上である必要があります';
  private static readonly ERROR_MISSING_CHAR_TYPES =
    'パスワードは大文字、小文字、数字をすべて含む必要があります';

  // 文字種をチェックする正規表現
  private static readonly UPPERCASE_REGEX = /[A-Z]/;
  private static readonly LOWERCASE_REGEX = /[a-z]/;
  private static readonly NUMBER_REGEX = /[0-9]/;

  constructor(value: string) {
    this.validatePassword(value);
    this._value = value;
  }

  /**
   * パスワードのバリデーションを行う
   * @param value 検証するパスワード
   * @throws Error バリデーションエラーの場合
   */
  private validatePassword(value: string): void {
    // 長さチェック
    if (value.length < 8) {
      throw new Error(Password.ERROR_TOO_SHORT);
    }

    // 文字種チェック
    if (!this.containsRequiredCharTypes(value)) {
      throw new Error(Password.ERROR_MISSING_CHAR_TYPES);
    }
  }

  /**
   * パスワードに必要な文字種（大文字、小文字、数字）がすべて含まれているかチェックする
   * @param value チェックする文字列
   * @returns 必要な文字種がすべて含まれている場合はtrue
   */
  private containsRequiredCharTypes(value: string): boolean {
    const hasUpperCase = Password.UPPERCASE_REGEX.test(value);
    const hasLowerCase = Password.LOWERCASE_REGEX.test(value);
    const hasNumber = Password.NUMBER_REGEX.test(value);

    return hasUpperCase && hasLowerCase && hasNumber;
  }

  get value(): string {
    return this._value;
  }

  equals(other: Password): boolean {
    return this._value === other._value;
  }
}
