// jest.setup.ts
import "@testing-library/jest-dom";
import { server } from "../src/mocks/server";

// MSWのサーバーを起動
beforeAll(() => server.listen());

// 各テストごとにハンドラーをリセット
afterEach(() => server.resetHandlers());

// テスト終了後にサーバーをクローズ
afterAll(() => server.close());
