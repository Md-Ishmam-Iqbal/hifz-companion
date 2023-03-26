import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import RangeForms from "./components/RangeForms";
import { Button } from "@mui/material";
import {
  grey,
  cyan,
  teal,
  indigo,
  blue,
  lightBlue,
  green,
  amber,
  blueGrey,
  brown,
  common,
  deepOrange,
  deepPurple,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import { ArrowForwardIos } from "@mui/icons-material";
import { ArrowBackIos } from "@mui/icons-material";
import { styled } from "@mui/system";

const RandomButton = styled(Button)({
  backgroundColor: blueGrey[400],
  fontSize: "60%",
  padding: "10px",
  margin: "auto",
  marginBottom: "2%",
  borderWidth: "0.2cm",
  borderColor: "black",
  "&:hover": {
    backgroundColor: blueGrey[500],
  },
});

const ColorButton = styled(Button)({
  backgroundColor: blueGrey[400],
  fontSize: "50%",
  marginBottom: "2%",
  borderWidth: "0.2cm",
  "&:hover": {
    backgroundColor: blueGrey[400],
  },
});

function App() {
  const [fullQuran, setFullQuran] = useState();
  const [randomAyah, setRandomAyah] = useState({
    chapter: "",
    verse: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { lowerBound, upperBound, render } = RangeForms();

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
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomSurah = randomInRange(lowerBound, upperBound);

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
      <div>
        <div className="card">
          <h2>{randomAyah.text}</h2>
          <p className="meta-card">
            {randomAyah.chapter}:{randomAyah.verse}
          </p>
        </div>
        <div />
      </div>
    );
  };

  const renderApp = () => {
    return (
      <main>
        <div className="App-wrapper">
          <header>Hifz Companion</header>
          <div className="rangesWrapper">{render}</div>
          <div className="randomAyahButtonContainer">
            <RandomButton
              variant="contained"
              size="small"
              onClick={handleRandomAyah}
            >
              Random ayah
            </RandomButton>
          </div>
          <div className="prevNextContainer">
            <ColorButton
              variant="contained"
              size="small"
              disableElevation
              onClick={handlePrevAyah}
            >
              <ArrowBackIos />
              previous ayah
            </ColorButton>

            <ColorButton
              variant="contained"
              size="small"
              disableElevation
              onClick={handleNextAyah}
            >
              next ayah
              <ArrowForwardIos />
            </ColorButton>
          </div>
          <div className="mainContentWrapper">
            {isLoading ? <LoadingSpinner /> : renderAyah()}
          </div>
          <div className="rangeContainer"></div>
          <h5 className="functionalities">
            <ul>
              <li>Functionalities</li>
              <ul>
                <li>
                  <i>
                    Only Juz 30 (Surah 78 to 114) set up in Random Ayah
                    functionality
                  </i>
                </li>
                <li>
                  <i>Need to add Range editing</i>
                </li>
              </ul>
            </ul>
          </h5>
        </div>
      </main>
    );
  };

  return (
    <main className="App">{isLoading ? <LoadingSpinner /> : renderApp()}</main>
  );
}

export default App;
