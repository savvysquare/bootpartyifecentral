import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ArrowRight } from "lucide-react";
import bootLogo from "@/assets/boot-logo.webp";
import ifeHero from "@/assets/ife-community.webp";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BOOT Party — Ife Central | Register & Join the Movement" },
      {
        name: "description",
        content:
          "Register with the Ife Central arm of the BOOT Party (Because Of Our Tomorrow). Complete your full party membership on the main BOOT website.",
      },
      { property: "og:title", content: "BOOT Party — Ife Central" },
      {
        property: "og:description",
        content:
          "Join the Ife Central arm of the BOOT Party and help build a new Nigeria — Because Of Our Tomorrow.",
      },
    ],
  }),
});

const MAIN_SITE = "https://boot.org.ng/";
const JOIN_URL = "https://boot.org.ng/join-us/";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <Nav />
      <Hero />
      <Stats />
      <About />
      <RegisterSection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-3">
          <img src={bootLogo} alt="BOOT Party logo" className="h-10 w-auto" />
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold">BOOT · Ife Central</div>
            <div className="text-xs text-muted-foreground">Because Of Our Tomorrow</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#about" className="text-muted-foreground hover:text-foreground">About</a>
          <a href="#register" className="text-muted-foreground hover:text-foreground">Register</a>
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            Main party site <ExternalLink className="size-3.5" />
          </a>
        </nav>
        <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <a href="#register">Join us</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="dotted-frame border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Ife Central · Osun State
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Register with the <span className="text-primary">Ife Central</span> arm of the BOOT Party.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            BOOT — <em>Because Of Our Tomorrow</em> — is a people-powered movement
            to redeem the Nigerian dream. Tell us about yourself so we can
            organise locally, then complete your full membership on the main
            party website.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#register" className="inline-flex items-center">
                Register locally <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                Join the main party <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Local registration captures your details for the Ife Central chapter.
            You'll still need to complete the main party registration to be a
            bonafide BOOT member.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img src={ifeHero} alt="Community members in Ile-Ife" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm md:block">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Chapter</div>
            <div className="font-display text-lg">Ife Central LGA</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-3">
        <StatCard
          tone="green"
          big="11 wards"
          label="Across Ife Central — we want a coordinator in every one."
        />
        <StatCard
          tone="red"
          big="One movement"
          label="Local organising, national agenda. Built ward-by-ward."
        />
        <StatCard
          tone="green"
          big="Two steps"
          label="Register here, then complete full membership on boot.org.ng."
        />
      </div>
    </section>
  );
}

function StatCard({ tone, big, label }: { tone: "green" | "red"; big: string; label: string }) {
  const bg = tone === "green" ? "bg-stat-green" : "bg-stat-red";
  return (
    <div className={`rounded-2xl ${bg} p-6`}>
      <div className="font-display text-3xl leading-tight md:text-4xl">{big}</div>
      <div className="mt-3 text-sm text-foreground/70">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">About</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            A people-powered movement, rooted in Ife.
          </h2>
        </div>
        <div className="space-y-5 text-lg text-foreground/80">
          <p>
            The Ife Central chapter exists to organise BOOT Party members and
            supporters at the grassroots — ward by ward, polling unit by
            polling unit. We're building the local infrastructure for{" "}
            <em>Trust Before Ticket</em>: credibility earned, transparency
            guaranteed, accountability enforced.
          </p>
          <p>
            This site collects your contact details so the chapter can reach
            you with meetings, briefings, and opportunities to serve. To be a{" "}
            <span className="font-medium text-foreground">bonafide member</span>{" "}
            of the party, you must also register on the main BOOT website.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="outline">
              <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer">
                Main party website <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                Full party registration <ExternalLink className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegisterSection() {
  return (
    <section id="register" className="dotted-frame border-b border-border">
      <div className="mx-auto max-w-4xl px-5 py-20">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Register</div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">
          Join the Ife Central chapter.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Fill in your details below. We'll add you to the Ife Central
          register and follow up shortly. Don't forget — full party membership
          is completed on the main BOOT website.
        </p>
        <div className="mt-10">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <img src={bootLogo} alt="BOOT" className="h-10 w-auto bg-background rounded p-1" />
          <div>
            <div className="font-display text-lg">BOOT · Ife Central</div>
            <div className="text-sm opacity-70">Because Of Our Tomorrow</div>
          </div>
        </div>
        <div className="text-sm opacity-80">
          <div className="mb-2 font-medium opacity-100">Quick links</div>
          <ul className="space-y-1.5">
            <li><a className="hover:underline" href="#about">About the chapter</a></li>
            <li><a className="hover:underline" href="#register">Register</a></li>
            <li>
              <a className="hover:underline inline-flex items-center gap-1"
                 href={MAIN_SITE} target="_blank" rel="noopener noreferrer">
                Main party website <ExternalLink className="size-3.5" />
              </a>
            </li>
            <li>
              <a className="hover:underline inline-flex items-center gap-1"
                 href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                Full party registration <ExternalLink className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm opacity-80">
          <div className="mb-2 font-medium opacity-100">Note</div>
          <p>
            This site is operated by the Ife Central chapter. Submitting this
            form does not make you a bonafide BOOT Party member — that
            happens at{" "}
            <a className="underline" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              boot.org.ng/join-us
            </a>.
          </p>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs opacity-60">
          © {new Date().getFullYear()} BOOT Party · Ife Central Chapter.
        </div>
      </div>
    </footer>
  );
}
