import { User } from '@domain/entities/User';
import { Email } from '@domain/value-objects/Email';
import { Name } from '@domain/value-objects/Name';
import { Password } from '@domain/value-objects/Password';
import { describe, expect, it } from 'vitest';

describe('User エンティティ', () => {
  // テスト用のヘルパー関数
  const createValidUser = () => {
    return new User(
      new Name('田中太郎'),
      new Email('test@example.com'),
      new Password('Abcd1234'),
      new Date('2024-01-01')
    );
  };

  describe('正常系テストケース', () => {
    it('有効な日本語名でUserを作成できること', () => {
      const user = new User(
        new Name('田中太郎'),
        new Email('test@example.com'),
        new Password('Abcd1234'),
        new Date('2024-01-01')
      );

      expect(user.getName().value).toBe('田中太郎');
      expect(user.getEmail().value).toBe('test@example.com');
      expect(user.getPassword().value).toBe('Abcd1234');
      expect(user.getCreatedAt()).toEqual(new Date('2024-01-01'));
    });

    it('有効な英語名でUserを作成できること', () => {
      const user = new User(
        new Name('John Doe'),
        new Email('john@example.com'),
        new Password('StrongPass1'),
        new Date('2024-01-02')
      );

      expect(user.getName().value).toBe('John Doe');
      expect(user.getEmail().value).toBe('john@example.com');
      expect(user.getPassword().value).toBe('StrongPass1');
      expect(user.getCreatedAt()).toEqual(new Date('2024-01-02'));
    });

    it('特殊文字を含む名前でUserを作成できること', () => {
      const user = new User(
        new Name('José María'),
        new Email('jose@example.com'),
        new Password('A1b2c3d4'),
        new Date('2024-01-03')
      );

      expect(user.getName().value).toBe('José María');
      expect(user.getEmail().value).toBe('jose@example.com');
      expect(user.getPassword().value).toBe('A1b2c3d4');
      expect(user.getCreatedAt()).toEqual(new Date('2024-01-03'));
    });
  });

  describe('異常系テストケース - Name', () => {
    it('空文字列の名前でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name(''),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('名前は空にできません');
    });

    it('1文字の名前でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('a'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('名前は2文字以上である必要があります');
    });

    it('空白のみの名前でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('   '),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('名前は空白のみにできません');
    });

    it('記号のみの名前でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('!@#$'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('名前には少なくとも1つの文字または数字が含まれる必要があります');
    });
  });

  describe('異常系テストケース - Email', () => {
    it('不正なメールフォーマット "invalid" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('invalid'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('Invalid email format');
    });

    it('不正なメールフォーマット "@example.com" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('Invalid email format');
    });

    it('不正なメールフォーマット "test@" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('Invalid email format');
    });

    it('不正なメールフォーマット "test@.com" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('Invalid email format');
    });

    it('空文字列のメールでエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email(''),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('Invalid email format');
    });
  });

  describe('異常系テストケース - Password', () => {
    it('短すぎるパスワード "abc" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('abc'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは8文字以上である必要があります');
    });

    it('大文字と数字が含まれていないパスワード "abcdefgh" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('abcdefgh'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは大文字、小文字、数字をすべて含む必要があります');
    });

    it('小文字と数字が含まれていないパスワード "ABCDEFGH" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('ABCDEFGH'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは大文字、小文字、数字をすべて含む必要があります');
    });

    it('大文字が含まれていないパスワード "abcd1234" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('abcd1234'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは大文字、小文字、数字をすべて含む必要があります');
    });

    it('小文字が含まれていないパスワード "ABCD1234" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('ABCD1234'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは大文字、小文字、数字をすべて含む必要があります');
    });

    it('数字が含まれていないパスワード "Abcdefgh" でエラーをスローすること', () => {
      expect(() => {
        new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcdefgh'),
          new Date('2024-01-01')
        );
      }).toThrow('パスワードは大文字、小文字、数字をすべて含む必要があります');
    });
  });

  describe('メソッドの振る舞い', () => {
    describe('equals メソッド', () => {
      it('同じ値を持つ別のUserインスタンスと等価であること', () => {
        const user1 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        const user2 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        expect(user1.equals(user2)).toBe(true);
      });

      it('異なる名前を持つUserインスタンスとは等価でないこと', () => {
        const user1 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        const user2 = new User(
          new Name('山田花子'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        expect(user1.equals(user2)).toBe(false);
      });

      it('異なるメールアドレスを持つUserインスタンスとは等価でないこと', () => {
        const user1 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        const user2 = new User(
          new Name('田中太郎'),
          new Email('different@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        expect(user1.equals(user2)).toBe(false);
      });

      it('異なるパスワードを持つUserインスタンスとは等価でないこと', () => {
        const user1 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        const user2 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('DifferentPass1'),
          new Date('2024-01-01')
        );

        expect(user1.equals(user2)).toBe(false);
      });

      it('異なる作成日時を持つUserインスタンスとは等価でないこと', () => {
        const user1 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-01')
        );

        const user2 = new User(
          new Name('田中太郎'),
          new Email('test@example.com'),
          new Password('Abcd1234'),
          new Date('2024-01-02')
        );

        expect(user1.equals(user2)).toBe(false);
      });
    });

    describe('getter メソッド', () => {
      it('getName() で設定された名前を取得できること', () => {
        const user = createValidUser();
        const name = user.getName();

        expect(name).toBeInstanceOf(Name);
        expect(name.value).toBe('田中太郎');
      });

      it('getEmail() で設定されたメールアドレスを取得できること', () => {
        const user = createValidUser();
        const email = user.getEmail();

        expect(email).toBeInstanceOf(Email);
        expect(email.value).toBe('test@example.com');
      });

      it('getPassword() で設定されたパスワードを取得できること', () => {
        const user = createValidUser();
        const password = user.getPassword();

        expect(password).toBeInstanceOf(Password);
        expect(password.value).toBe('Abcd1234');
      });

      it('getCreatedAt() で設定された作成日時を取得できること', () => {
        const user = createValidUser();
        const createdAt = user.getCreatedAt();

        expect(createdAt).toBeInstanceOf(Date);
        expect(createdAt).toEqual(new Date('2024-01-01'));
      });
    });
  });
});
