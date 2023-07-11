const fetchQuran = async ({ queryKey }) => {
  const apiRes = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun.json`
  );

  if (!apiRes.ok) {
    throw new Error("quran api res not ok");
  }

  return apiRes.json();
};

export default fetchQuran;
