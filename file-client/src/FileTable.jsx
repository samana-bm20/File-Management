import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FileOpen, DeleteRounded } from '@mui/icons-material';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:5000';


const FileTable = ({ files, fetchFiles }) => {

  const viewFile = (filePath) => {
    const fullFilePath = `${BACKEND_URL}/${filePath}`;
    window.open(fullFilePath, '_blank', 'noopener,noreferrer');
  };

  const deleteFile = async (filePath) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete/${encodeURIComponent(filePath)}`);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Filename</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>View</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell align="left">{file.name}</TableCell>
              <TableCell align="left">
                <FileOpen color="primary" onClick={() => viewFile(file.path)} sx={{ cursor: 'pointer' }} />
              </TableCell>
              <TableCell align="left">
                <DeleteRounded color='error' onClick={() => deleteFile(file.path)} sx={{ cursor: 'pointer' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FileTable
