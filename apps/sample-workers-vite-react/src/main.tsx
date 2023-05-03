import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import NewPost from "./NewPost";
import UpdatePost from "./UpdatePost";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new" element={<NewPost />} />
      <Route path="/update" element={<UpdatePost />} />
    </Routes>
  </BrowserRouter>
);
