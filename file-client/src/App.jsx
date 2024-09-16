// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = () => {
    fileRef.current.click();
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data.file.filename);
    } catch (error) {
      console.error('Error in uploading file:', error)
    }
    
  }

  // useEffect(() => {
  //   fetchFiles();
  // }, [files]);

  // const fetchFiles = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/files');
  //     setFiles(response.data);
  //   } catch (error) {
  //     console.error('Error fetching files:', error);
  //   }
  // };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   try {
  //     await axios.post('http://localhost:5000/upload', formData);
  //     fetchFiles();
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  // const handleDelete = async (filename) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/delete/${filename}`);
  //     fetchFiles();
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //   }
  // };

  return (
    <div>
      <div className='text-xl text-center font-bold m-2'>
        <p>File Upload and View</p>
      </div>
      <div className='flex justify-center m-4 p-2'>
        <input
          type='file'
          ref={fileRef}
          style={{display: 'none'}}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
          onClick={handleUpload}
        >
          Upload File
        </Button>
      </div>
    </div>
    // <Container>
    //   <Typography variant="h4" gutterBottom>
    //     File Management
    //   </Typography>
    //   <Input
    //     accept="*/*"
    //     id="file-upload"
    //     type="file"
    //     onChange={handleFileChange}
    //   />
    //   <label htmlFor="file-upload">
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       component="span"
    //       startIcon={<UploadIcon />}
    //       onClick={handleUpload}
    //     >
    //       Upload
    //     </Button>
    //   </label>
    //   <List>
    //     {files.map((file) => (
    //       <ListItem key={file.name}>
    //         <ListItemText primary={file.name} />
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           href={`http://localhost:5000${file.path}`}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           View
    //         </Button>
    //         <IconButton
    //           edge="end"
    //           color="secondary"
    //           onClick={() => handleDelete(file.name)}
    //         >
    //           <DeleteIcon />
    //         </IconButton>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Container>
  );
}

export default App;
