"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFViewer = ({ isOpen, setIsOpen, pdfUrl }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000",
      padding: 0,
      maxWidth: "90%", // Ensure the modal is responsive
      width: "800px", // Set a default width
      maxHeight: "70%", // Allow the modal to adjust its height
    },
  };

  const handleCloseModal = () => setIsOpen(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: customStyles.content,
        }}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        contentLabel="PDF Modal"
      >
        <div
          style={{
            height: "100%",
            overflow: "auto",
            border: "1px solid #ddd",
            width: "100%",
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      </Modal>
    </div>
  );
};

export default PDFViewer;
