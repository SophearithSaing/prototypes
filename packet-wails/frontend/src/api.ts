export type KeyValue = { key: string; value: string; enabled: boolean };

export type RequestModel = {
  id: string;
  name: string;
  folder?: string;
  method: string;
  url: string;
  headers: KeyValue[];
  params: KeyValue[];
  body: string;
};

export type ResponseModel = {
  status: number;
  statusText: string;
  durationMs: number;
  sizeBytes: number;
  body: string;
  headers: KeyValue[];
  requestHeaders: KeyValue[];
  cookieCount: number;
};

export type ImportedCollection = {
  name: string;
  requests: RequestModel[];
  variables: KeyValue[];
};

declare global {
  interface Window {
    go?: {
      main?: { App?: Record<string, (...args: unknown[]) => Promise<unknown>> };
    };
  }
}

const backend = () => window.go?.main?.App;

export async function sendRequest(
  request: RequestModel,
): Promise<ResponseModel> {
  const fn = backend()?.SendRequest;
  if (!fn)
    throw new Error(
      "Wails backend is unavailable. Run this app with `wails dev`.",
    );
  return fn(request) as Promise<ResponseModel>;
}

export async function generateJWT(
  algorithm: string,
  secret: string,
  payload: string,
): Promise<string> {
  const fn = backend()?.GenerateJWT;
  if (!fn) throw new Error("Wails backend is unavailable.");
  return fn({ algorithm, secret, payload }) as Promise<string>;
}

export async function importPostman(raw: string): Promise<ImportedCollection> {
  const fn = backend()?.ImportPostman;
  if (!fn) throw new Error("Wails backend is unavailable.");
  return fn(raw) as Promise<ImportedCollection>;
}

export async function clearCookies(): Promise<void> {
  const fn = backend()?.ClearCookies;
  if (fn) await fn();
}
