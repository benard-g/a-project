export function getLoginRedirectUrl(location: {
  hash: string;
  pathname: string;
  search: string;
}) {
  const { hash, pathname, search } = location;

  const loginRedirectUrlParams = new URLSearchParams();
  loginRedirectUrlParams.append('path', pathname);
  if (hash) {
    loginRedirectUrlParams.append('hash', hash);
  }
  if (search) {
    loginRedirectUrlParams.append('search', search);
  }

  return `/auth/login?${loginRedirectUrlParams.toString()}`;
}
