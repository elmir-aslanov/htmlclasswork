import { Routes, Route } from "react-router-dom";
import ClientLayout from "./layout/client/ClientLayout";
import AdminLayout from "./layout/admin/AdminLayout";

import Home from "./pages/client/Home";
import Books from "./pages/client/Books";
import BookDetail from "./pages/client/BookDetail";
import Favorites from "./pages/client/Favorites";
import About from "./pages/client/About";
import Contact from "./pages/client/Contact";
import NotFound from "./pages/client/NotFound";
import Reviews from "./pages/client/Reviews"; // ✅ NEW

import Dashboard from "./pages/admin/Dashboard";
import AdminBooks from "./pages/admin/Books";
import AddBook from "./pages/admin/AddBook";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="about" element={<About />} />
        <Route path="reviews" element={<Reviews />} /> {/* ✅ NEW */}
        <Route path="contact" element={<Contact />} />

        <Route path="not-found" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="add-book" element={<AddBook />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
