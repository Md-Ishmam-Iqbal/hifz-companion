const fetchAyah = async ({ queryKey }) => {
  const apiRes = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun/90/4.json`
  );

  if (!apiRes.ok) {
    throw new Error("ayah api res not ok");
  }

  return apiRes.json();
};

export default fetchAyah;
