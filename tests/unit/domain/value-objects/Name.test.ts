// tests/unit/domain/value-objects/Name.test.ts
import { Name } from '@domain/value-objects/Name';
import { describe, expect, it } from 'vitest';

describe('Name 値オブジェクト', () => {
  it('有効な名前を作成できること', () => {
    const validNames = ['田中太郎', 'John Doe', '鈴木', 'Li', 'José María'];

    for (const validName of validNames) {
      expect(() => new Name(validName)).not.toThrow();
      const name = new Name(validName);
      expect(name.value).toBe(validName);
    }
  });

  it('空文字列はエラーをスローすること', () => {
    expect(() => new Name('')).toThrow('名前は空にできません');
  });

  it('1文字の名前はエラーをスローすること', () => {
    expect(() => new Name('a')).toThrow('名前は2文字以上である必要があります');
  });

  it('空白のみの名前はエラーをスローすること', () => {
    expect(() => new Name('   ')).toThrow('名前は空白のみにできません');
  });

  it('トリム後に1文字になる名前はエラーをスローすること', () => {
    expect(() => new Name(' a ')).toThrow('名前は2文字以上である必要があります');
  });

  it('記号のみの名前はエラーをスローすること', () => {
    expect(() => new Name('!@#$')).toThrow('名前には少なくとも1つの文字または数字が含まれる必要があります');
  });

  it('同じ値を持つ別の名前と等価であること', () => {
    const name1 = new Name('田中太郎');
    const name2 = new Name('田中太郎');
    
    expect(name1.equals(name2)).toBe(true);
  });

  it('異なる値を持つ別の名前とは等価でないこと', () => {
    const name1 = new Name('田中太郎');
    const name2 = new Name('山田花子');
    
    expect(name1.equals(name2)).toBe(false);
  });
});
