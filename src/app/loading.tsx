import { Loader, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="h-16 w-16 animate-spin" />
      </div>
    </>
  );
}
