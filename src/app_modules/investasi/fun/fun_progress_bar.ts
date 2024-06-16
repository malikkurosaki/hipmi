"use server";

export default async function funProgressBar(total: number, beli: number) {
  const t = total;
  const b = beli;

  const progress = (b / t) * 100;
  const pembulatan = Math.round(progress);

  return pembulatan;
}
