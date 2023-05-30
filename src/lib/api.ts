import { HTTP_METHOD } from "next/dist/server/web/http";

export type FetcherParams = {
  url: string;
  method: HTTP_METHOD;
  body: any;
  json?: boolean;
};
export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: FetcherParams) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  if (!res.ok) {
    throw new Error("API error");
  }
  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) =>
  fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });

export const signin = (user: { email: string; password: string }) =>
  fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });

export const addNewProject = (name: string) =>
  fetcher({
    url: "/api/project",
    method: "POST",
    body: {
      name,
    },
    json: true,
  });
