import { CONFIG } from '../../config';

const HEADER_ACCESS_TOKEN = 'x-access-token';

type Result = { ok: false; error: Error } | { ok: true; accessToken: string };

export async function authenticate(): Promise<Result> {
  const authUri = `${CONFIG.API_URL}/auth/local/login`;

  const res = await fetch(authUri, { method: 'POST' });
  if (!res.ok) {
    return { ok: false, error: new Error('Auth failed') };
  }

  const accessToken = res.headers.get(HEADER_ACCESS_TOKEN);
  if (!accessToken) {
    return { ok: false, error: new Error('No access-token returned by auth') };
  }

  return { ok: true, accessToken };
}
