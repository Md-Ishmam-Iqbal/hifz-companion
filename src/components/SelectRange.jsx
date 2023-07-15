import { useState, useEffect } from "react";
import axios from "axios";

// MUI imports start
import { styled } from "@mui/system";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Box, Select } from "@mui/material";
// MUI imports end

// MUI styles start
const RangeDialogButton = styled(Button)({
  backgroundColor: blueGrey[300],
  fontSize: "80%",
  color: "white",
  borderColor: "black",
  textShadow: "revert-layer",
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: blueGrey[400],
  },
});

const Bounds = styled(FormControl)({
  width: "8%",
});
const SelectAyah = styled(FormControl)({
  width: "90%",
});
const SelectJuz = styled(FormControl)({
  width: "50%",
});
// MUI styles end

function SelectRange({
  metadata,
  startRange,
  endRange,
  updateStartRange,
  updateEndRange,
}) {
  const [open, setOpen] = useState(false);
  const [showStartAyahs, setShowStartAyahs] = useState(false);
  const [showEndAyahs, setShowEndAyahs] = useState(false);

  const handleClickStart = () => {
    setShowStartAyahs(true);
  };

  const handleClickEnd = () => {
    setShowEndAyahs(true);
  };

  const [startRangeAyahList, setStartRangeAyahList] = useState([]);
  const [endRangeAyahList, setEndRangeAyahList] = useState([]);
  const [juz, setJuz] = useState("");
  useEffect(() => {
    const link =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json";

    axios.get(link).then((response) => {
      let chapters = response.data.chapters;
      const startRangeChapterIndex = startRange.chapter - 1;
      const endRangeChapterIndex = endRange.chapter - 1;
      setStartRangeAyahList(chapters[startRangeChapterIndex].verses);
      setEndRangeAyahList(chapters[endRangeChapterIndex].verses);
    });
  }, [startRange.chapter, endRange.chapter]);

  const chapters = metadata.chapters;
  const juzs = metadata.juzs.references;

  const handleStartRangeChapter = (event) => {
    const value = event.target.value;
    if (value > endRange.chapter) {
      alert("Select a value lesser than end range");
    } else {
      updateStartRange({ chapter: value, verse: 1 });
    }
  };

  const handleEndRangeChapter = (event) => {
    const value = event.target.value;
    if (startRange.chapter > value) {
      alert("Select a value greater than start range");
    } else {
      updateEndRange({ chapter: value, verse: 1 });
    }
  };

  const handleSelectStartRangeAyah = (event) => {
    updateStartRange({ ...startRange, verse: event.target.value });
  };
  const handleSelectEndRangeAyah = (event) => {
    updateEndRange({ ...endRange, verse: event.target.value });
  };

  const handleSelectJuz = (event) => {
    let juzObject = juzs.filter((juz) => {
      return juz.juz === event.target.value;
    })[0];
    let juzSelected = juzObject.juz;
    updateStartRange(juzObject.start);
    updateEndRange(juzObject.end);
    setJuz(juzSelected);
    setShowStartAyahs(true);
    setShowEndAyahs(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = function (event) {
    if (event !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div className="rangesDialogContainer">
      <RangeDialogButton
        variant="contained"
        size="large"
        onClick={handleClickOpen}
      >
        Select Range
      </RangeDialogButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose start range and end range</DialogTitle>
        <DialogContent>
          <Box
            minWidth={30}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bounds sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="input-label-start-range">Start Range</InputLabel>
              <Select
                value={startRange.chapter}
                label="StartRangeChapter"
                onChange={handleStartRangeChapter}
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {chapters.map((chapter) => {
                  return (
                    <MenuItem
                      onClick={handleClickStart}
                      key={chapter.chapter}
                      value={chapter.chapter}
                    >
                      {chapter.chapter}
                    </MenuItem>
                  );
                })}
              </Select>
              {showStartAyahs && (
                <SelectAyah sx={{ m: 1 }} variant="filled">
                  <InputLabel
                    id="input-label-start-range-ayah"
                    variant="filled"
                    sx={{ fontSize: "10px" }}
                  >
                    Select Ayah
                  </InputLabel>
                  <Select
                    value={startRange.verse}
                    label="AyahList"
                    onChange={handleSelectStartRangeAyah}
                    MenuProps={{
                      style: {
                        maxHeight: 175,
                      },
                    }}
                  >
                    {startRangeAyahList.map((ayah) => {
                      return (
                        <MenuItem key={ayah.verse} value={ayah.verse}>
                          {ayah.verse}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </SelectAyah>
              )}
            </Bounds>
            <Bounds sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="input-label-end-range">End Range</InputLabel>
              <Select
                onClick={handleClickEnd}
                value={endRange.chapter}
                label="EndRangeChapter"
                onChange={handleEndRangeChapter}
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {chapters.map((chapter) => {
                  return (
                    <MenuItem key={chapter.chapter} value={chapter.chapter}>
                      {chapter.chapter}
                    </MenuItem>
                  );
                })}
              </Select>
              {showEndAyahs && (
                <SelectAyah sx={{ m: 1 }} variant="filled">
                  <InputLabel
                    id="input-label-end-range-ayah"
                    variant="filled"
                    sx={{ fontSize: "10px" }}
                  >
                    Select Ayah
                  </InputLabel>
                  <Select
                    value={endRange.verse}
                    label="AyahList"
                    onChange={handleSelectEndRangeAyah}
                    MenuProps={{
                      style: {
                        maxHeight: 175,
                      },
                    }}
                  >
                    {endRangeAyahList.map((ayah, index) => {
                      return (
                        <MenuItem key={ayah.verse} value={ayah.verse}>
                          {ayah.verse}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </SelectAyah>
              )}
            </Bounds>
          </Box>
          <Box
            minWidth={30}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <SelectJuz sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="input-label">Select Juz</InputLabel>
              <Select
                value={juz}
                label="SelectJuz"
                onChange={handleSelectJuz}
                MenuProps={{
                  style: {
                    maxHeight: 300,
                  },
                }}
              >
                {juzs &&
                  juzs.map((juz) => {
                    return (
                      <MenuItem key={juz.juz} value={juz.juz}>
                        {juz.juz}
                      </MenuItem>
                    );
                  })}
              </Select>
            </SelectJuz>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectRange;
