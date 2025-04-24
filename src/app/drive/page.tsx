import { Suspense } from "react";
import Drive from "@/views/drive";

export default function DefaultDashboardPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Drive />
    </Suspense>
  );
}
