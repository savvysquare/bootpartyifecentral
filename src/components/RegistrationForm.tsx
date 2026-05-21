import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2, ExternalLink } from "lucide-react";

// Ife Central LGA wards (Osun State), in their official order.
const IFE_CENTRAL_WARDS = [
  "Akarabata",
  "Iremo I",
  "Iremo II",
  "Iremo III",
  "Iremo IV",
  "Iremo V",
  "Ilare I",
  "Ilare II",
  "Ilare III",
  "Ilare IV",
  "More / Okerewe",
];

const GENDERS = ["Female", "Male", "Prefer not to say"];

const AGE_RANGES = ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"];

export function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ward, setWard] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const firstName = String(fd.get("first_name") || "").trim();
    const middleName = String(fd.get("middle_name") || "").trim();
    const surname = String(fd.get("surname") || "").trim();
    const fullName = [firstName, middleName, surname].filter(Boolean).join(" ");

    const payload = {
      full_name: fullName,
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      ward: ward || null,
      address: String(fd.get("address") || "").trim() || null,
      gender: gender || null,
      age_range: ageRange || null,
      message: String(fd.get("message") || "").trim() || null,
    };

    if (!firstName || !surname || !payload.phone) {
      toast.error("First name, surname, and phone number are required.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("registrations").insert(payload);
      if (error) throw error;
      setDone(true);
      toast.success("Registration received. Welcome to BOOT — Ife Central.");
    } catch (err: any) {
      console.error("Submission error:", err);
      const errMsg = err?.message || err?.error_description || JSON.stringify(err);
      toast.error(`Could not submit: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 md:p-10">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 size-7 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold">You're on the list.</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for joining the Ife Central arm of the BOOT Party. This
              registration captures your details locally — to become a{" "}
              <span className="font-medium text-foreground">bonafide member</span>{" "}
              of the party, please complete the official registration on the
              main BOOT website.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="https://boot.org.ng/join-us/" target="_blank" rel="noopener noreferrer">
                  Register on the main BOOT site
                  <ExternalLink className="ml-1 size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
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
        <Field label="First name *" name="first_name" required placeholder="e.g. Adebayo" />
        <Field label="Middle name" name="middle_name" placeholder="Optional" />
        <Field label="Surname *" name="surname" required placeholder="e.g. Adeyemi" />
        <Field label="Phone number *" name="phone" required type="tel" placeholder="080xxxxxxxx" />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />

        <SelectField
          label="Ward in Ife Central"
          placeholder="Select your ward"
          value={ward}
          onChange={setWard}
          options={IFE_CENTRAL_WARDS}
        />
        <SelectField
          label="Gender"
          placeholder="Select gender"
          value={gender}
          onChange={setGender}
          options={GENDERS}
        />
        <SelectField
          label="Age range"
          placeholder="Select age range"
          value={ageRange}
          onChange={setAgeRange}
          options={AGE_RANGES}
        />

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

function SelectField({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
