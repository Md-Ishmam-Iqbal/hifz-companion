import { useState } from "react";
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
  "&:hover": {
    backgroundColor: blueGrey[400],
  },
});

const LowerBound = styled(FormControl)({
  width: "100",
});
const UpperBound = styled(FormControl)({
  width: "100",
});

export default function BasicSelect() {
  const [open, setOpen] = useState(false);
  const [lowerBound, setlowerBound] = useState(78);
  const [upperBound, setupperBound] = useState(114);

  const handleLowerBound = (event) => {
    setlowerBound(event.target.value);
  };

  const handleUpperBound = (event) => {
    setupperBound(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  var handleClose = function (event, reason) {
    if (reason !== "backdropClick") {
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
        Set Range
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
                {/*
            Emmet shortcut to generate 1 to 114 
            MenuItem[value={$@1}]{$@1}*114
             */}
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={29}>29</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={31}>31</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={33}>33</MenuItem>
                <MenuItem value={34}>34</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
                <MenuItem value={39}>39</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={41}>41</MenuItem>
                <MenuItem value={42}>42</MenuItem>
                <MenuItem value={43}>43</MenuItem>
                <MenuItem value={44}>44</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={46}>46</MenuItem>
                <MenuItem value={47}>47</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={49}>49</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={51}>51</MenuItem>
                <MenuItem value={52}>52</MenuItem>
                <MenuItem value={53}>53</MenuItem>
                <MenuItem value={54}>54</MenuItem>
                <MenuItem value={55}>55</MenuItem>
                <MenuItem value={56}>56</MenuItem>
                <MenuItem value={57}>57</MenuItem>
                <MenuItem value={58}>58</MenuItem>
                <MenuItem value={59}>59</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={61}>61</MenuItem>
                <MenuItem value={62}>62</MenuItem>
                <MenuItem value={63}>63</MenuItem>
                <MenuItem value={64}>64</MenuItem>
                <MenuItem value={65}>65</MenuItem>
                <MenuItem value={66}>66</MenuItem>
                <MenuItem value={67}>67</MenuItem>
                <MenuItem value={68}>68</MenuItem>
                <MenuItem value={69}>69</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={71}>71</MenuItem>
                <MenuItem value={72}>72</MenuItem>
                <MenuItem value={73}>73</MenuItem>
                <MenuItem value={74}>74</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={76}>76</MenuItem>
                <MenuItem value={77}>77</MenuItem>
                <MenuItem value={78}>78</MenuItem>
                <MenuItem value={79}>79</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={81}>81</MenuItem>
                <MenuItem value={82}>82</MenuItem>
                <MenuItem value={83}>83</MenuItem>
                <MenuItem value={84}>84</MenuItem>
                <MenuItem value={85}>85</MenuItem>
                <MenuItem value={86}>86</MenuItem>
                <MenuItem value={87}>87</MenuItem>
                <MenuItem value={88}>88</MenuItem>
                <MenuItem value={89}>89</MenuItem>
                <MenuItem value={90}>90</MenuItem>
                <MenuItem value={91}>91</MenuItem>
                <MenuItem value={92}>92</MenuItem>
                <MenuItem value={93}>93</MenuItem>
                <MenuItem value={94}>94</MenuItem>
                <MenuItem value={95}>95</MenuItem>
                <MenuItem value={96}>96</MenuItem>
                <MenuItem value={97}>97</MenuItem>
                <MenuItem value={98}>98</MenuItem>
                <MenuItem value={99}>99</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={101}>101</MenuItem>
                <MenuItem value={102}>102</MenuItem>
                <MenuItem value={103}>103</MenuItem>
                <MenuItem value={104}>104</MenuItem>
                <MenuItem value={105}>105</MenuItem>
                <MenuItem value={106}>106</MenuItem>
                <MenuItem value={107}>107</MenuItem>
                <MenuItem value={108}>108</MenuItem>
                <MenuItem value={109}>109</MenuItem>
                <MenuItem value={110}>110</MenuItem>
                <MenuItem value={111}>111</MenuItem>
                <MenuItem value={112}>112</MenuItem>
                <MenuItem value={113}>113</MenuItem>
                <MenuItem value={114}>114</MenuItem>
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
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={29}>29</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={31}>31</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={33}>33</MenuItem>
                <MenuItem value={34}>34</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
                <MenuItem value={38}>38</MenuItem>
                <MenuItem value={39}>39</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={41}>41</MenuItem>
                <MenuItem value={42}>42</MenuItem>
                <MenuItem value={43}>43</MenuItem>
                <MenuItem value={44}>44</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={46}>46</MenuItem>
                <MenuItem value={47}>47</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={49}>49</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={51}>51</MenuItem>
                <MenuItem value={52}>52</MenuItem>
                <MenuItem value={53}>53</MenuItem>
                <MenuItem value={54}>54</MenuItem>
                <MenuItem value={55}>55</MenuItem>
                <MenuItem value={56}>56</MenuItem>
                <MenuItem value={57}>57</MenuItem>
                <MenuItem value={58}>58</MenuItem>
                <MenuItem value={59}>59</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={61}>61</MenuItem>
                <MenuItem value={62}>62</MenuItem>
                <MenuItem value={63}>63</MenuItem>
                <MenuItem value={64}>64</MenuItem>
                <MenuItem value={65}>65</MenuItem>
                <MenuItem value={66}>66</MenuItem>
                <MenuItem value={67}>67</MenuItem>
                <MenuItem value={68}>68</MenuItem>
                <MenuItem value={69}>69</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={71}>71</MenuItem>
                <MenuItem value={72}>72</MenuItem>
                <MenuItem value={73}>73</MenuItem>
                <MenuItem value={74}>74</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={76}>76</MenuItem>
                <MenuItem value={77}>77</MenuItem>
                <MenuItem value={78}>78</MenuItem>
                <MenuItem value={79}>79</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={81}>81</MenuItem>
                <MenuItem value={82}>82</MenuItem>
                <MenuItem value={83}>83</MenuItem>
                <MenuItem value={84}>84</MenuItem>
                <MenuItem value={85}>85</MenuItem>
                <MenuItem value={86}>86</MenuItem>
                <MenuItem value={87}>87</MenuItem>
                <MenuItem value={88}>88</MenuItem>
                <MenuItem value={89}>89</MenuItem>
                <MenuItem value={90}>90</MenuItem>
                <MenuItem value={91}>91</MenuItem>
                <MenuItem value={92}>92</MenuItem>
                <MenuItem value={93}>93</MenuItem>
                <MenuItem value={94}>94</MenuItem>
                <MenuItem value={95}>95</MenuItem>
                <MenuItem value={96}>96</MenuItem>
                <MenuItem value={97}>97</MenuItem>
                <MenuItem value={98}>98</MenuItem>
                <MenuItem value={99}>99</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={101}>101</MenuItem>
                <MenuItem value={102}>102</MenuItem>
                <MenuItem value={103}>103</MenuItem>
                <MenuItem value={104}>104</MenuItem>
                <MenuItem value={105}>105</MenuItem>
                <MenuItem value={106}>106</MenuItem>
                <MenuItem value={107}>107</MenuItem>
                <MenuItem value={108}>108</MenuItem>
                <MenuItem value={109}>109</MenuItem>
                <MenuItem value={110}>110</MenuItem>
                <MenuItem value={111}>111</MenuItem>
                <MenuItem value={112}>112</MenuItem>
                <MenuItem value={113}>113</MenuItem>
                <MenuItem value={114}>114</MenuItem>

                {/*
          Emmet shortcut to generate 1 to 114 
          MenuItem[value={$@1}]{$@1}*114
           */}
              </Select>
            </UpperBound>
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
