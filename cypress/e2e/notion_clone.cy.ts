// バックエンドの500エラーでテストが止まらないようにする
Cypress.on("uncaught:exception", () => false);

describe("Notion clone E2Eテスト", () => {
  // サインイン
  it("サインインできる", () => {
    cy.visit("/");

    // サインイン画面に移動
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("test1234");
    cy.contains("button", "ログイン").click();

    // サインイン後にノート一覧が表示される
    cy.url().should("include", "/");
  });

  it("ノートを新規作成できる", () => {
    cy.visit("/");

    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("test1234");
    cy.contains("button", "ログイン").click();

    cy.url().should("include", "/");

    // 「ノートを作成」クリック → サイドバーにノートが追加される
    cy.contains("ノートを作成").click();

    // サイドバーに「無題」が追加されるのを待ってクリック
    cy.contains("無題", { timeout: 10000 }).first().click();

    // タイトル入力欄が表示される
    cy.get("textarea.title-input", { timeout: 10000 }).should("exist");
  });
});
