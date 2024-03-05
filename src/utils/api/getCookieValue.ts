export function getCookieValue(
  headers: Headers,
  cookieName: string,
): string | null {
  const cookies = headers.get("cookie");
  if (!cookies) return null;

  const cookieValue = cookies
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([name]) => name === cookieName)?.[1];

  return cookieValue ? decodeURIComponent(cookieValue) : null;
}
