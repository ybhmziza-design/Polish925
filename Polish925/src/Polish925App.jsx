import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  ChevronDown
} from 'lucide-react';

export default function Polish925App() {
  // some state for navigation and app logic
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [notification, setNotification] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Booking form state
  const [bookingType, setBookingType] = useState('Ring');
  const [bookingMaterial, setBookingMaterial] = useState('925 Sterling Silver');
  const [bookingService, setBookingService] = useState('Polishing');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationNotes, setLocationNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Products list based on the extracted content
  const products = [
    {
      id: 1,
      name: '925 Sterling Silver Ring',
      category: '925 Silver',
      specs: '925 Silver • 4.2g',
      rating: 4.8,
      price: 3500,
      oldPrice: 4200,
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Gold Plated Chain',
      category: 'Gold',
      specs: '18K Gold • 8.1g',
      rating: 5.0,
      price: 7200,
      oldPrice: null,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Silver Charm Bracelet',
      category: '925 Silver',
      specs: '925 Silver • 6.5g',
      rating: 4.2,
      price: 4800,
      oldPrice: 6000,
      badge: '-20%',
      image: 'https://images.unsplash.com/photo-1611591475759-3d7c71d62057?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Gold Wedding Band',
      category: 'Gold',
      specs: '14K Gold • 3.8g',
      rating: 4.9,
      price: 9500,
      oldPrice: null,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      name: 'Classic Solitaire Band',
      category: '925 Silver',
      specs: '925 Silver • 3.5g',
      rating: 4.9,
      price: 3800,
      oldPrice: 4500,
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      name: 'Vintage Gold Rope Chain',
      category: 'Gold',
      specs: '18K Yellow Gold • 12.0g',
      rating: 4.9,
      price: 14500,
      oldPrice: 16000,
      badge: 'Premium',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // simple toast timeout handler
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCart = (productName) => {
    setCartCount(prev => prev + 1);
    setNotification(`Added ${productName} to cart! 🛍️`);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Please enter at least your name and phone number!");
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans antialiased">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-2 transition-all">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider">
        PREMIUM JEWELRY & PROFESSIONAL CARE IN KENYA — FREE DELIVERY OVER KSh 5,000
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}>
              <h1 className="text-2xl font-serif tracking-widest text-stone-900 font-bold">POLISH</h1>
              <p className="text-xs tracking-widest text-amber-600 font-semibold uppercase">925 Sterling & Gold</p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}
                className={`text-sm font-medium transition hover:text-amber-600 ${activeTab === 'home' ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-stone-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
                className={`text-sm font-medium transition hover:text-amber-600 ${activeTab === 'shop' && selectedCategory === 'All' ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-stone-600'}`}
              >
                Shop
              </button>
              <button 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('925 Silver'); }}
                className={`text-sm font-medium transition hover:text-amber-600 ${activeTab === 'shop' && selectedCategory === '925 Silver' ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-stone-600'}`}
              >
                925 Silver
              </button>
              <button 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('Gold'); }}
                className={`text-sm font-medium transition hover:text-amber-600 ${activeTab === 'shop' && selectedCategory === 'Gold' ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-stone-600'}`}
              >
                Gold
              </button>
              <button 
                onClick={() => setActiveTab('booking')}
                className={`text-sm font-medium transition hover:text-amber-600 ${activeTab === 'booking' ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-stone-600'}`}
              >
                Polishing Services
              </button>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <button onClick={() => setActiveTab('shop')} className="text-stone-600 hover:text-stone-900 hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setWishlistCount(prev => prev + 1)} className="text-stone-600 hover:text-stone-900 relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button className="text-stone-600 hover:text-stone-900 relative flex items-center">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-stone-600 hover:text-stone-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-stone-700 font-medium border-b border-stone-100"
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-stone-700 font-medium border-b border-stone-100"
            >
              Shop All
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('925 Silver'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-stone-700 font-medium border-b border-stone-100"
            >
              925 Silver
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('Gold'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-stone-700 font-medium border-b border-stone-100"
            >
              Gold
            </button>
            <button 
              onClick={() => { setActiveTab('booking'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-stone-700 font-medium border-b border-stone-100"
            >
              Book Polishing & Cleaning
            </button>
          </div>
        )}
      </header>

      {/* CONTENT AREA */}
      {activeTab === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="relative bg-stone-900 text-white py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80" 
                alt="Jewelry Background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
              <div className="max-w-xl">
                <span className="text-amber-400 text-sm tracking-widest uppercase font-semibold">Professional Care & Quality</span>
                <h1 className="text-4xl sm:text-6xl font-serif font-bold mt-3 mb-6 leading-tight">
                  Premium Jewelry. <br />Professional Care.
                </h1>
                <p className="text-stone-300 text-lg mb-8">
                  Discover timeless gold and 925 sterling silver jewelry, and keep your favorite pieces shining with professional care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded font-medium tracking-wider uppercase transition shadow-lg"
                  >
                    Shop Jewelry
                  </button>
                  <button 
                    onClick={() => setActiveTab('booking')}
                    className="bg-transparent hover:bg-white hover:text-stone-900 text-white border border-white px-8 py-4 rounded font-medium tracking-wider uppercase transition"
                  >
                    Book Polishing
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Shop by Category */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Shop by Category</h2>
                <p className="text-stone-500 mt-1">Find the perfect piece for every style.</p>
              </div>
              <button 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
                className="text-amber-600 font-semibold hover:text-amber-700 flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('925 Silver'); }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer border border-stone-200"
              >
                <div className="h-48 overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80" alt="925 Silver" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg">925 Silver</h3>
                  <p className="text-stone-500 text-sm mt-1">Rings, chains, necklaces & more</p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-wider text-amber-600 uppercase">Shop Now →</span>
                </div>
              </div>

              <div 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('Gold'); }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer border border-stone-200"
              >
                <div className="h-48 overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80" alt="Gold" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg">Gold</h3>
                  <p className="text-stone-500 text-sm mt-1">Timeless gold rings & chains</p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-wider text-amber-600 uppercase">Shop Now →</span>
                </div>
              </div>

              <div 
                onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer border border-stone-200"
              >
                <div className="h-48 overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80" alt="Collections" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg">Collections</h3>
                  <p className="text-stone-500 text-sm mt-1">Men, women, wedding & sets</p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-wider text-amber-600 uppercase">Shop Now →</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('booking')}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer border border-stone-200"
              >
                <div className="h-48 overflow-hidden bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80" alt="Polishing" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg">Polishing</h3>
                  <p className="text-stone-500 text-sm mt-1">Professional cleaning services</p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-wider text-amber-600 uppercase">Book Now →</span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Jewelry */}
          <section className="py-16 bg-white border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Featured Jewelry</h2>
                  <p className="text-stone-500 mt-1">Our most loved pieces, curated for you.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
                  className="text-stone-900 font-semibold hover:text-amber-600 flex items-center space-x-1"
                >
                  <span>See All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((item) => (
                  <div key={item.id} className="group flex flex-col bg-stone-50 rounded-lg overflow-hidden border border-stone-200">
                    <div className="relative h-64 overflow-hidden bg-white">
                      <span className="absolute top-3 left-3 z-10 bg-stone-900 text-white text-xs px-2 py-1 rounded">
                        {item.badge}
                      </span>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-stone-500 mb-1">{item.specs}</div>
                        <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">{item.name}</h3>
                        <div className="flex items-center space-x-1 mb-3">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="text-xs font-semibold">{item.rating}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline space-x-2 mb-4">
                          <span className="font-bold text-stone-900">KSh {item.price.toLocaleString()}</span>
                          {item.oldPrice && (
                            <span className="text-stone-400 text-sm line-through">KSh {item.oldPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => handleAddToCart(item.name)}
                            className="bg-white border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white py-2 text-xs font-semibold uppercase tracking-wider rounded transition"
                          >
                            Add
                          </button>
                          <button 
                            onClick={() => { handleAddToCart(item.name); setActiveTab('shop'); }}
                            className="bg-stone-900 text-white hover:bg-amber-600 py-2 text-xs font-semibold uppercase tracking-wider rounded transition"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Banner */}
          <section className="py-20 bg-stone-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-900 text-white rounded-2xl p-8 sm:p-16 text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80" alt="Shine Background" className="w-full h-full object-cover"/>
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Bring Back the Shine.</h2>
                <p className="text-stone-300 mb-8">Give your favorite jewelry the professional care it deserves. Expert cleaning, polishing, and restoration.</p>
                <button 
                  onClick={() => setActiveTab('booking')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded tracking-wider uppercase transition shadow-md"
                >
                  Book Polishing & Cleaning
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose POLISH 925 */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Why Choose POLISH 925</h2>
              <p className="text-stone-500 mt-2">Quality, authenticity, and care—every time.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg border border-stone-200 text-center">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Quality</h3>
                <p className="text-stone-500 text-sm">Carefully selected jewelry for lasting beauty.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 text-center">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Authenticity</h3>
                <p className="text-stone-500 text-sm">Clear product information you can trust.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 text-center">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Secure Shopping</h3>
                <p className="text-stone-500 text-sm">Safe checkout and payment processing.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 text-center">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">Professional Care</h3>
                <p className="text-stone-500 text-sm">Expert polishing and cleaning services.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* SHOP TAB */}
      {activeTab === 'shop' && (
        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Shop Collection</h2>
              <p className="text-stone-500 mt-1">Browse all 925 Sterling Silver and Gold items.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', '925 Silver', 'Gold'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition ${selectedCategory === cat ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div key={item.id} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm">
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <span className="absolute top-3 left-3 z-10 bg-stone-900 text-white text-xs px-2 py-1 rounded">
                    {item.badge}
                  </span>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-stone-500 mb-1">{item.specs}</div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">{item.name}</h3>
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-xs font-semibold">{item.rating}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="font-bold text-stone-900">KSh {item.price.toLocaleString()}</span>
                      {item.oldPrice && (
                        <span className="text-stone-400 text-sm line-through">KSh {item.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleAddToCart(item.name)}
                        className="bg-white border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white py-2 text-xs font-semibold uppercase tracking-wider rounded transition"
                      >
                        Add
                      </button>
                      <button 
                        onClick={() => { handleAddToCart(item.name); setActiveTab('shop'); }}
                        className="bg-stone-900 text-white hover:bg-amber-600 py-2 text-xs font-semibold uppercase tracking-wider rounded transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* BOOKING TAB */}
      {activeTab === 'booking' && (
        <main className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Book Polishing & Cleaning</h2>
            <p className="text-stone-500 mt-2">Fill in the details and we'll take care of the rest.</p>
          </div>

          {bookingSuccess ? (
            <div className="bg-white border border-stone-200 rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Booking Confirmed!</h3>
              <p className="text-stone-600 mb-6">Thank you, {fullName}. We have received your booking request for your {bookingType}. We will contact you at {phone} shortly.</p>
              <button 
                onClick={() => { setBookingSuccess(false); setActiveTab('home'); }}
                className="bg-stone-900 text-white px-6 py-3 rounded text-xs font-semibold tracking-wider uppercase"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Jewelry Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Chain', 'Watch', 'Jewelry Set', 'Other'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setBookingType(type)}
                      className={`py-3 px-4 text-xs font-semibold rounded border transition ${bookingType === type ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Material</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['925 Sterling Silver', 'Gold', 'Other'].map((mat) => (
                    <button
                      type="button"
                      key={mat}
                      onClick={() => setBookingMaterial(mat)}
                      className={`py-3 px-4 text-xs font-semibold rounded border transition ${bookingMaterial === mat ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Service</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Cleaning', 'Polishing', 'Cleaning + Polishing', 'Inspection'].map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setBookingService(srv)}
                      className={`py-3 px-4 text-xs font-semibold rounded border transition ${bookingService === srv ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'}`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Preferred Date</label>
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Preferred Time</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Morning / 10:00 AM"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Phone *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Location / Additional instructions</label>
                <textarea 
                  rows="3"
                  placeholder="Provide pickup location or notes..."
                  value={locationNotes}
                  onChange={(e) => setLocationNotes(e.target.value)}
                  className="w-full border border-stone-300 rounded p-3 text-sm focus:outline-none focus:border-stone-900"
                ></textarea>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded p-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Estimated cost</span>
                  <span className="font-serif font-bold text-lg text-stone-900">KSh 1,200 – 2,500</span>
                </div>
                <button 
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded text-xs uppercase tracking-wider transition shadow"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-white font-serif tracking-widest text-xl mb-4 font-bold">POLISH 925</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Premium jewelry and professional care in Kenya. Discover timeless elegance with 925 sterling silver and gold.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('Gold'); }} className="hover:text-white transition">Gold Jewelry</button></li>
                <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('925 Silver'); }} className="hover:text-white transition">925 Silver</button></li>
                <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }} className="hover:text-white transition">Rings</button></li>
                <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }} className="hover:text-white transition">Necklaces</button></li>
                <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }} className="hover:text-white transition">Bracelets</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('booking')} className="hover:text-white transition">Polishing</button></li>
                <li><button onClick={() => setActiveTab('booking')} className="hover:text-white transition">Cleaning</button></li>
                <li><button onClick={() => setActiveTab('booking')} className="hover:text-white transition">Jewelry Inspection</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#delivery" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Delivery</a></li>
                <li><a href="#returns" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Returns</a></li>
                <li><a href="#tracking" onClick={(e) => e.preventDefault()} className="hover:text-white transition">Order Tracking</a></li>
                <li><a href="#faqs" onClick={(e) => e.preventDefault()} className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500">
            <p>© 2026 POLISH 925. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Privacy Policy & Terms</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-40 flex justify-around py-3">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-xs ${activeTab === 'home' ? 'text-amber-600 font-bold' : 'text-stone-600'}`}>
          <span className="text-sm">Home</span>
        </button>
        <button onClick={() => setActiveTab('shop')} className={`flex flex-col items-center text-xs ${activeTab === 'shop' ? 'text-amber-600 font-bold' : 'text-stone-600'}`}>
          <span className="text-sm">Shop</span>
        </button>
        <button onClick={() => setActiveTab('booking')} className={`flex flex-col items-center text-xs ${activeTab === 'booking' ? 'text-amber-600 font-bold' : 'text-stone-600'}`}>
          <span className="text-sm">Services</span>
        </button>
        <button onClick={() => setCartCount(prev => prev)} className="flex flex-col items-center text-xs text-stone-600">
          <span className="text-sm">Cart ({cartCount})</span>
        </button>
      </div>
    </div>
  );
}
