import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  Card,
  Stack,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import UserModal from "./modal";
const Remover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setFinalImageUrl(null);
    setIsUpload(false);
  }

  const handleFileInputChange = (e) => {
    let image = e.target.files[0];
    console.log(image);
    setSelectedFile(image);
  };

  const handleFileUpload = async () => {
    setIsUpload(true);
    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");
    const api_key = "vy8hksGntaHuFTS8mzQVQ2dm";
    await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": api_key,
      },
      body: formData,
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        setFinalImageUrl(url);
        setIsUpload(false);
      })
      .catch();
    setIsUpload(false);
    handleOpen();
  };
  
  return (
    <>
    <Box
      sx={{
        padding:1,
        color:"#42423a"
      }}
    >
      <Typography variant='h3'>Image Background Remover</Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
    
      <Card
        sx={{
          display: "flex",
          alignContent: "center",
          alignContent: "center",
          justifyContent: "center",
          maxWidth: 650,
          background: "#faf7fa",
          color: "#023961",
          padding: "20",
        }}
      >
        <Box>
          <FormControl>
            <Typography variant='h5'>Select a File</Typography>
            <Input
              type="file"
              onChange={handleFileInputChange}
              required
              sx={{}}
            />
            {!isUpload ? (
              <Button
                type="Button"
                onClick={handleFileUpload}
                className="btn btn_upload"
                endIcon={<UploadFileIcon />}
              >
                Upload
              </Button>
            ) : (
              <Button type="Button" onClick={handleFileUpload} disabled={true}>
                <Box sx={{ display: "flex", margin: "5px" }}>
                  <CircularProgress />
                </Box>
              </Button>
            )}
          </FormControl>
        </Box>
      </Card>
      {finalImageUrl && (
        <UserModal open={open} close={handleClose} url={finalImageUrl}/>
      )}
    </Box>
    <Box
      
      sx={{
        padding:1,
        color:"#42423a",
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      
      }}
    >
      <Typography variant='h6'>© Adarsh Priyadarshi</Typography>
    </Box>
    </>
    
  );
};
export default Remover;
