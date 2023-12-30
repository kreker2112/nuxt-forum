import { useRouter, useState } from "#app";

export const useAuthCookie = () => useCookie("auth_token");

export async function useUser(): Promise<IUser> {
  const authCookie = useAuthCookie().value;
  const user = useState<IUser>("user");

  if (authCookie && !user.value) {
    const { data } = await useFetch(`/api/auth/getByAuthToken`, {
      headers: useRequestHeaders(["cookie"]),
    });

    user.value = data.value as IUser;
  }

  return user.value;
}

export async function userLogout() {
  await useFetch("/api/auth/logout");
  useState("user").value = null;
  await useRouter().push("/");
}

export async function registerWithEmail(
  username: string,
  name: string,
  email: string,
  password: string
): Promise<FormValidation> {
  try {
    const { data, error } = await useFetch<ISession>("/api/auth/register", {
      method: "POST",
      body: { data: { username, name, email, password } },
    });

    if (error.value) {
      type ErrorData = {
        data: ErrorData;
      };

      const errorData = error.value as unknown as ErrorData;
      const errors = errorData.data.data as unknown as string;
      const res = JSON.parse(errors);
      const errorMap = new Map<string, { check: InputValidation }>(
        Object.entries(res)
      );

      return { hasErrors: true, errors: errorMap };
    }

    if (data) {
      useState("user").value = data;
      await useRouter().push("/dashboard");
      return { hasErrors: false, errors: new Map() };
    }
    return { hasErrors: true, errors: new Map() };
  } catch (e: any) {
    console.log("error: " + e.toString());

    return { hasErrors: true, errors: new Map([["exception", e.toString()]]) };
  }
}

export async function loginWithEmail(email: string, password: string) {
  const user = await $fetch<IUser>("/api/auth/login", {
    method: "POST",
    body: { email: email, password: password },
  });
  useState("user").value = user;
  await useRouter().push("/dashboard");
}
