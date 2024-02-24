import PdfToolbar from './PdfToolbar';

export default function PdfRender({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <div className="col-span-3 flex flex-col">
      <h1 className="text-lg my-1 text-center text-zinc-600 font-semibold">
        {title.replace('.pdf', '')}
      </h1>
      <div className="bg-white flex-1 mx-6 mb-3 rounded-lg border border-zinc-200 shadow-lg flex flex-col">
        <PdfToolbar />
        <div className="flex-1">
          <p>pdf</p>
        </div>
      </div>
    </div>
  );
}
