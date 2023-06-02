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

function SelectRange() {
  const [open, setOpen] = useState(false);
  const [startRange, setStartRange] = useState(78);
  const [endRange, setEndRange] = useState(114);
  const [juz, setJuz] = useState(30);
  const [metaData, setMetaData] = useState();
  const [chapters, setChapters] = useState([]);
  const [juzs, setJuzs] = useState();
  const [startRangeAyahList, setStartRangeAyahList] = useState([]);
  const [endRangeAyahList, setEndRangeAyahList] = useState([]);
  const [ayahNumber, setAyahNumber] = useState("");

  const getMetaData = async () => {
    const reqMeta =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json";
    axios
      .get(reqMeta)
      .then((response) => {
        setChapters(response.data.chapters);
        setMetaData(response.data);
        setJuzs(response.data.juzs.references);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMetaData();
  }, []);

  useEffect(() => {
    const link =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json";

    axios.get(link).then((response) => {
      let chapters = response.data.chapters;
      setStartRangeAyahList(chapters[startRange - 1].verses);
      setEndRangeAyahList(chapters[endRange - 1].verses);
    });
  }, [startRange, endRange]);

  const handleStartRange = (event) => {
    const value = event.target.value;
    if (value > endRange) {
      // do nothing
      return;
    } else {
      setStartRange(value);
    }
  };

  const handleEndRange = (event) => {
    const value = event.target.value;
    if (startRange > value) {
      // do nothing
      return;
    } else {
      setEndRange(value);
    }
  };

  const handleSelectAyah = (event) => {
    console.log(event.target.value);
  };

  const handleSelectJuz = (event) => {
    let juzObject = juzs.filter((juz) => {
      return juz.juz === event.target.value;
    })[0];
    let juzSelected = juzObject.juz;
    let juzStartChapter = juzObject.start.chapter;
    let juzEndChapter = juzObject.end.chapter;
    setStartRange(juzStartChapter);
    setEndRange(juzEndChapter);
    setJuz(juzSelected);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = function (event) {
    if (event !== "backdropClick") {
      setOpen(false);
    }
  };

  return {
    metaData,
    startRange,
    endRange,
    juz,
    render: (
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
                <InputLabel id="input-label-start-range">
                  Start Range
                </InputLabel>
                <Select
                  value={startRange}
                  label="StartRange"
                  onChange={handleStartRange}
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
                <SelectAyah sx={{ m: 1 }} variant="filled">
                  <InputLabel
                    id="input-label-start-range-ayah"
                    variant="filled"
                    sx={{ fontSize: "10px" }}
                  >
                    Select Ayah
                  </InputLabel>
                  <Select
                    value={ayahNumber}
                    label="AyahList"
                    onChange={handleSelectAyah}
                    MenuProps={{
                      style: {
                        maxHeight: 175,
                      },
                    }}
                    // disabled={ayahList.length === 0}
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
              </Bounds>
              <Bounds sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="input-label-end-range">End Range</InputLabel>
                <Select
                  value={endRange}
                  label="EndRange"
                  onChange={handleEndRange}
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
                <SelectAyah sx={{ m: 1 }} variant="filled">
                  <InputLabel
                    id="input-label-end-range-ayah"
                    variant="filled"
                    sx={{ fontSize: "10px" }}
                  >
                    Select Ayah
                  </InputLabel>
                  <Select
                    value={ayahNumber}
                    label="AyahList"
                    onChange={handleSelectAyah}
                    MenuProps={{
                      style: {
                        maxHeight: 175,
                      },
                    }}
                    // disabled={ayahList.length === 0}
                  >
                    {endRangeAyahList.map((ayah) => {
                      return (
                        <MenuItem key={ayah.verse} value={ayah.verse}>
                          {ayah.verse}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </SelectAyah>
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
    ),
  };
}

export default SelectRange;
