"use client";

import { useState } from "react";
import PassportGate from "@/components/Passport";
import Invite from "@/components/wedPage";
// import InviteMosaic from "@/components/invite/InviteMosaic";

export default function InvitePage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      {!opened && (
        <PassportGate
          coupleNames="FG OFFR RO SEFAH & FG OFFR TB LAMPTEY"
          subtitle="Tap to open invite"
          onOpened={() => setOpened(true)}
        />
      )}
      <Invite />
    </main>
  );
}
