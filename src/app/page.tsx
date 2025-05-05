import { Fragment } from "react";

import Featured from "@/components/ui/Featured/Featured";

import Home from "@/components/ui/Home/Home";

import YourDream from "@/components/ui/Your-Dream/YourDream"

import Faqs from "@/components/ui/Faqs/Faqs"

import Properties from "@/components/ui/properties/Properties"

export default function Page() {
  return (
    <Fragment>
      <main className="overflow-hidden">
        <Home />
        <Featured />
        <YourDream />
        <Properties />
        <Faqs />
      </main>
    </Fragment>
  );
}
