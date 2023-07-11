const fetchQuranAlternate = async ({ queryKey }) => {
  const apiRes = await fetch(`http://api.alquran.cloud/v1/quran/quran-uthmani`);

  if (!apiRes.ok) {
    throw new Error("quranAlternate api res not ok");
  }

  return apiRes.json();
};

export default fetchQuranAlternate;
