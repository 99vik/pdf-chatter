'use client';

import { Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';
import SimpleBar from 'simplebar-react';
import { useState } from 'react';
import PdfToolbar from './PdfToolbar';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfRender({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>();
  const [currentScale, setCurrentScale] = useState<number>(1);
  const [currentRotatation, setCurrentRotation] = useState<number>(0);
  const { width, ref } = useResizeDetector();

  return (
    <div className="col-span-3 flex flex-col">
      <h1 className="text-lg my-1 text-center text-zinc-600 font-semibold">
        {title.replace('.pdf', '')}
      </h1>
      <div className="bg-white flex-1 mx-2 sm:mx-4 lg:mx-6 mb-3 rounded-lg border border-zinc-200 shadow-lg flex flex-col">
        <PdfToolbar
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          numPages={numPages}
          setCurrentScale={setCurrentScale}
          currentScale={currentScale}
          setCurrentRotation={setCurrentRotation}
        />
        <SimpleBar
          autoHide={false}
          className="flex-1 max-h-[calc(100vh-61.6px-28px-48.8px-25px)]"
        >
          <div ref={ref} className="flex-1">
            <Document
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={url}
              loading={
                <div className="bg-white flex justify-center items-center h-96">
                  <Loader2 size={40} className="text-primary animate-spin" />
                </div>
              }
            >
              <Page
                loading={
                  <div className="bg-white flex justify-center items-center h-96">
                    <Loader2 size={40} className="text-primary animate-spin" />
                  </div>
                }
                rotate={currentRotatation}
                scale={currentScale}
                width={width ? width : 1}
                pageNumber={pageNumber}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
