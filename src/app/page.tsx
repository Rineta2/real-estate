import { Fragment } from "react";

import Featured from "@/components/ui/Featured/Featured";

import Home from "@/components/ui/Home/Home";

import YourDream from "@/components/ui/Your-Dream/YourDream"

import Faqs from "@/components/ui/Faqs/Faqs"

export default function Page() {
  return (
    <Fragment>
      <Home />
      <Featured />
      <YourDream />
      <Faqs />
    </Fragment>
  );
}
