import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Search, Plus, Trash2, RefreshCw, ShoppingCart } from "lucide-react";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    make: "",
    model: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Admin Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Failed to load vehicles", err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      if (searchQuery.make) params.append("make", searchQuery.make);
      if (searchQuery.model) params.append("model", searchQuery.model);
      if (searchQuery.category) params.append("category", searchQuery.category);
      if (searchQuery.minPrice) params.append("minPrice", searchQuery.minPrice);
      if (searchQuery.maxPrice) params.append("maxPrice", searchQuery.maxPrice);

      const res = await API.get(`/vehicles/search?${params.toString()}`);
      setVehicles(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handlePurchase = async (id: number) => {
    try {
      await API.post(`/vehicles/${id}/purchase`);
      fetchVehicles();
    } catch (err: any) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const handleRestock = async (id: number) => {
    const amount = prompt("Enter quantity to add:", "5");
    if (!amount || isNaN(Number(amount))) return;

    try {
      await API.post(`/vehicles/${id}/restock`, { amount: Number(amount) });
      fetchVehicles();
    } catch (err: any) {
      alert(err.response?.data?.message || "Restock failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/vehicles", {
        make: newVehicle.make,
        model: newVehicle.model,
        category: newVehicle.category,
        price: Number(newVehicle.price),
        quantity: Number(newVehicle.quantity),
      });
      setIsModalOpen(false);
      setNewVehicle({ make: "", model: "", category: "", price: "", quantity: "" });
      fetchVehicles();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add vehicle");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Bar with Admin Action */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Plus className="w-5 h-5" /> Add New Vehicle
          </button>
        )}
      </div>

      {/* Search Bar / Filter Panel */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Make"
          className="border rounded px-3 py-2 text-sm"
          value={searchQuery.make}
          onChange={(e) => setSearchQuery({ ...searchQuery, make: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          className="border rounded px-3 py-2 text-sm"
          value={searchQuery.model}
          onChange={(e) => setSearchQuery({ ...searchQuery, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="border rounded px-3 py-2 text-sm"
          value={searchQuery.category}
          onChange={(e) => setSearchQuery({ ...searchQuery, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price (₹)"
          className="border rounded px-3 py-2 text-sm"
          value={searchQuery.minPrice}
          onChange={(e) => setSearchQuery({ ...searchQuery, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price (₹)"
          className="border rounded px-3 py-2 text-sm"
          value={searchQuery.maxPrice}
          onChange={(e) => setSearchQuery({ ...searchQuery, maxPrice: e.target.value })}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition text-sm font-semibold"
        >
          <Search className="w-4 h-4" /> Filter
        </button>
      </form>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {v.category}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded font-bold ${
                    v.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.quantity > 0 ? `${v.quantity} in stock` : "Out of stock"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {v.make} {v.model}
              </h3>

              {/* Formatted in Indian Rupees using Lakhs/Crores notation */}
              <p className="text-2xl font-extrabold text-blue-600 mt-2">
                ₹{Number(v.price).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handlePurchase(v.id)}
                disabled={v.quantity === 0}
                className="flex-1 flex items-center justify-center gap-1 bg-blue-600 disabled:bg-gray-300 text-white py-2 rounded text-sm font-semibold hover:bg-blue-700 transition disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" /> Purchase
              </button>

              {isAdmin && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleRestock(v.id)}
                    title="Restock Stock"
                    className="p-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    title="Delete Vehicle"
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal (Admin) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-3">
              <input
                type="text"
                placeholder="Make (e.g. Tata)"
                required
                className="w-full border px-3 py-2 rounded"
                value={newVehicle.make}
                onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
              />
              <input
                type="text"
                placeholder="Model (e.g. Harrier)"
                required
                className="w-full border px-3 py-2 rounded"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category (e.g. SUV)"
                required
                className="w-full border px-3 py-2 rounded"
                value={newVehicle.category}
                onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price (₹ e.g. 1549000)"
                required
                className="w-full border px-3 py-2 rounded"
                value={newVehicle.price}
                onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Initial Quantity"
                required
                className="w-full border px-3 py-2 rounded"
                value={newVehicle.quantity}
                onChange={(e) => setNewVehicle({ ...newVehicle, quantity: e.target.value })}
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-200 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 bg-emerald-600 text-white py-2 rounded font-semibold">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
