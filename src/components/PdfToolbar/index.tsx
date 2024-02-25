import { Dispatch, SetStateAction } from 'react';
import PageControl from './PageControl';
import ZoomControl from './ZoomControl';
import RotateControl from './RotateControl';
import FullscreenControl from './FullscreenControl';

export default function PdfToolbar({
  setPageNumber,
  pageNumber,
  numPages,
  setCurrentScale,
  currentScale,
}: {
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageNumber: number;
  numPages: number | undefined;
  setCurrentScale: Dispatch<SetStateAction<number>>;
  currentScale: number;
}) {
  return (
    <div className="border-b border-zinc-200 h-12 flex items-center justify-between px-3">
      <PageControl
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        numPages={numPages}
      />
      <div className="flex gap-2">
        <ZoomControl
          setCurrentScale={setCurrentScale}
          currentScale={currentScale}
        />
        <RotateControl />
        <FullscreenControl />
      </div>
    </div>
  );
}
