# User.spec.md

## 🧪 Entity: User

### 🔑 Fields

| Field      | Type     | Rule                                |
|------------|----------|-------------------------------------|
| name       | Name     | 名前のvalue object                   |
| email      | Email    | メールアドレスのvalue object          |
| password   | Password | パスワードのvalue object             |
| createdAt  | Date     | ユーザー作成日時                     |

---

### ✅ 正常系テストケース

| name         | email               | password      | createdAt                  | 備考                  |
|--------------|---------------------|---------------|----------------------------|-----------------------|
| "田中太郎"    | "test@example.com"  | "Abcd1234"    | new Date("2024-01-01")    | 有効な日本語名        |
| "John Doe"   | "john@example.com"  | "StrongPass1" | new Date("2024-01-02")    | 有効な英語名          |
| "José María" | "jose@example.com"  | "A1b2c3d4"    | new Date("2024-01-03")    | 特殊文字を含む名前    |

---

### ❌ 異常系テストケース

| 項目      | 値                 | エラー理由                     |
|-----------|--------------------|-------------------------------|
| name      | ""                 | 名前は空にできません           |
| name      | "a"                | 名前は2文字以上である必要があります |
| name      | "   "              | 名前は空白のみにできません      |
| name      | "!@#$"             | 名前には少なくとも1つの文字または数字が含まれる必要があります |
| email     | "invalid"          | Invalid email format          |
| email     | "@example.com"     | Invalid email format          |
| email     | "test@"            | Invalid email format          |
| email     | "test@.com"        | Invalid email format          |
| email     | ""                 | Invalid email format          |
| password  | "abc"              | パスワードは8文字以上である必要があります |
| password  | "abcdefgh"         | パスワードは大文字、小文字、数字をすべて含む必要があります |
| password  | "ABCDEFGH"         | パスワードは大文字、小文字、数字をすべて含む必要があります |
| password  | "abcd1234"         | パスワードは大文字、小文字、数字をすべて含む必要があります |
| password  | "ABCD1234"         | パスワードは大文字、小文字、数字をすべて含む必要があります |
| password  | "Abcdefgh"         | パスワードは大文字、小文字、数字をすべて含む必要があります |

---

### 🔄 振る舞い（メソッド）仕様

#### `constructor(name: Name, email: Email, password: Password, createdAt: Date): User`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 有効なName, Email, Password, Date    | Userインスタンスが作成される |
| 無効なName                           | Nameのバリデーションエラー  |
| 無効なEmail                          | Emailのバリデーションエラー |
| 無効なPassword                       | Passwordのバリデーションエラー |

#### `equals(other: User): boolean`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 同じ値を持つ別のUserインスタンス      | true                   |
| 異なる値を持つUserインスタンス        | false                  |

#### `getName(): Name`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 作成されたUserインスタンス            | 設定されたNameを返す     |

#### `getEmail(): Email`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 作成されたUserインスタンス            | 設定されたEmailを返す    |

#### `getPassword(): Password`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 作成されたUserインスタンス            | 設定されたPasswordを返す |

#### `getCreatedAt(): Date`

##### テストケース

| 入力名                               | 結果                    |
|--------------------------------------|------------------------|
| 作成されたUserインスタンス            | 設定されたDateを返す     |

---

### 🔍 その他仕様

- Userエンティティは不変オブジェクトとして実装される
- createdAtは作成時に設定され、変更不可
- 各フィールドはvalue objectを使用してバリデーションが行われる
- equalsメソッドは全フィールドの比較を行う

---

## 🔗 関連VO/Entity

- **Name**: 名前を表現するvalue object
  - 2文字以上必須
  - 文字または数字を含む必要あり
  - 空白のみや記号のみは無効

- **Email**: メールアドレスを表現するvalue object
  - 基本的なメールフォーマットの検証
  - 正規表現による形式チェック

- **Password**: パスワードを表現するvalue object
  - 8文字以上必須
  - 大文字、小文字、数字をすべて含む必要あり
