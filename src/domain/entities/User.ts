import type { Email } from '../value-objects/Email';
import type { Name } from '../value-objects/Name';
import type { Password } from '../value-objects/Password';

/**
 * ユーザーエンティティ
 * ユーザーの基本情報（名前、メールアドレス、パスワード、作成日時）を管理する不変オブジェクト
 */
export class User {
  private readonly _name: Name;
  private readonly _email: Email;
  private readonly _password: Password;
  private readonly _createdAt: Date;

  constructor(name: Name, email: Email, password: Password, createdAt: Date) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._createdAt = this.createDateCopy(createdAt);
  }

  /**
   * Dateオブジェクトの防御的コピーを作成する
   * @param date コピー元のDateオブジェクト
   * @returns 新しいDateオブジェクト
   */
  private createDateCopy(date: Date): Date {
    return new Date(date.getTime());
  }

  /**
   * 名前を取得する
   * @returns 名前のvalue object
   */
  getName(): Name {
    return this._name;
  }

  /**
   * メールアドレスを取得する
   * @returns メールアドレスのvalue object
   */
  getEmail(): Email {
    return this._email;
  }

  /**
   * パスワードを取得する
   * @returns パスワードのvalue object
   */
  getPassword(): Password {
    return this._password;
  }

  /**
   * 作成日時を取得する
   * @returns 作成日時のコピー
   */
  getCreatedAt(): Date {
    return this.createDateCopy(this._createdAt);
  }

  /**
   * 別のUserエンティティと等価かどうかを判定する
   * @param other 比較対象のUserエンティティ
   * @returns 等価な場合はtrue
   */
  equals(other: User): boolean {
    if (!other) return false;

    return (
      this._name.equals(other._name) &&
      this._email.equals(other._email) &&
      this._password.equals(other._password) &&
      this._createdAt.getTime() === other._createdAt.getTime()
    );
  }
}
