import { redirect } from "next/navigation";

// Old public path is retired - admin now lives at an obscure URL.
export default function AdminMoved() {
  redirect("/");
}
