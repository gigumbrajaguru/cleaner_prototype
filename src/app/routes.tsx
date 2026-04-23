import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { ReviewAdmin } from "./components/ReviewAdmin";

export const router = createHashRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "services", Component: Services },
        { path: "contact", Component: Contact },
        { path: "admin/reviews", Component: ReviewAdmin },
      ],
    },
  ],
);
