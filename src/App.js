import './App.css';
import { useRef, useState } from 'react';
import Cutout from './cutout.png';
import { Button, Slider } from '@mui/material';
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import html2canvas from "html2canvas";

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


function App() {
  const [background, setBackground] = useState(null);
  const [repeat, setRepeat] = useState("repeat"); // Default repeat
  const [size, setSize] = useState("auto"); // Default size
  const ToCaptureRef = useRef() // ref

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackground(imageUrl);
    }
  };

  const captureScreenshot = () => {
    html2canvas(ToCaptureRef.current, { useCORS: true }).then((canvas) => {
      var dataURL = canvas.toDataURL("image/png");

      var a = document.createElement("a");
      a.href = dataURL;
      a.download = "screenshot.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div>
      <div ref={ToCaptureRef}
        className="h-screen w-full flex flex-col items-center justify-center p-5"
        style={{
          backgroundImage: background ? `url(${background})` : "none",
          backgroundRepeat: repeat,
          backgroundSize: size,
          backgroundPosition: "center",
          height: '100%',
          width: '100vw'
        }}
      >
        {!background && <div className='file-uploader'>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload Pattern
          </label>

          <input id="file-upload" type="file" onChange={handleImageUpload} />
        </div>}


        {background && <>
          <img src={Cutout} width="100%" /></>}

      </div>

      {background && <><div className="control-bar">
        <PrettoSlider
          aria-label="Temperature"
          defaultValue={30}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={10}
          marks
          onChange={(e) => setSize(e.target.value)}
          min={10}
          max={200}
        />

      </div>
        <button className="download-btn" onClick={() => captureScreenshot()}><DownloadIcon /></button>
        <button className="delete-btn" onClick={() => setBackground(null)}><ClearIcon /></button></>}
    </div>
  );
}

export default App;
