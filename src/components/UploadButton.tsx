import DropZone from './FileDropzone';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function UploadButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Upload file</Button>
      </DialogTrigger>
      <DialogContent>
        <DropZone />
      </DialogContent>
    </Dialog>
  );
}
