import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "./index.css";
import LogRocket from "logrocket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";
import Demo4 from "./Demo4";

LogRocket.init("o9dvab/johnnyreillycom");

// Create a client
const queryClient = new QueryClient();

const navLinks = [
  { to: "/", text: "Demo 1" },
  { to: "/demo-2", text: "Demo 2" },
  { to: "/demo-3", text: "Demo 3" },
  { to: "/demo-4", text: "Demo 4" },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div>
          <nav>
            {navLinks.map((link) => (
              <React.Fragment key={link.to}>
                <NavLink
                  to={link.to}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textDecoration: "underline",
                        }
                      : undefined
                  }
                >
                  {link.text}
                </NavLink>{" "}🫶{" "}
              </React.Fragment>
            ))}
          </nav>
          <Routes>
            <Route path="/" element={<Demo1 />} />
            <Route path="/demo-2" element={<Demo2 />} />
            <Route path="/demo-3" element={<Demo3 />} />
            <Route path="/demo-4" element={<Demo4 />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
