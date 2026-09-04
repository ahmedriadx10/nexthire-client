"use server";

import { notFound, redirect } from "next/navigation";
import { auth } from "../auth";

import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getAuthHeader = async () => {
  try {
    const token = await auth.api.getToken({
      headers: await headers(),
    });
    const authHeader = token?.token
      ? {
          authorization: `Bearer ${token?.token}`,
        }
      : {};
    return authHeader;
  } catch (error) {
    // console.log("Guest user, no token found");
    return {};
  }
};

//this for fetching data from the server without any authorization headers

export const fetchData = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  return handleStatusCode(res);
};

// this for fetching data from the server with authorization headers
export const protectedFetchData = async (path) => {
  const authHeader = await getAuthHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...authHeader,
    },
  });

  return handleStatusCode(res);
};

// this function for mutating data on the server with authorization headers

export const serverMutation = async (path, data, method = "POST") => {
  const authHeader = await getAuthHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      ...authHeader,
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

// this function for deleting data on the server with authorization headers though i can use serverMutation function for deleting data but i created this function for better understanding of the code

export const serverDataDelete = async (path, method = "DELETE") => {
  const authHeader = await getAuthHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      ...authHeader,
    },
  });

  return handleStatusCode(res);
};

// this function for handling status code
const handleStatusCode = (response) => {
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  if (response.status === 401) {
    redirect("/unauthorized");
  } else if (response.status === 403) {
    redirect("/forbidden");
  }
  if (response.status === 404) {
    notFound();
  }

  return response.json();
};



// here we can also add a status handle for fetch or protected fetch data 