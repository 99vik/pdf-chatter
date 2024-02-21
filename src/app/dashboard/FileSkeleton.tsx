export default function FileSKeleton() {
  let skeletons = [];
  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <div
        key={i}
        className="bg-zinc-300/60 animate-pulse rounded-lg py-3 px-3 shadow group transition h-[97px]"
      ></div>
    );
  }
  return skeletons;
}
