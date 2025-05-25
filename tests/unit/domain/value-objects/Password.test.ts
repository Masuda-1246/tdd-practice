// tests/unit/domain/value-objects/Password.test.ts
import { Password } from '@domain/value-objects/Password';
import { describe, expect, it } from 'vitest';

describe('Password 値オブジェクト', () => {
  it('有効なパスワードを作成できること', () => {
    const validPasswords = ['Abcd1234', 'StrongPass1', 'A1b2c3d4'];

    for (const validPassword of validPasswords) {
      expect(() => new Password(validPassword)).not.toThrow();
      const password = new Password(validPassword);
      expect(password.value).toBe(validPassword);
    }
  });

  it('短すぎるパスワードはエラーをスローすること', () => {
    expect(() => new Password('abc')).toThrow('パスワードは8文字以上である必要があります');
  });

  it('大文字、小文字、数字のすべてを含まないパスワードはエラーをスローすること', () => {
    // 大文字と数字が含まれていない
    expect(() => new Password('abcdefgh')).toThrow(
      'パスワードは大文字、小文字、数字をすべて含む必要があります'
    );

    // 小文字と数字が含まれていない
    expect(() => new Password('ABCDEFGH')).toThrow(
      'パスワードは大文字、小文字、数字をすべて含む必要があります'
    );

    // 大文字が含まれていない
    expect(() => new Password('abcd1234')).toThrow(
      'パスワードは大文字、小文字、数字をすべて含む必要があります'
    );

    // 小文字が含まれていない
    expect(() => new Password('ABCD1234')).toThrow(
      'パスワードは大文字、小文字、数字をすべて含む必要があります'
    );

    // 数字が含まれていない
    expect(() => new Password('Abcdefgh')).toThrow(
      'パスワードは大文字、小文字、数字をすべて含む必要があります'
    );
  });

  it('同じ値を持つ別のパスワードと等価であること', () => {
    const password1 = new Password('Abcd1234');
    const password2 = new Password('Abcd1234');

    expect(password1.equals(password2)).toBe(true);
  });

  it('異なる値を持つ別のパスワードとは等価でないこと', () => {
    const password1 = new Password('Abcd1234');
    const password2 = new Password('StrongPass1');

    expect(password1.equals(password2)).toBe(false);
  });
});
