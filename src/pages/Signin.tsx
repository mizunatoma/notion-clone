import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAtom } from "jotai";

import { authRepository } from "../modules/auth/auth.repository";
import { currentUserAtom } from "../modules/auth/current-user.state";
import "../styles/pages/auth.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signin = async () => {
    try {
      setIsSubmitting(true);
      const { user, token } = await authRepository.signin(email, password);
      setCurrentUser(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      alert("ログインに失敗しました。");
    } finally {
      setIsSubmitting(true);
    }
  };

  if (currentUser) return <Navigate to="/" replace />;

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Notionクローン</h2>
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-form">
              <div>
                <label className="auth-label" htmlFor="email">
                  メールアドレス
                </label>
                <div className="auth-input-container">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <label className="auth-label" htmlFor="password">
                  パスワード
                </label>
                <div className="auth-input-container">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={signin}
                  disabled={!email || !password || isSubmitting}
                  className="home-button"
                  style={{ width: "100%" }}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
