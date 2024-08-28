import { Stack, Text } from "@mantine/core";
// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import styles from "./styles.module.css";
// import { GlobalWorkerOptions } from "pdfjs-dist";

// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.js`;

export function Investasi_ViewFileViewer({
  fileId,
  path,
}: {
  fileId: string;
  path: string;
}) {
  return (
    <Stack>
      Maintenance
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

//   return<>
//   <Text>Maintenance</Text>
//   </>

//   return (
//     <div>
//       <Document
//         // className={styles.file_view}
//         file={file}
//         onLoadSuccess={onDocumentLoadSuccess}

//       >
//         <Page  pageNumber={pageNumber} />
//       </Document>
//       {/* <p>
//         Page {pageNumber} of {numPages}
//       </p> */}
//     </div>
//   );
// }
