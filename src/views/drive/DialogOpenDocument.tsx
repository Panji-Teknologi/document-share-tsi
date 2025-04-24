'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// material ui
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'

// third-party
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// project import
import IconButton from '@/components/@extended/IconButton'

// assets
import { CloseOutlined } from '@mui/icons-material';

// types
import { DocumentType } from '@/utils/types';

interface DialogOpenDocumentProps {
  document: DocumentType;
  openDocument: boolean;
  setOpenDocument: Dispatch<SetStateAction<boolean>>
}

const DialogOpenDocument = ({ document, openDocument, setOpenDocument }: DialogOpenDocumentProps) => {
  const title = document.url.split('/')[2] as string;

  const [numPages, setNumPages] = useState<number>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (document.url) {
      setPdfUrl(`/api/upload?name=${encodeURIComponent(title)}`);
    }
  }, [document.url]);

  if (!pdfUrl) {
    return <p>Loading...</p>;
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleClose = () => {
    setOpenDocument(false);
  }

  return (
    <Dialog
      open={openDocument}
      scroll={'paper'}
    >
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <DialogTitle>
            <strong>{title}</strong>
          </DialogTitle>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <DialogContent
        dividers
        onContextMenu={() => {
          window.addEventListener(`contextmenu`, (e) => {
            e.preventDefault();
          });
        }}
        onPaste={(e) => {
          e.preventDefault()
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault()
          return false;
        }}>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ))}
        </Document>
      </DialogContent>
    </Dialog>
  )
}

export default DialogOpenDocument