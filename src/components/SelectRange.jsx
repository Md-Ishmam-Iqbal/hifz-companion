import { useState, useEffect } from "react";
import axios from "axios";
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
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";

const RangeDialogButton = styled(Button)({
  backgroundColor: blueGrey[300],
  fontSize: "80%",
  color: "darkslategrey",
  borderColor: "black",
  textShadow: "revert-layer",
  fontFamily: "Poppins",
  "&:hover": {
    backgroundColor: blueGrey[400],
  },
});

const LowerBound = styled(FormControl)({
  width: "8%",
});
const UpperBound = styled(FormControl)({
  width: "8%",
});
const SelectJuz = styled(FormControl)({
  width: "50%",
});

function SelectRange() {
  const [open, setOpen] = useState(false);
  const [lowerBound, setLowerBound] = useState(78);
  const [upperBound, setUpperBound] = useState(114);
  const [juz, setJuz] = useState(30);
  const [metaData, setMetaData] = useState();
  const [chapters, setChapters] = useState();
  const [juzs, setJuzs] = useState();

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

  const handleLowerBound = (event) => {
    setLowerBound(event.target.value);
  };

  const handleUpperBound = (event) => {
    setUpperBound(event.target.value);
  };

  const handleSelectJuz = (event) => {
    let juzObject = juzs.filter((juz) => {
      return juz.juz === event.target.value;
    })[0];
    let juzSelected = juzObject.juz;
    let juzStartChapter = juzObject.start.chapter;
    let juzEndChapter = juzObject.end.chapter;
    setLowerBound(juzStartChapter);
    setUpperBound(juzEndChapter);
    setJuz(juzSelected);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  var handleClose = function (event, reason) {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return {
    metaData,
    lowerBound,
    upperBound,
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
              <LowerBound sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="input-label">Start Range</InputLabel>
                <Select
                  value={lowerBound}
                  label="LowerBound"
                  onChange={handleLowerBound}
                  MenuProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                >
                  {chapters &&
                    chapters.map((chapter) => {
                      return (
                        <MenuItem key={chapter.chapter} value={chapter.chapter}>
                          {chapter.chapter}
                        </MenuItem>
                      );
                    })}
                </Select>
              </LowerBound>

              <UpperBound sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="input-label">End Range</InputLabel>
                <Select
                  value={upperBound}
                  label="UpperBound"
                  onChange={handleUpperBound}
                  MenuProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                >
                  {chapters &&
                    chapters.map((chapter) => {
                      return (
                        <MenuItem key={chapter.chapter} value={chapter.chapter}>
                          {chapter.chapter}
                        </MenuItem>
                      );
                    })}
                </Select>
              </UpperBound>
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
