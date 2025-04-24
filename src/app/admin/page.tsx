import { Suspense } from "react";
import Admin from "@/views/auth/admin";

// ==============================|| PAGE ||============================== //

export default function RegisterPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Admin />
    </Suspense>
  );
}
