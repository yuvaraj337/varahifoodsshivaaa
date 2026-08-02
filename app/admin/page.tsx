"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  calories: number;
  protein: string;
  isVegetarian: boolean;
}

const categories = [
  "Salads",
  "Protein Shakes",
  "Soups",
  "Rolls",
  "Eggs",
];

export default function AdminPage() {
  const [foods, setFoods] = useState<MenuItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("Salads");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [protein, setProtein] = useState("");

  const [calories, setCalories] = useState("");

  const [rating, setRating] = useState("4.8");

  const [isVegetarian, setIsVegetarian] =
    useState(true);

  const fetchFoods = async () => {
    const snapshot = await getDocs(
      collection(db, "menu")
    );

    const list: MenuItem[] = [];

    snapshot.forEach((docItem) => {
      list.push({
        id: docItem.id,
        ...(docItem.data() as MenuItem),
      });
    });

    setFoods(list);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const addFood = async () => {
    if (
      !name ||
      !description ||
      !price ||
      !image
    ) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    await addDoc(collection(db, "menu"), {
      name,
      description,
      category,
      price: Number(price),
      image,
      rating: Number(rating),
      calories: Number(calories),
      protein,
      isVegetarian,
    });

    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setProtein("");
    setCalories("");
    setRating("4.8");
    setCategory("Salads");
    setIsVegetarian(true);

    await fetchFoods();

    setLoading(false);

    alert("Food Added Successfully");
  };

  const deleteFood = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    await deleteDoc(doc(db, "menu", id));

    fetchFoods();
  };

  return (
    <main className="min-h-screen bg-[#0F0F10] text-white px-8 py-12">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Admin Dashboard
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-[#171717] rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Add New Food
            </h2> 
            <div className="space-y-5">

  <input
    type="text"
    placeholder="Food Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
    rows={4}
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  >
    {categories.map((cat) => (
      <option
        key={cat}
        value={cat}
      >
        {cat}
      </option>
    ))}
  </select>

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <input
    type="text"
    placeholder="Protein (Example: 25g)"
    value={protein}
    onChange={(e) => setProtein(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <input
    type="number"
    placeholder="Calories"
    value={calories}
    onChange={(e) => setCalories(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <input
    type="number"
    step="0.1"
    placeholder="Rating"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="w-full bg-[#252525] rounded-xl p-4 outline-none"
  />

  <label className="flex items-center gap-3">

    <input
      type="checkbox"
      checked={isVegetarian}
      onChange={(e) =>
        setIsVegetarian(e.target.checked)
      }
    />

    Vegetarian

  </label>

  <button
    onClick={addFood}
    disabled={loading}
    className="w-full bg-[#E63946] hover:bg-red-600 rounded-xl py-4 font-bold text-lg"
  >
    {loading ? "Adding..." : "Add Food"}
  </button>

</div>

</div>

<div className="bg-[#171717] rounded-3xl p-8">

  <h2 className="text-3xl font-bold mb-8">
    Existing Foods
  </h2>

  <div className="space-y-5">
    {foods.length === 0 ? (

  <p className="text-white/50">
    No food items found.
  </p>

) : (

  foods.map((food) => (

    <div
      key={food.id}
      className="bg-[#252525] rounded-2xl p-5 flex justify-between items-center"
    >

      <div className="flex gap-4 items-center">

        <img
          src={food.image}
          alt={food.name}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div>

          <h3 className="text-xl font-bold">
            {food.name}
          </h3>

          <p className="text-white/50">
            {food.category}
          </p>

          <p className="text-[#E63946] font-bold mt-2">
            ₹{food.price}
          </p>

        </div>

      </div>

      <button
        onClick={() => deleteFood(food.id!)}
        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
      >
        Delete
      </button>

    </div>

  ))

)}

  </div>

</div>

</div>

</div>

</main>

);
}
