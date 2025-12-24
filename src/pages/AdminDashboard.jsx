import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "./AdminDashboard.module.css";

import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Faqat login qilingan foydalanuvchilar uchun
  if (!isAuthenticated) {
    return <div>Faqat login qilingan foydalanuvchilar uchun!</div>;
  }

  // Forma qiymatlarini o‘zgartirish
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Formani yuborish va Supabase-ga saqlash
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("products").insert([
      {
        name: form.name,
        price: parseFloat(form.price),
        image: form.image,
        description: form.description,
      },
    ]);
    setLoading(false);
    if (error) setMessage("Xatolik: " + error.message);
    else setMessage("Mahsulot muvaffaqiyatli qo'shildi!");
    setForm({ name: "", price: "", image: "", description: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Yangi mahsulot qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="name"
          placeholder="Mahsulot nomi"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="price"
          type="number"
          placeholder="Mahsulot narxi"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="image"
          placeholder="Mahsulot rasmi (URL)"
          value={form.image}
          onChange={handleChange}
          required
        />
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="Mahsulot tavsifi"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Qo‘shish"}
        </button>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default AdminDashboard;
