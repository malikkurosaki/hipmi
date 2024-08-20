import { Stack } from "@mantine/core";
// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import styles from "./styles.module.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

export function ComponentInvestasi_FrameFileView({
  fileId,
  path,
}: {
  fileId: string;
  path: string;
}) {
  return (
    <Stack>
      {/* <MyFile file={path + fileId} /> */}
    </Stack>
  );
}

// function MyFile({ file }: { file: any }) {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         className={styles.file_view}
//         file={file}
//         onLoadSuccess={onDocumentLoadSuccess}

//       >
//         <Page className={styles.page} pageNumber={pageNumber} />
//       </Document>
//       {/* <p>
//         Page {pageNumber} of {numPages}
//       </p> */}
//     </div>
//   );
// }
