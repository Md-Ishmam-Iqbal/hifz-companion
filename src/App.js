import React, { useState, useEffect } from "react";

import axios from "axios";

import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
import SelectRange from "./components/SelectRange";

// MUI imports start
import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { Button } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
// MUI imports end

// MUI styles start
const RandomButton = styled(Button)({
  backgroundColor: blueGrey[400],
  fontSize: "60%",
  padding: "10px",
  margin: "auto",
  marginBottom: "2%",
  borderWidth: "0.2cm",
  borderColor: "black",
  color: "white",
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: blueGrey[500],
  },
});

const ColorButton = styled(Button)({
  backgroundColor: blueGrey[400],
  fontSize: "50%",
  width: "20%",
  color: "white",
  margin: " 0 10% 0 10%",
  top: "10px",
  borderWidth: "0.2cm",
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: blueGrey[600],
  },
});

const RevealButton = styled(Button)({
  backgroundColor: "rgba(91, 115, 128, 0.612)",
  fontSize: "60%",
  border: "solid black",
  color: "aliceblue",
  margin: "2%",
  width: "30%",
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: blueGrey[600],
  },
});
// MUI styles end

function App() {
  const [fullQuran, setFullQuran] = useState();
  const [randomAyah, setRandomAyah] = useState({
    chapter: "",
    verse: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [surahMetaData, setSurahMetaData] = useState({
    chapter: 90,
    name: "Al-Balad",
    englishname: "The City",
    arabicname: "سُوْرَةُ الْبَلَدِ",
    revelation: "Mecca",
    verses: [],
  });
  const [toggleAnswerText, setToggleAnswerText] = useState("Reveal Answer");

  const { metaData, startRangeChapter, endRangeChapter, render } =
    SelectRange();

  const getData = async () => {
    setIsLoading(true);
    const reqFullQuran = await axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun.json"
    );
    const reqAyah = await axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-qurandoorinonun/90/4.json"
    );

    axios
      .all([reqFullQuran, reqAyah])
      .then(
        axios.spread((...responses) => {
          setFullQuran(responses[0].data.quran);
          setRandomAyah(responses[1].data);
          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomSurah = randomInRange(startRangeChapter, endRangeChapter);

  const handleRandomAyah = () => {
    hideAnswer();
    const surah = fullQuran.filter((surah) => surah.chapter === randomSurah);
    const randomAyah = surah[Math.floor(Math.random() * surah.length)];
    setRandomAyah({ ...randomAyah });
  };

  const handlePrevAyah = () => {
    displayAnswer();
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
    displayAnswer();
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

  const displayAnswer = () => {
    let currentChapter = metaData.chapters.find(
      (e) => e.chapter === randomAyah.chapter
    );
    setSurahMetaData(currentChapter);
  };

  const revealAnswer = () => {
    document.getElementById("answerCover").style.opacity = `0`;
    document.getElementById("answerContainer").style.borderColor = `aliceblue`;
    document.getElementById("answerContainer").style.borderStyle = `outset`;
    setToggleAnswerText("Hide answer");
  };

  const hideAnswer = () => {
    document.getElementById("answerCover").style.opacity = `1`;
    document.getElementById(
      "answerContainer"
    ).style.borderColor = `rgb(24, 40, 40)`;
    document.getElementById("answerContainer").style.borderStyle = `inset`;
    setToggleAnswerText("Reveal answer");
  };

  const handleToggleAnswer = () => {
    displayAnswer();
    const opacity = document.getElementById("answerCover").style.opacity;
    if (opacity !== "0") {
      revealAnswer();
    } else {
      hideAnswer();
    }
  };

  const renderAyah = () => {
    return (
      <div>
        <div className="card">
          <h2>{randomAyah.text}</h2>
          <p className="meta-card">
            ({randomAyah.chapter}:{randomAyah.verse})
          </p>
        </div>
        <div id="answerContainer">
          <div id="answerCover">Answer</div>
          <div id="answerWrapper">
            {`${surahMetaData.name} : ${randomAyah.verse}`}
          </div>
        </div>
        <div id="revealBtn">
          <RevealButton
            variant="contained"
            size="small"
            onClick={handleToggleAnswer}
          >
            {toggleAnswerText}
          </RevealButton>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="App-wrapper">
        <header>Hifz Companion</header>
        <div className="selectContainer">
          {render}
          <div className="boundsWrapper">
            {startRangeChapter}&nbsp;-&nbsp;{endRangeChapter}
          </div>
        </div>
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
            onClick={handleNextAyah}
          >
            <ArrowBackIos />
            next ayah
          </ColorButton>
          <div className={`${isLoading ? "" : "hidden"}`}>
            <LoadingSpinner />
          </div>
          <ColorButton
            variant="contained"
            size="small"
            disableElevation
            onClick={handlePrevAyah}
          >
            previous ayah
            <ArrowForwardIos />
          </ColorButton>
        </div>
        <div className="mainContentWrapper">
          {isLoading ? "" : renderAyah()}
        </div>
      </div>
    </main>
  );
}

export default App;
