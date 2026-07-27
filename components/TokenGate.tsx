"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { getOrCreateDeviceId } from "@/lib/deviceId";

type LicenseResponse = {
  allowed: boolean;
  reason?: string;
  expires_at?: string;
};

type TokenGateProps = {
  appCode: string;
  children: ReactNode;
};

const LICENSE_URL = "https://serveapppedro.vercel.app/api/licenca";

export default function TokenGate({ appCode, children }: TokenGateProps) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const tokenKey = `access_token_${appCode}`;
  const okKey = `access_ok_${appCode}`;
  const expiresKey = `access_expires_${appCode}`;

  const clearAccess = useCallback(() => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(okKey);
    localStorage.removeItem(expiresKey);
    setAuthorized(false);
  }, [expiresKey, okKey, tokenKey]);

  const validateToken = useCallback(
    async (value: string) => {
      const response = await fetch(LICENSE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: value,
          deviceId: getOrCreateDeviceId(),
        }),
      });

      const data = (await response.json()) as LicenseResponse;
      if (!response.ok || !data.allowed) {
        throw new Error(data.reason || "Token inválido ou licença indisponível.");
      }

      localStorage.setItem(tokenKey, value);
      localStorage.setItem(okKey, "true");
      if (data.expires_at) {
        localStorage.setItem(expiresKey, data.expires_at);
      } else {
        localStorage.removeItem(expiresKey);
      }
      setAuthorized(true);
      setError("");
    },
    [expiresKey, okKey, tokenKey]
  );

  useEffect(() => {
    const savedToken = localStorage.getItem(tokenKey);
    if (!savedToken) {
      clearAccess();
      setChecking(false);
      return;
    }

    validateToken(savedToken)
      .catch((reason: unknown) => {
        clearAccess();
        setError(reason instanceof Error ? reason.message : "Não foi possível validar a licença.");
      })
      .finally(() => setChecking(false));
  }, [clearAccess, tokenKey, validateToken]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = token.trim();
    if (!value) {
      setError("Informe o token de acesso.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await validateToken(value);
    } catch (reason) {
      clearAccess();
      setError(reason instanceof Error ? reason.message : "Não foi possível validar a licença.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) return null;
  if (authorized) return <>{children}</>;

  return (
    <main className="flex h-full w-full items-center justify-center bg-uberBg px-6">
      <section className="w-full max-w-[360px] rounded-2xl border border-white/10 bg-uberCard p-6 shadow-xl shadow-black/40">
        <div className="mb-6">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-uberBlue text-lg font-bold text-white">
            U
          </span>
          <h1 className="text-[24px] font-bold leading-tight text-white">Acesso ao Uber Drive</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-uberSecondary">
            Insira seu token para validar a licença deste dispositivo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="access-token" className="mb-2 block text-[13px] font-semibold text-white">
            Token de acesso
          </label>
          <input
            id="access-token"
            type="text"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Digite seu token"
            className="h-12 w-full rounded-lg border border-white/15 bg-[#1f1f1f] px-4 text-[15px] text-white placeholder:text-neutral-600 focus:border-[#276EF1] focus:outline-none"
          />

          {error && (
            <p role="alert" className="mt-3 text-[13px] leading-snug text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 h-12 w-full rounded-lg bg-uberBlue text-[16px] font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
          >
            {submitting ? "Validando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
