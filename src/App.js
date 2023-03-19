import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [fullQuran, setFullQuran] = useState();
  const [randomAyah, setRandomAyah] = useState({
    chapter: "",
    verse: "",
    text: "",
  });
  const [lowerBound, setlowerBound] = useState();
  const [upperBound, setupperBound] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getQuran = () => {
    const fullQuranUrl =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf1.json";
    axios
      .get(fullQuranUrl)
      .then((response) => {
        const d = response.data.quran;
        setIsLoading(false);
        setFullQuran(d);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAyah = () => {
    const url =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf1/90/4.json";
    axios
      .get(url)
      .then((response) => {
        const d = response.data;
        setRandomAyah(d);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuran();
    getAyah();
  }, []);

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const randomSurah = randomInRange(78, 114); // (lowerbound,upperbound)

  const handleRandomAyah = () => {
    const surah = fullQuran.filter((surah) => surah.chapter === randomSurah);
    const randomAyah = surah[Math.floor(Math.random() * surah.length)];
    setRandomAyah({ ...randomAyah });
  };

  const handlePrevAyah = () => {
    let currentAyah = randomAyah;
    let currentSurah = fullQuran.filter(
      (surah) => surah.chapter === currentAyah.chapter
    );
    if (currentAyah.verse > 1) {
      let previousVerse = currentAyah.verse - 1;
      let previousAyah = currentSurah.find(
        (surah) => surah.verse === previousVerse
      );
      setRandomAyah({ ...previousAyah });
    } else {
      let previousChapter = currentAyah.chapter - 1;
      let previousSurah = fullQuran.filter(
        (surah) => surah.chapter === previousChapter
      );
      let previousAyah = previousSurah[previousSurah.length - 1];
      previousAyah ? setRandomAyah(previousAyah) : setRandomAyah(currentAyah);
    }
  };

  const handleNextAyah = () => {
    let currentAyah = randomAyah;
    let currentSurah = fullQuran.filter(
      (surah) => surah.chapter === currentAyah.chapter
    );
    let lastAyah = currentSurah[currentSurah.length - 1];
    if (currentAyah.verse < lastAyah.verse) {
      let nextVerse = currentAyah.verse + 1;
      let nextAyah = currentSurah.find((surah) => surah.verse === nextVerse);
      setRandomAyah(nextAyah);
    } else {
      let nextChapter = currentAyah.chapter + 1;
      let nextSurah = fullQuran.filter(
        (surah) => surah.chapter === nextChapter
      );
      let nextAyah = nextSurah[0];
      nextAyah ? setRandomAyah(nextAyah) : setRandomAyah(currentAyah);
    }
  };

  const renderAyah = () => {
    return (
      <div className="cardContainer">
        <button className="btn prevBtn" onClick={handlePrevAyah}>
          &#8592; previous ayah
        </button>
        <div className="card">
          <h1>{randomAyah.text}</h1>
          <p className="meta-card">
            {randomAyah.chapter}:{randomAyah.verse}
          </p>
        </div>
        <button className="btn nextBtn" onClick={handleNextAyah}>
          next ayah &#8594;
        </button>
        <div />
      </div>
    );
  };

  const renderApp = () => {
    return (
      <main>
        <header className="App-header">
          <h1>Hifz Companion</h1>
          <div className="randomButtonContainer">
            <button className="btn" onClick={handleRandomAyah}>
              Random ayah
            </button>
            within range
            <button className="btn">1</button> to
            <button className="btn">114</button>
          </div>
          <div className="cardBlock">
            {isLoading ? <LoadingSpinner /> : renderAyah()}
          </div>
          <h3>
            <ul>
              <li>Functionalities</li>
              <ul>
                <li>
                  Allow choosing the previous ayah or next ayah and display it
                </li>
                <li>
                  Allow hiding and revealing information such as which juz and
                  page and surah and ayah
                </li>
              </ul>
            </ul>
          </h3>
        </header>
      </main>
    );
  };

  return (
    <main className="App">{isLoading ? <LoadingSpinner /> : renderApp()}</main>
  );
}

// return (
//       <div>
//         <header className="App-header">
//           <h1>Random Ayah Generator</h1>
//           <div className="randomButtonContainer">
//             <button className="btn" onClick={handleRandomAyah}>
//               Random ayah
//             </button>
//             within range
//             <button className="btn">1</button> to
//             <button className="btn">114</button>
//           </div>
//           <div className="cardBlock">
//             {isLoading ? <LoadingSpinner /> : renderAyah()}
//           </div>
//           <h3>
//             <ul>
//               <li>Functionalities</li>
//               <ul>
//                 <li>
//                   Allow choosing the previous ayah or next ayah and display it
//                 </li>
//                 <li>
//                   Allow hiding and revealing information such as which juz and
//                   page and surah and ayah
//                 </li>
//               </ul>
//             </ul>
//           </h3>
//         </header>
//       </div>
//     );
//   };

export default App;
