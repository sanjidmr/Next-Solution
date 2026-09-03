"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductImage } from "@/types";
import {
  ShoppingBag as ShoppingBagIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Trash2 as Trash2Icon,
  Edit2 as Edit2Icon,
  Star as StarIcon,
  CheckCircle2 as CheckCircle2Icon,
  AlertCircle as AlertCircleIcon,
  Image as ImageIcon,
  X as XIcon,
  Upload as UploadIcon,
  Loader2 as Loader2Icon,
  Table as TableIcon,
  LayoutGrid as LayoutGridIcon,
} from "lucide-react";

interface AdminProductsCMSProps {
  currentLang: "en" | "bn";
}

export default function AdminProductsCMS({ currentLang }: AdminProductsCMSProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("SaaS Templates");
  const [subcategory, setSubcategory] = useState("Next.js Starter");
  const [price, setPrice] = useState<number | string>(0);
  const [cost, setCost] = useState<number | string>(0);
  const [stock, setStock] = useState<number | string>(0);
  const [sold, setSold] = useState<number | string>(0);
  const [status, setStatus] = useState<"published" | "draft" | "archived">("published");
  const [descriptionEn, setDescriptionEn] = useState("");

  // Product Images state (for modal editing)
  const [imageList, setImageList] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<string>("");

  const showNotice = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const json = await res.json();
        setProducts(json.data || []);
      } else {
        setProducts([
          {
            id: "prod-1",
            titleEn: "Next Solution Enterprise Kit",
            slug: "next-solution-enterprise-kit",
            descriptionEn: "Full-stack Next.js boilerplate with Supabase and Tailwind CSS.",
            price: 299,
            cost: 120,
            category: "Templates",
            subcategory: "Next.js SaaS",
            stock: 45,
            sold: 128,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            images: [
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
            ],
            status: "published"
          },
          {
            id: "prod-2",
            titleEn: "AI Chatbot System Portal",
            slug: "ai-chatbot-system-portal",
            descriptionEn: "Intelligent customer service platform powered by LLM integration.",
            price: 499,
            cost: 210,
            category: "AI Solutions",
            subcategory: "Conversational AI",
            stock: 30,
            sold: 94,
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            images: [
              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
            ],
            status: "published"
          }
        ]);
      }
    } catch (err: any) {
      showNotice("error", err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitleEn("");
    setSlug("");
    setCategory("SaaS Templates");
    setSubcategory("Fullstack Kit");
    setPrice(0);
    setCost(0);
    setStock(10);
    setSold(0);
    setStatus("published");
    setDescriptionEn("");
    setImageList([]);
    setNewImageUrl("");
    setMainImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitleEn(product.titleEn || "");
    setSlug(product.slug || "");
    setCategory(product.category || "General");
    setSubcategory(product.subcategory || "General");
    setPrice(product.price || 0);
    setCost(product.cost || 0);
    setStock(product.stock ?? 0);
    setSold(product.sold ?? 0);
    setStatus(product.status || "published");
    setDescriptionEn(product.descriptionEn || "");

    const images = product.images && product.images.length > 0
      ? product.images
      : (product.image ? [product.image] : []);
    
    setImageList(images);
    setMainImageUrl(product.image || images[0] || "");
    setNewImageUrl("");
    setIsModalOpen(true);
  };

  const handleAddImageUrl = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed) {
      showNotice("error", "Image URL cannot be empty.");
      return;
    }
    if (imageList.includes(trimmed)) {
      showNotice("error", "This image URL is already added.");
      return;
    }
    const updated = [...imageList, trimmed];
    setImageList(updated);
    if (!mainImageUrl) {
      setMainImageUrl(trimmed);
    }
    setNewImageUrl("");
  };

  const handleRemoveImage = (urlToRemove: string) => {
    const updated = imageList.filter((u) => u !== urlToRemove);
    setImageList(updated);
    if (mainImageUrl === urlToRemove) {
      setMainImageUrl(updated[0] || "");
    }
  };

  const handleSetAsMain = (url: string) => {
    setMainImageUrl(url);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleEn.trim()) {
      showNotice("error", "English product title is required.");
      return;
    }

    const generatedSlug = (slug.trim() || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")) || `product-${Date.now()}`;

    // Filter out any null / empty string URLs
    const sanitizedImages = imageList
      .map((u) => (u || "").trim())
      .filter((u) => u.length > 0);

    const finalMainImage = mainImageUrl.trim() || sanitizedImages[0] || "";

    const payload = {
      titleEn: titleEn.trim(),
      slug: generatedSlug,
      category: category.trim(),
      subcategory: subcategory.trim() || undefined,
      price: typeof price === "number" ? price : parseFloat(String(price) || "0"),
      cost: typeof cost === "number" ? cost : parseFloat(String(cost) || "0"),
      stock: typeof stock === "number" ? stock : parseInt(String(stock) || "0", 10),
      sold: typeof sold === "number" ? sold : parseInt(String(sold) || "0", 10),
      status,
      descriptionEn: descriptionEn.trim() || undefined,
      image: finalMainImage || undefined,
      images: sanitizedImages,
    };

    setSaving(true);
    try {
      if (editingProduct) {
        // Update product via API
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to update product.");
        }

        showNotice("success", "Product updated successfully!");
      } else {
        // Create new product via API
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to create product.");
        }

        showNotice("success", "Product created successfully!");
      }

      setIsModalOpen(false);
      await fetchProducts();
    } catch (err: any) {
      showNotice("error", err.message || "An error occurred while saving product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete product.");
      }
      showNotice("success", "Product deleted successfully.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      showNotice("error", err.message || "Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-bold ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2Icon className="h-4.5 w-4.5 shrink-0" />
          ) : (
            <AlertCircleIcon className="h-4.5 w-4.5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#141414] dark:bg-[#141414] p-5 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5 text-blue-600 dark:text-orange-400" />
            <span>
              {currentLang === "en" ? "All Products Management" : "সকল প্রোডাক্ট ম্যানেজমেন্ট"}
            </span>
          </h3>
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
            {currentLang === "en"
              ? "Manage catalog products, multi-image galleries, prices, stock and sales data."
              : "প্রোডাক্ট ক্যাটালগ, গ্যালারি, মূল্য, স্টক এবং সেলস পরিচালনা করুন।"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-neutral-800 p-1 rounded-xl border border-gray-200 dark:border-neutral-700">
            <button
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === "table"
                  ? "bg-white dark:bg-[#141414] dark:bg-[#141414] text-blue-600 dark:text-orange-400 shadow-sm"
                  : "text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-white dark:text-white"
              }`}
            >
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid View"
              className={`p-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#141414] dark:bg-[#141414] text-blue-600 dark:text-orange-400 shadow-sm"
                  : "text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-900 dark:hover:text-white dark:text-white"
              }`}
            >
              <LayoutGridIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm shadow-blue-600/20"
          >
            <PlusIcon className="h-4 w-4" />
            <span>{currentLang === "en" ? "Add New Product" : "নতুন প্রোডাক্ট যোগ করুন"}</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          <input
            type="text"
            placeholder={
              currentLang === "en" ? "Search products by title or slug..." : "শিরোনাম বা স্ল্যাগ দিয়ে অনুসন্ধান..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] dark:bg-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
        >
          <option value="all">
            {currentLang === "en" ? "All Categories" : "সব ক্যাটাগরি"}
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product List Content */}
      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800">
          <Loader2Icon className="h-6 w-6 text-blue-600 dark:text-orange-400 animate-spin" />
          <span className="ml-3 text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 font-bold">
            {currentLang === "en" ? "Loading products..." : "প্রোডাক্ট লোড হচ্ছে..."}
          </span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800">
          <ShoppingBagIcon className="h-10 w-10 text-gray-300 dark:text-neutral-500 mx-auto mb-3" />
          <p className="text-xs font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
            {currentLang === "en" ? "No products found." : "কোনো প্রোডাক্ট পাওয়া যায়নি।"}
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW WITH EXACT 9 COLUMNS STRICTLY ALIGNED */
        <div className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 dark:border-neutral-800 text-[11px] font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-left">Product Details</th>
                <th className="py-3.5 px-4 text-left">Category</th>
                <th className="py-3.5 px-4 text-left">Subcategory</th>
                <th className="py-3.5 px-4 text-center">Price</th>
                <th className="py-3.5 px-4 text-center">Cost</th>
                <th className="py-3.5 px-4 text-center">Stock</th>
                <th className="py-3.5 px-4 text-center">Sold</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-xs">
              {filteredProducts.map((p) => {
                const mainImg = p.image || (p.images && p.images[0]) || "";
                return (
                  <tr key={p.id} className="hover:bg-blue-50/30 dark:hover:bg-orange-500/5 transition">
                    {/* 1. Product Details */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-gray-100 dark:border-neutral-800 relative">
                          {mainImg ? (
                            <img
                              src={mainImg}
                              alt={p.titleEn}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-neutral-500">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{p.titleEn}</p>
                          <span className="font-mono text-[10px] text-blue-600 dark:text-orange-400 bg-blue-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                            /{p.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-200">
                        {p.category || "General"}
                      </span>
                    </td>

                    {/* 3. Subcategory */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-orange-500/10 text-blue-700 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20">
                        {p.subcategory || "Standard"}
                      </span>
                    </td>

                    {/* 4. Price ($) */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="font-extrabold text-blue-600 dark:text-orange-400 text-sm">
                        ${p.price}
                      </span>
                    </td>

                    {/* 5. Cost ($) */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="font-bold text-gray-600 dark:text-neutral-300 dark:text-neutral-600">
                        {(() => { const c = typeof (p as any).cost === 'string' ? parseFloat((p as any).cost) : ((p as any).cost ?? null); return c !== null && c > 0 ? `$${c}` : '—'; })()}
                      </span>
                    </td>

                    {/* 6. Stock */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {(() => {
                        const rawStock = (p as any).stock;
                        const stockNum = typeof rawStock === 'string' ? parseInt(rawStock, 10) : (rawStock ?? 0);
                        const stockVal = isNaN(stockNum) ? 0 : stockNum;
                        return (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                            stockVal > 10
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
                              : stockVal > 0
                              ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                              : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30'
                          }`}>
                            {stockVal}
                          </span>
                        );
                      })()}
                    </td>

                    {/* 7. Sold */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {(() => {
                        const rawSold = (p as any).sold;
                        const soldNum = typeof rawSold === 'string' ? parseInt(rawSold, 10) : (rawSold ?? 0);
                        const soldVal = isNaN(soldNum) ? 0 : soldNum;
                        return (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20">
                            {soldVal}
                          </span>
                        );
                      })()}
                    </td>

                    {/* 8. Status */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {(() => {
                        const st = ((p as any).status || 'published').toLowerCase();
                        const isActive = st === 'published' || st === 'active';
                        const isDraft = st === 'draft';
                        const isArchived = st === 'archived';
                        return (
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            isActive ? 'bg-emerald-500 text-white'
                            : isDraft ? 'bg-amber-500 text-white'
                            : 'bg-gray-400 text-white dark:bg-gray-700 dark:text-neutral-200'
                          }`}>
                            {isActive ? 'Published' : isDraft ? 'Draft' : isArchived ? 'Archived' : (p as any).status}
                          </span>
                        );
                      })()}
                    </td>

                    {/* 9. Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 text-gray-600 dark:text-neutral-300 dark:text-neutral-600 hover:text-blue-600 dark:hover:text-orange-400 dark:text-orange-400 hover:bg-blue-50 dark:hover:bg-orange-500/10 dark:bg-orange-500/10 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit2Icon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-gray-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 dark:bg-red-500/10 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => {
            const mainImg = p.image || (p.images && p.images[0]) || "";
            const imageCount = (p.images || []).length || (p.image ? 1 : 0);

            return (
              <div
                key={p.id}
                className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col justify-between hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700 transition"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-40 bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800 overflow-hidden">
                    {mainImg ? (
                      <img
                        src={mainImg}
                        alt={p.titleEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 dark:text-neutral-500">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-[10px] mt-1">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === "published"
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {p.status || "published"}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      <span>{imageCount} Images</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                      {p.titleEn}
                    </h4>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-50 dark:border-neutral-800">
                      <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px]">
                        /{p.slug}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 dark:text-neutral-500">Stock: {p.stock ?? 0}</span>
                        <span className="font-extrabold text-blue-600 dark:text-orange-400">
                          ${p.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-gray-50 dark:border-neutral-800 mt-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 text-gray-600 dark:text-neutral-300 dark:text-neutral-600 hover:text-blue-600 dark:hover:text-orange-400 dark:text-orange-400 hover:bg-blue-50 dark:hover:bg-orange-500/10 dark:bg-orange-500/10 rounded-lg transition text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2Icon className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-gray-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 dark:bg-red-500/10 rounded-lg transition"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#141414] dark:bg-[#141414] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-neutral-800 p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBagIcon className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                <span>
                  {editingProduct
                    ? currentLang === "en"
                      ? "Edit Product Details"
                      : "প্রোডাক্টের বিবরণ এডিট"
                    : currentLang === "en"
                    ? "Create New Product"
                    : "নতুন প্রোডাক্ট তৈরি করুন"}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300 dark:text-neutral-600 rounded-lg"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Titles */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Next Solution Enterprise Kit"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Slug, Category, Subcategory */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. SaaS Templates"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Next.js Starter"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Financials & Inventory: Price, Cost, Stock, Sold */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-extrabold text-blue-600 dark:text-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Cost ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Sold
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sold}
                    onChange={(e) => setSold(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-200 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Product details in English..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 resize-none"
                  />
                </div>
              </div>

              {/* PRODUCT IMAGES SECTION */}
              <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <ImageIcon className="h-4 w-4 text-blue-600 dark:text-orange-400" />
                    <span>Product Image Gallery & Main Image</span>
                  </label>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold">
                    {imageList.length} Images Added
                  </span>
                </div>

                {/* Add Image Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500/20 dark:focus:ring-orange-500/20 focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-mono text-[11px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1 shrink-0"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    <span>Add Image</span>
                  </button>
                </div>

                {/* Gallery List */}
                {imageList.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 max-h-56 overflow-y-auto">
                    {imageList.map((url, index) => {
                      const isMain = url === mainImageUrl;
                      return (
                        <div
                          key={index}
                          className={`relative rounded-xl border overflow-hidden bg-white dark:bg-[#141414] dark:bg-[#141414] p-1 flex flex-col justify-between transition ${
                            isMain
                              ? "border-blue-500 dark:border-orange-500 ring-2 ring-blue-500/20 dark:ring-orange-500/20"
                              : "border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 dark:border-neutral-600"
                          }`}
                        >
                          <div className="relative h-24 w-full bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                            <img
                              src={url}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as any).src =
                                  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200";
                              }}
                            />
                            {isMain && (
                              <div className="absolute top-1 left-1 bg-blue-600 dark:bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <StarIcon className="h-2.5 w-2.5 fill-current" />
                                <span>Main</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1 px-1">
                            {!isMain ? (
                              <button
                                type="button"
                                onClick={() => handleSetAsMain(url)}
                                className="text-[10px] text-blue-600 dark:text-orange-400 font-bold hover:underline"
                              >
                                Set Main
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold text-gray-400 dark:text-neutral-500">
                                Primary
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(url)}
                              className="text-gray-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-400 dark:text-red-400 p-0.5 rounded"
                            >
                              <Trash2Icon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 dark:text-neutral-500 italic p-3 bg-gray-50 dark:bg-neutral-900 rounded-xl text-center border border-dashed border-gray-200 dark:border-neutral-700">
                    No images added yet. Enter an image URL above to add to product gallery.
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 dark:text-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-5 py-2 rounded-xl transition flex items-center gap-2 shadow-sm shadow-blue-600/20 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2Icon className="h-3.5 w-3.5" />
                      <span>Save Product</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
