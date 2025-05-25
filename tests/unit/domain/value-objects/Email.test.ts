import { Email } from '@domain/value-objects/Email';
// tests/unit/domain/value-objects/Email.test.ts
import { describe, expect, it } from 'vitest';

describe('Email 値オブジェクト', () => {
  it('有効なメールアドレスを作成できること', () => {
    const validEmail = 'test@example.com';
    const email = new Email(validEmail);

    expect(email.value).toBe(validEmail);
  });

  it('不正なメールフォーマットの場合はエラーをスローすること', () => {
    const invalidEmails = ['invalid', '@example.com', 'test@', 'test@.com', ''];

    for (const invalidEmail of invalidEmails) {
      expect(() => new Email(invalidEmail)).toThrow('Invalid email format');
    }
  });

  it('同じ値を持つ別のメールアドレスと等価であること', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('test@example.com');

    expect(email1.equals(email2)).toBe(true);
  });

  it('異なる値を持つ別のメールアドレスとは等価でないこと', () => {
    const email1 = new Email('test1@example.com');
    const email2 = new Email('test2@example.com');

    expect(email1.equals(email2)).toBe(false);
  });
});
