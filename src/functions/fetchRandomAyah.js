const fetchRandomAyah = async ({ queryKey }) => {
  const randomAyah = queryKey[1];

  const apiRes = await fetch(
    `https://api.alquran.cloud/v1/ayah/${randomAyah}/ar.alafasy`
  );

  if (!apiRes.ok) {
    throw new Error("quranAlternate api res not ok");
  }

  return apiRes.json();
};

export default fetchRandomAyah;
