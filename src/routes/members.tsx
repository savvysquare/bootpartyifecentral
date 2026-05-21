import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — BOOT Party Ife Central" },
      { name: "description", content: "Internal members registry for BOOT Party Ife Central." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MembersPage,
});

type Row = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  ward: string | null;
  address: string | null;
  gender: string | null;
  age_range: string | null;
  message: string | null;
  created_at: string;
};

const MEMBERS_PASSWORD = "sterces";

const COLUMNS: { key: keyof Row; label: string }[] = [
  { key: "created_at", label: "Submitted" },
  { key: "full_name", label: "Full name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "ward", label: "Ward" },
  { key: "gender", label: "Gender" },
  { key: "age_range", label: "Age range" },
  { key: "address", label: "Address" },
  { key: "message", label: "Message" },
];

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(rows: Row[]): string {
  const header = COLUMNS.map((c) => c.label).join(",");
  const body = rows.map((r) => COLUMNS.map((c) => escapeCsv(r[c.key])).join(",")).join("\n");
  return `${header}\n${body}\n`;
}

function toTxt(rows: Row[]): string {
  return rows
    .map((r, i) => {
      const lines = COLUMNS.map((c) => `  ${c.label}: ${r[c.key] ?? ""}`).join("\n");
      return `#${i + 1}\n${lines}`;
    })
    .join("\n\n");
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function MembersPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();

    if (password !== MEMBERS_PASSWORD) {
      toast.error("Invalid password");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRows(data ?? []);
    } catch (err: any) {
      toast.error(`Failed to load: ${err?.message ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  if (!rows) {
    return (
      <div className="min-h-screen grid place-items-center bg-background p-6">
        <form
          onSubmit={unlock}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
        >
          <div className="flex items-center gap-2 text-primary">
            <Lock className="size-5" />
            <h1 className="text-xl font-semibold">Members access</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the password to view registrations.
          </p>
          <div className="mt-6 grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Loading…" : "Unlock"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Ife Central registrations</h1>
            <p className="mt-1 text-muted-foreground">
              {rows.length} {rows.length === 1 ? "entry" : "entries"} recorded.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => download("ife-central-members.csv", toCsv(rows), "text/csv")}
              disabled={rows.length === 0}
            >
              <Download className="mr-1 size-4" /> Download CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => download("ife-central-members.txt", toTxt(rows), "text/plain")}
              disabled={rows.length === 0}
            >
              <FileText className="mr-1 size-4" /> Download TXT
            </Button>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                {COLUMNS.map((c) => (
                  <th key={c.key} className="px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-3 py-10 text-center text-muted-foreground">
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-border align-top">
                    {COLUMNS.map((c) => (
                      <td key={c.key} className="px-3 py-2 whitespace-pre-wrap">
                        {c.key === "created_at" && r.created_at
                          ? new Date(r.created_at).toLocaleString()
                          : (r[c.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
