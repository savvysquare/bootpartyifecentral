import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, ExternalLink } from "lucide-react";

export function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      ward: String(fd.get("ward") || "").trim() || null,
      address: String(fd.get("address") || "").trim() || null,
      gender: String(fd.get("gender") || "").trim() || null,
      age_range: String(fd.get("age_range") || "").trim() || null,
      message: String(fd.get("message") || "").trim() || null,
    };

    if (!payload.full_name || !payload.phone) {
      toast.error("Full name and phone number are required.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("registrations").insert(payload);
    setLoading(false);

    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Registration received. Welcome to BOOT — Ife Central.");
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 size-7 text-primary" />
          <div>
            <h3 className="text-2xl font-semibold">You're on the list.</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for joining the Ife Central arm of the BOOT Party. This
              registration captures your details locally — to become a{" "}
              <span className="font-medium text-foreground">bonafide member</span>{" "}
              of the party, please complete the official registration on the
              main BOOT website.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="https://boot.org.ng/join-us/" target="_blank" rel="noopener noreferrer">
                  Register on the main BOOT site
                  <ExternalLink className="ml-1 size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://boot.org.ng/" target="_blank" rel="noopener noreferrer">
                  Visit boot.org.ng
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name *" name="full_name" required placeholder="e.g. Adebayo Adeyemi" />
        <Field label="Phone number *" name="phone" required type="tel" placeholder="080xxxxxxxx" />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <Field label="Ward in Ife Central" name="ward" placeholder="e.g. Ilare I" />
        <Field label="Gender" name="gender" placeholder="Female / Male / Other" />
        <Field label="Age range" name="age_range" placeholder="18–24, 25–34, 35–44..." />
        <div className="md:col-span-2">
          <Field label="Residential address" name="address" placeholder="Street, area, Ile-Ife" />
        </div>
        <div className="md:col-span-2 grid gap-2">
          <Label htmlFor="message">Anything you'd like us to know?</Label>
          <Textarea id="message" name="message" rows={4} placeholder="Optional" />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        By submitting, you agree that we may contact you about Ife Central
        activities. This form does <span className="font-medium text-foreground">not</span> make you
        a bonafide party member — you must also register on the main BOOT site.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={loading} className="min-w-44">
          {loading ? "Submitting…" : "Register with Ife Central"}
        </Button>
        <Button asChild type="button" variant="outline" size="lg">
          <a href="https://boot.org.ng/join-us/" target="_blank" rel="noopener noreferrer">
            Register on main BOOT site
            <ExternalLink className="ml-1 size-4" />
          </a>
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}
