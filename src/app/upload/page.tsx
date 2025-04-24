import { Suspense } from "react";
import Upload from "@/views/upload";

export default function DefaultDashboardPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Upload />
    </Suspense>
  );
}
