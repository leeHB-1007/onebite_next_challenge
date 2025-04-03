import React from "react";

export default async function search({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;
  return <div>search : {q}</div>;
}
