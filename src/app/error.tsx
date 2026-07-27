// Must use use cient or it doesnt work
//React automatically searches for the names of these files to make them work, just like Vercel does...
'use client';
//Starting an error component/class/object 
export default function Error({  
   error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <button
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

