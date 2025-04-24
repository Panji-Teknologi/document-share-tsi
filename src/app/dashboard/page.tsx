import { Suspense } from "react";
import Dashboard from "@/views/dashboard";

export default function DefaultDashboardPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Dashboard />
    </Suspense>
  );
}
