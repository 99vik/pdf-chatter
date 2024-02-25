import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Expand, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function FullscreenControl({
  url,
  numPages,
}: {
  url: string;
  numPages: number;
}) {
  const { width, ref } = useResizeDetector();
  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <Page
        key={i}
        loading={<div className="h-screen"></div>}
        width={width}
        pageNumber={i}
      />
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Expand strokeWidth={1.5} className="text-zinc-700" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-260px)] w-full ">
        <SimpleBar
          autoHide={false}
          className="flex-1 w-full max-h-[calc(100vh-100px)]"
        >
          <div ref={ref}>
            <Document
              file={url}
              loading={
                <div className="bg-white flex justify-center items-center h-96">
                  <Loader2 size={40} className="text-primary animate-spin" />
                </div>
              }
            >
              {pages}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
}
