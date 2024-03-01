import DropZone from './FileDropzone';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function UploadButton({
  userUploadLimit,
}: {
  userUploadLimit: 'NORMAL' | 'PENDING' | 'VIP';
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Upload file</Button>
      </DialogTrigger>
      <DialogContent>
        <DropZone userUploadLimit={userUploadLimit} />
      </DialogContent>
    </Dialog>
  );
}
