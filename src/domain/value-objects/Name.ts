export class Name {
  private readonly _value: string;

  // エラーメッセージを定数として定義
  private static readonly ERROR_EMPTY = '名前は空にできません';
  private static readonly ERROR_ONLY_WHITESPACE = '名前は空白のみにできません';
  private static readonly ERROR_TOO_SHORT = '名前は2文字以上である必要があります';
  private static readonly ERROR_ONLY_SYMBOLS =
    '名前には少なくとも1つの文字または数字が含まれる必要があります';

  // 文字または数字が含まれているかをチェックする正規表現
  private static readonly LETTER_OR_DIGIT_REGEX = /[a-zA-Z0-9\p{L}]/u;

  constructor(value: string) {
    this.validateName(value);
    this._value = value;
  }

  /**
   * 名前のバリデーションを行う
   * @param value 検証する名前
   * @throws Error バリデーションエラーの場合
   */
  private validateName(value: string): void {
    // 空文字列チェック
    if (value.length === 0) {
      throw new Error(Name.ERROR_EMPTY);
    }

    const trimmedValue = value.trim();

    // 空白のみチェック
    if (trimmedValue.length === 0) {
      throw new Error(Name.ERROR_ONLY_WHITESPACE);
    }

    // 長さチェック
    if (trimmedValue.length < 2) {
      throw new Error(Name.ERROR_TOO_SHORT);
    }

    // 記号のみチェック
    if (!this.containsLetterOrDigit(trimmedValue)) {
      throw new Error(Name.ERROR_ONLY_SYMBOLS);
    }
  }

  /**
   * 文字列に文字または数字が含まれているかチェックする
   * @param value チェックする文字列
   * @returns 文字または数字が含まれている場合はtrue
   */
  private containsLetterOrDigit(value: string): boolean {
    return Name.LETTER_OR_DIGIT_REGEX.test(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Name): boolean {
    return this._value === other._value;
  }
}
