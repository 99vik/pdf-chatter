'use client';

import { File, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Progress } from './ui/progress';
import { useUploadThing } from '@/lib/uploadthing';

export default function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing('pdfUploader', {
    onUploadError: (err) => console.log(err.message),
  });

  async function handleDrop(acceptedFile: File) {
    setFile(acceptedFile);
    const res = await startUpload([acceptedFile]);
    console.log(res);
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
                <div className="w-full flex flex-col gap-2 items-center px-8">
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
                  <Progress
                    value={33}
                    className="bg-zinc-300 border my-3 h-2"
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