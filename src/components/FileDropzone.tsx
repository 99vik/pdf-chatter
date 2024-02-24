'use client';

import { File, Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Progress } from './ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

export default function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(
    null
  );
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload } = useUploadThing('pdfUploader', {
    onUploadError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Error uploading PDF.',
        description: err.message,
      });
      setUploadStatus('error');
    },
    onClientUploadComplete: (fileid) => {
      setUploadStatus('success');
      setTimeout(() => {
        router.push(`/dashboard/${fileid[0].serverData.fileId}`);
      }, 600);
    },
  });

  function startLoadAnimation() {
    const interval = setInterval(() => {
      setUploadProgress((progress) => {
        if (progress === 95 || progress === 100) {
          clearInterval(interval);
          return progress;
        }
        return progress + 5;
      });
    }, 500);
  }

  async function handleDrop(acceptedFile: File) {
    setFile(acceptedFile);
    startLoadAnimation();
    await startUpload([acceptedFile]);
    setUploadProgress(100);
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={(acceptedFiles) => handleDrop(acceptedFiles[0])}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="p-6">
          <div
            className="bg-zinc-100 border relative flex flex-col items-center gap-1 justify-center border-zinc-300 h-56 border-dashed rounded-xl "
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {file ? (
              <>
                <div className="w-full flex flex-col gap-4 items-center px-8">
                  <div className="border w-fit bg-white border-zinc-300 flex items-center justify-start px-3 gap-2 divide-x-2 divide-zinc-200 divide rounded-lg">
                    <File
                      size={18}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                    <p className="pl-2 py-2 font-semibold text-sm text-zinc-600">
                      {file.name}
                    </p>
                  </div>
                  {uploadStatus ? (
                    uploadStatus === 'success' ? (
                      <p className="font-semibold text-sm text-green-800 -mb-3 flex items-center gap-2">
                        <Loader2 className="animate-spin" size={12} />
                        Upload successful, redirecting..
                      </p>
                    ) : (
                      <p className="font-semibold text-sm text-red-800 -mb-3 flex items-center gap-2">
                        Upload failed.
                      </p>
                    )
                  ) : (
                    <p className="font-semibold text-sm text-zinc-600 -mb-3 flex items-center gap-2">
                      <Loader2 className="animate-spin" size={12} />
                      Uploading file..
                    </p>
                  )}

                  <Progress
                    value={uploadProgress}
                    color={
                      uploadStatus
                        ? uploadStatus === 'success'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                        : ''
                    }
                    className="bg-zinc-300 border h-2 "
                  />
                </div>
              </>
            ) : (
              <>
                <UploadCloud
                  className="text-zinc-500"
                  size={36}
                  strokeWidth={1}
                />
                <p className="text-zinc-600">
                  <span className="font-semibold">Click</span> or{' '}
                  <span className="font-semibold">drag</span> to upload a file.
                </p>
              </>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
