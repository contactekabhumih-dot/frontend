import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fallbackProduct = {
  _id: "fallback-product",
  name: "Redensyl Hair Growth Concentrate",
  subtitle: "Powered by 3% Redensyl, Baicapil and AnaGain",
  shortDescription: "Powered by 3% Redensyl, Baicapil and AnaGain, designed for a simple scalp care routine.",
  description: "A clinically backed blend designed to reduce hair fall, strengthen roots and encourage new growth.",
  sku: "EB-RED-50G",
  price: 419,
  originalPrice: 599,
  discountPercent: 30,
  netWeight: "50g",
  rating: 4.8,
  reviewsCount: 124,
  stock: 100,
  images: [
    "/product_pedestal.jpg",
    "/product.jpg",
    "/results.jpg",
    "/texture.jpg"
  ],
  keyIngredients: ["Redensyl 3%", "Baicapil 3%", "AnaGain 3%"],
  benefits: [
    "Reduces hair fall up to 89%",
    "Visible results in 8 to 12 weeks",
    "Lightweight and non-greasy",
    "Safe for daily use"
  ],
  details: [
    { title: "Product Details", content: "Redensyl-led hair care concentrate for a simple daily scalp routine." },
    { title: "Key Ingredients", content: "Redensyl 3%, Baicapil 3% and AnaGain 3%." },
    { title: "How to Use", content: "Apply to a clean, dry scalp, massage gently and leave on as directed on the product label." },
    { title: "Why This Over Others?", content: "A focused three-active formula in a lightweight serum format." },
    { title: "FAQ", content: "Suitable for all hair types. Patch test and follow the product label for use." }
  ],
  faqs: [
    { q: "Is Redensyl suitable for daily scalp use?", a: "Yes, our lightweight formula is designed for daily leave-on application." },
    { q: "How long before visible results?", a: "Most users notice hair fall reduction in 4 weeks and visible new growth in 8 to 12 weeks." }
  ],
  isBestseller: true,
  isFeatured: true,
  showDiscount: true,
  customBadgeText: "Clinical Hair Care",
  updatedBy: "admin@ekabhumih.com"
};

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

const customerStories = [
  {
    id: 0,
    author: "Priya Sharma",
    role: "Using for 6 months",
    initial: "P",
    story: "After struggling with hair fall for years, Redensyl has been a game-changer. Noticeable new growth in 3 months."
  },
  {
    id: 1,
    author: "Rahul Mehta",
    role: "Customer for 1 year",
    initial: "R",
    story: "Natural ingredients and visible results within weeks. The quality and effectiveness are unmatched."
  },
  {
    id: 2,
    author: "Anjali Patel",
    role: "Professional Stylist",
    initial: "A",
    story: "I recommend Eka Bhūmih to all my clients. The botanical formulation is unlike anything else on the market."
  },
  {
    id: 3,
    author: "Sanjay Kumar",
    role: "Using for 8 months",
    initial: "S",
    story: "Finally found a solution that actually works. My scalp health improved dramatically within the first month."
  }
];

const blogArticles = [
  {
    id: 1,
    tag: "Ingredient Guide, 6 min read",
    title: "What Is Redensyl? A Simple Guide to This Hair-Care Active",
    excerpt: "Redensyl is one of the better-known actives used in hair-focused cosmetic formulas. Here is a clear, practical guide to what it is, how brands use it, and where it fits in a simple routine.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=85&w=1400",
    contentSections: [
      {
        heading: "What is Redensyl?",
        paragraphs: [
          "Redensyl is a cosmetic hair-care active developed by Givaudan. The ingredient maker describes it as an active that targets stem cells and human fibroblasts from the dermal papilla.",
          "By helping reactivate resting stem cells, it encourages hair follicles to transition from the resting phase into the active growth phase."
        ]
      },
      {
        heading: "How to Build a Redensyl Routine",
        paragraphs: [
          "For best results, apply Redensyl concentrate directly to a clean, dry scalp once daily. Massage gently with fingertips and leave on without rinsing."
        ]
      }
    ],
    faqs: [
      { q: "Is Redensyl a hair-care ingredient?", a: "Yes. Redensyl is a cosmetic active supplied for hair-care formulations." },
      { q: "How long until visible results?", a: "Most users notice hair fall reduction in 4 weeks and new growth sprouting in 8 to 12 weeks." }
    ]
  },
  {
    id: 2,
    tag: "Hair Care Basics, 7 min read",
    title: "Hair Fall vs Hair Breakage: How to Tell the Difference",
    excerpt: "Not every strand you find on your brush tells the same story. Learn the difference between shedding from the follicle and breakage along the hair shaft.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=85&w=1400",
    contentSections: [
      {
        heading: "Hair Shedding and Hair Breakage are Different",
        paragraphs: [
          "Hair shedding refers to strands leaving the follicle as part of the natural hair growth cycle. You will typically notice a tiny white root bulb at the end.",
          "Hair breakage occurs when dry or chemically damaged hair snaps along the shaft, producing shorter strands without a root bulb."
        ]
      }
    ],
    faqs: [
      { q: "Does hair breakage mean my hair is falling from the root?", a: "Not necessarily. Breakage happens along the hair shaft, whereas hair fall occurs at the follicle level." }
    ]
  },
  {
    id: 3,
    tag: "Scalp Wellness, 5 min read",
    title: "Scalp Health 101: Why Healthy Hair Begins at the Roots",
    excerpt: "The scalp is an extension of facial skin. Discover why scalp micro-biome care and gentle cleansing are the true foundation of stronger, resilient hair.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=85&w=1400",
    contentSections: [
      {
        heading: "Nourishing Your Scalp Micro-Environment",
        paragraphs: [
          "Excess sebum, environmental pollutants, and heavy product buildup can clog scalp pores and stifle hair roots. Keeping your scalp clean and balanced creates optimum conditions for growth.",
          "Gentle daily massage paired with botanical leave-on serums helps improve local blood flow and support follicle nourishment."
        ]
      }
    ],
    faqs: [
      { q: "Should I apply leave-on serums to wet or dry scalp?", a: "Leave-on concentrate serums are best applied to a clean, dry or towel-dried scalp for optimum absorption." }
    ]
  },
  {
    id: 4,
    tag: "Botanical Science, 8 min read",
    title: "Baicapil and AnaGain: The Botanical Synergists in Modern Hair Care",
    excerpt: "Discover how plant-derived extracts like Baicapil (Scutellaria baicalensis, soy and wheat sprouts) and AnaGain (organic pea sprouts) work alongside Redensyl for maximum density.",
    image: "https://images.unsplash.com/photo-1608248597260-14e9c70c6799?auto=format&fit=crop&q=85&w=1400",
    contentSections: [
      {
        heading: "Synergistic Botanical Active Trio",
        paragraphs: [
          "Baicapil combines plant extracts from Scutellaria baicalensis with wheat and soy sprouts to increase cellular energy and stimulate root vitality.",
          "AnaGain, extracted from organic pea sprouts, stimulates specific signaling molecules in the dermal papilla to initiate new hair growth cycles."
        ]
      }
    ],
    faqs: [
      { q: "Are these botanical actives safe for daily use?", a: "Yes. Plant-derived actives are water-based, non-hormonal, and safe for all hair types." }
    ]
  },
  {
    id: 5,
    tag: "Daily Habits, 4 min read",
    title: "5 Simple Scalp Care Habits for Thicker-Looking Hair",
    excerpt: "Small daily habits can make a dramatic difference. From soft scalp massage to avoiding tight hairstyles, here are 5 actionable habits for hair density.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=85&w=1400",
    contentSections: [
      {
        heading: "Actionable Scalp Care Habits",
        paragraphs: [
          "1. Gentle Fingertip Massage: 2 to 3 minutes daily improves local scalp blood circulation.",
          "2. Avoid Excessive Heat Styling: Protect hair follicles from dry heat damage.",
          "3. Consistent Daily Serum Application: Regularity is key for botanical active efficacy."
        ]
      }
    ],
    faqs: [
      { q: "How often should I perform scalp massage?", a: "A brief 2 to 3 minute gentle massage daily during serum application is ideal." }
    ]
  }
];

const getPathForView = (v) => {
  switch (v) {
    case "admin": return "/admin";
    case "admin-login": return "/admin-login";
    case "product": return "/product";
    case "cart": return "/cart";
    case "checkout": return "/checkout";
    case "blogs": return "/blogs";
    case "terms": return "/terms";
    case "privacy": return "/privacy";
    case "refunds": return "/refunds";
    case "cancellation": return "/cancellation";
    case "shipping": return "/shipping";
    default: return "/";
  }
};

const getViewFromPath = (path) => {
  const p = (path || window.location.pathname).toLowerCase().replace(/\/$/, "");
  if (p === "/admin") {
    const token = localStorage.getItem("eb_admin_token");
    return token ? "admin" : "admin-login";
  }
  if (p === "/admin-login") return "admin-login";
  if (p === "/product" || p === "/shop") return "product";
  if (p === "/cart") return "cart";
  if (p === "/checkout") return "checkout";
  if (p === "/blogs" || p === "/blog" || p === "/journal") return "blogs";
  if (p === "/terms") return "terms";
  if (p === "/privacy") return "privacy";
  if (p === "/refunds") return "refunds";
  if (p === "/cancellation") return "cancellation";
  if (p === "/shipping") return "shipping";
  return "home";
};

function App() {
  const [view, setView] = useState(() => getViewFromPath());
  const [imgError, setImgError] = useState(false);
  const [product, setProduct] = useState(fallbackProduct);
  const [cartQty, setCartQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStory, setSelectedStory] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(blogArticles[0]);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const openArticle = (art) => {
    setSelectedArticle(art);
    setView("article");
    window.history.pushState({}, "", "/article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Google Account & Shipping
  const [googleUser, setGoogleUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eb_google_user")) || null;
    } catch {
      return null;
    }
  });
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: ""
  });
  const [order, setOrder] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Admin State
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("eb_admin_token") || "");
  const [admin, setAdmin] = useState(null);
  const [adminTab, setAdminTab] = useState("dashboard");
  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
  const [newCoupon, setNewCoupon] = useState({ code: "", discountPercent: 10, flatDiscount: 0, minOrderValue: 0, usageLimit: 500, startDate: "", expiryDate: "" });
  const [adminCoupons, setAdminCoupons] = useState([]);

  // Email System & Subscribers State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [sendEmailCheckedMap, setSendEmailCheckedMap] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberFilter, setSubscriberFilter] = useState("All");
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [emailSettings, setEmailSettings] = useState(null);
  const [testEmailInput, setTestEmailInput] = useState("");
  const [testEmailResult, setTestEmailResult] = useState(null);
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({ title: "", description: "", discount: "", couponCode: "", startDate: "", endDate: "", bannerUrl: "" });
  const [couponConfirmModal, setCouponConfirmModal] = useState(null);
  const [offerConfirmModal, setOfferConfirmModal] = useState(null);

  const handleFooterSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setToast("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/subscribe`, { email: newsletterEmail, source: "Website Footer" });
      setToast(res.data.message || "Thank you for subscribing to Eka Bhūmih.");
      if (res.data.success) setNewsletterEmail("");
    } catch (err) {
      setToast(err.response?.data?.error || "Could not subscribe");
    } finally {
      setLoading(false);
    }
  };

  // CMS Admin Product Editor State
  const [cmsProduct, setCmsProduct] = useState(null);
  const [cmsDirty, setCmsDirty] = useState(false);
  const [cmsSaveStatus, setCmsSaveStatus] = useState("saved"); // saved | unsaved | saving | error
  const [cmsRevisions, setCmsRevisions] = useState([]);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [pendingTabSwitch, setPendingTabSwitch] = useState(null);

  // Accordion & Sticky Bar State
  const [openDetail, setOpenDetail] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Fetch product from backend API on mount
  const fetchProductFromApi = async () => {
    try {
      const res = await axios.get(`${API}/product`);
      if (res.data && res.data.name) {
        setProduct(res.data);
        setCmsProduct(JSON.parse(JSON.stringify(res.data)));
      }
    } catch (err) {
      console.warn("Could not fetch product from backend API:", err.message);
    }
  };

  useEffect(() => {
    fetchProductFromApi();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromPath());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Route Helper
  const go = (nextView) => {
    if (view === "admin" && adminTab === "product" && cmsDirty) {
      setUnsavedModalOpen(true);
      setPendingTabSwitch(() => () => {
        setView(nextView);
        window.history.pushState({}, "", getPathForView(nextView));
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }
    setView(nextView);
    window.history.pushState({}, "", getPathForView(nextView));
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToCart = () => {
    setToast(`${product.name} added to cart.`);
  };

  const updateCustomer = (field, val) => {
    setCustomer(prev => ({ ...prev, [field]: val }));
  };

  const rawSubtotal = useMemo(() => product.price * cartQty, [product.price, cartQty]);
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent > 0) {
      return Math.round((rawSubtotal * appliedCoupon.discountPercent) / 100);
    }
    if (appliedCoupon.flatDiscount > 0) {
      return Math.min(rawSubtotal, appliedCoupon.flatDiscount);
    }
    return 0;
  }, [rawSubtotal, appliedCoupon]);

  const finalTotal = useMemo(() => Math.max(0, rawSubtotal - discountAmount), [rawSubtotal, discountAmount]);

  // Google Authentication Helper
  const handleCredentialResponse = (response) => {
    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const user = JSON.parse(jsonPayload);
      setGoogleUser(user);
      localStorage.setItem("eb_google_user", JSON.stringify(user));
      setGoogleModalOpen(false);
      setToast(`Signed in as ${user.name}`);

      setCustomer(prev => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email
      }));
    } catch {
      setToast("Google login successful!");
    }
  };

  const googleInitRef = useRef(false);

  useEffect(() => {
    if (googleInitRef.current) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "212125154468-03kgsmm83gbkv7cksqonco5aut06lc33.apps.googleusercontent.com";
    
    const initGsi = () => {
      if (googleInitRef.current || !window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });
      googleInitRef.current = true;
    };

    if (window.google?.accounts?.id) {
      initGsi();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGsi;
    document.body.appendChild(script);
  }, []);

  const triggerGooglePrompt = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setToast("Google Sign In loading... Please try again in a moment.");
    }
  };

  const handleGoogleLogout = () => {
    setGoogleUser(null);
    localStorage.removeItem("eb_google_user");
    setToast("Signed out of Google account");
  };

  // Coupon Handlers
  const applyCouponCode = async (e) => {
    e?.preventDefault();
    if (!couponInput) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/coupons/apply`, {
        code: couponInput,
        subtotal: rawSubtotal
      });
      setAppliedCoupon(res.data);
      setToast(`Coupon ${res.data.code} applied. Saved ${money(res.data.discountAmount)}.`);
    } catch (err) {
      setToast(err.response?.data?.error || "Invalid coupon code");
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setToast("Coupon removed");
  };

  // Place Order
  const placeOrder = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.email || !customer.address || !customer.city || !customer.pincode) {
      setToast("Please complete all shipping & email details.");
      return;
    }
    if (!customer.email.includes("@")) {
      setToast("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    if (paymentMethod === "Razorpay") {
      try {
        const orderRes = await axios.post(`${API}/payment/create-order`, {
          amount: finalTotal,
          receipt: `rcpt_${Date.now()}`
        });

        const { order: rzpOrder, key: rzpKey } = orderRes.data;

        const options = {
          key: rzpKey || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_ekabhumihKey123",
          amount: rzpOrder.amount,
          currency: rzpOrder.currency || "INR",
          name: "Eka Bhūmih",
          description: "Redensyl Hair Growth Concentrate",
          image: window.location.protocol.startsWith("https") ? `${window.location.origin}/logo.png` : "",
          order_id: rzpOrder.id,
          handler: async function (response) {
            try {
              await axios.post(`${API}/payment/verify`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              const payload = {
                customer,
                items: [{
                  productId: product._id,
                  name: product.name,
                  quantity: cartQty,
                  price: product.price
                }],
                totalAmount: finalTotal,
                discountAmount,
                couponCode: appliedCoupon?.code || "",
                paymentMethod: "Razorpay",
                paymentStatus: "PAID",
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              };

              const createOrderRes = await axios.post(`${API}/orders`, payload);
              setOrder(createOrderRes.data.order);
              setCartQty(1);
              setAppliedCoupon(null);
              setCouponInput("");
              go("confirmation");
            } catch {
              setToast("Payment verification failed. Please contact support.");
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: customer.name || googleUser?.name || "",
            email: customer.email || googleUser?.email || "",
            contact: customer.phone || ""
          },
          notes: {
            address: `${customer.address}, ${customer.city} ${customer.pincode}`
          },
          theme: {
            color: "#2f6b38"
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setToast("Payment cancelled. You can try again to complete your order.");
            }
          }
        };

        if (window.Razorpay) {
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } else {
          setToast("Simulating Razorpay Payment...");
          setTimeout(async () => {
            const payload = {
              customer,
              items: [{
                productId: product._id,
                name: product.name,
                quantity: cartQty,
                price: product.price
              }],
              totalAmount: finalTotal,
              discountAmount,
              couponCode: appliedCoupon?.code || "",
              paymentMethod: "Razorpay",
              paymentStatus: "PAID",
              razorpayOrderId: rzpOrder.id,
              razorpayPaymentId: `pay_sim_${Date.now()}`,
              razorpaySignature: "simulated_sig"
            };
            const createOrderRes = await axios.post(`${API}/orders`, payload);
            setOrder(createOrderRes.data.order);
            setCartQty(1);
            setAppliedCoupon(null);
            setCouponInput("");
            go("confirmation");
            setLoading(false);
          }, 1200);
        }
      } catch (err) {
        setToast(err.response?.data?.error || "Failed to initialize Razorpay payment");
        setLoading(false);
      }
    }
  };

  // Admin Auth Handlers
  const adminHeaders = { Authorization: `Bearer ${adminToken}` };

  const handleAdminError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("eb_admin_token");
      setAdminToken("");
      setAdmin(null);
      go("admin-login");
      setToast("Session expired. Please sign in to Admin Panel.");
      return true;
    }
    return false;
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, adminLogin);
      localStorage.setItem("eb_admin_token", res.data.token);
      setAdminToken(res.data.token);
      setAdmin({ email: res.data.email });
      go("admin");
      setAdminTab("dashboard");
    } catch (err) {
      setToast(err.response?.data?.error || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  const loadAdmin = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/dashboard`, { headers: adminHeaders });
      setAdmin(prev => ({ ...(prev || {}), ...res.data }));
      setView("admin");
    } catch (err) {
      handleAdminError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/orders`, { headers: adminHeaders });
      setAdmin(prev => ({ ...(prev || {}), orders: res.data }));
    } catch (err) {
      if (!handleAdminError(err)) {
        setToast("Could not load customer orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status, sendEmail) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${API}/admin/orders/${id}/status`, { status, sendEmail }, { headers: adminHeaders });
      const emailRes = res.data.emailResult;
      if (emailRes) {
        if (emailRes.emailSent) {
          setToast(`Order updated to ${status}. Email accepted by provider!`);
        } else if (emailRes.status === "Not_Configured") {
          setToast(`Order updated to ${status}. Email notice: ${emailRes.message}`);
        } else if (emailRes.status === "No_Email") {
          setToast(`Order updated to ${status}. Customer email unavailable.`);
        } else {
          setToast(`Order updated to ${status}. Email notice: ${emailRes.message || emailRes.error}`);
        }
      } else {
        setToast(`Order status updated to ${status}`);
      }
      await loadAdmin();
      if (adminTab === "orders") await loadOrders();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not update order status");
    } finally {
      setLoading(false);
    }
  };

  const resendOrderEmail = async (orderId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/orders/${orderId}/resend-email`, {}, { headers: adminHeaders });
      const emailRes = res.data.emailResult;
      if (emailRes?.emailSent) {
        setToast("Resent order notification email accepted by provider!");
      } else {
        setToast(`Email resend notice: ${emailRes?.message || emailRes?.error || "Failed"}`);
      }
      await loadOrders();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not resend email");
    } finally {
      setLoading(false);
    }
  };

  const loadAdminCoupons = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/coupons`, { headers: adminHeaders });
      setAdminCoupons(res.data);
    } catch (err) {
      if (!handleAdminError(err)) setToast("Could not load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/coupons`, newCoupon, { headers: adminHeaders });
      const createdCode = newCoupon.code;
      setNewCoupon({ code: "", discountPercent: 10, flatDiscount: 0, minOrderValue: 0, usageLimit: 500, startDate: "", expiryDate: "" });
      await loadAdminCoupons();
      setCouponConfirmModal({ code: createdCode, discount: res.data.discountPercent ? `${res.data.discountPercent}% OFF` : `₹${res.data.flatDiscount} OFF` });
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not create coupon");
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (code) => {
    setLoading(true);
    try {
      await axios.delete(`${API}/admin/coupons/${code}`, { headers: adminHeaders });
      setToast(`Coupon ${code} deleted.`);
      await loadAdminCoupons();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not delete coupon");
    } finally {
      setLoading(false);
    }
  };

  // Subscribers Management
  const loadSubscribers = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/subscribers`, { headers: adminHeaders });
      setSubscribers(res.data);
    } catch (err) {
      if (!handleAdminError(err)) setToast("Could not load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === "Subscribed" ? "Unsubscribed" : "Subscribed";
      await axios.patch(`${API}/admin/subscribers/${id}`, { status: newStatus }, { headers: adminHeaders });
      setToast(`Subscriber status changed to ${newStatus}`);
      await loadSubscribers();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not update subscriber");
    } finally {
      setLoading(false);
    }
  };

  // Offers & Campaign Handlers
  const loadOffers = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/offers`, { headers: adminHeaders });
      setOffers(res.data);
    } catch (err) {
      if (!handleAdminError(err)) setToast("Could not load offers.");
    } finally {
      setLoading(false);
    }
  };

  const submitNewOfferForm = (e) => {
    e.preventDefault();
    if (!newOffer.title) return;
    setOfferConfirmModal({ ...newOffer });
  };

  const createOfferWithCampaign = async (sendCampaign) => {
    if (!offerConfirmModal) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/offers`, { ...offerConfirmModal, sendCampaign }, { headers: adminHeaders });
      setToast(`Offer "${offerConfirmModal.title}" created.`);
      setNewOffer({ title: "", description: "", discount: "", couponCode: "", startDate: "", endDate: "", bannerUrl: "" });
      setOfferConfirmModal(null);
      await loadOffers();
      if (res.data.campaignResult?.summary) {
        setToast(`Offer published! Campaign: ${res.data.campaignResult.summary.message}`);
      }
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not create offer");
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/campaigns`, { headers: adminHeaders });
      setCampaigns(res.data.campaigns || []);
      setEmailLogs(res.data.logs || []);
    } catch (err) {
      if (!handleAdminError(err)) setToast("Could not load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const retryCampaignFailed = async (campaignId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/campaigns/${campaignId}/retry`, {}, { headers: adminHeaders });
      setToast(`Retried failed recipients: ${res.data.summary?.sent || 0} sent.`);
      await loadCampaigns();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not retry campaign");
    } finally {
      setLoading(false);
    }
  };

  const sendCouponCampaign = async () => {
    if (!couponConfirmModal) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/campaigns/send-coupon`, {
        couponCode: couponConfirmModal.code,
        discountText: couponConfirmModal.discount,
        description: `Use code ${couponConfirmModal.code} during checkout for special savings.`
      }, { headers: adminHeaders });
      setToast(`Coupon Campaign Result: ${res.data.summary?.message || "Processed"}`);
      setCouponConfirmModal(null);
      await loadCampaigns();
    } catch (err) {
      if (!handleAdminError(err)) setToast(err.response?.data?.error || "Could not send campaign");
    } finally {
      setLoading(false);
    }
  };

  // Email Settings & Test Email
  const loadEmailSettings = async () => {
    if (!adminToken) return go("admin-login");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/email/settings`, { headers: adminHeaders });
      setEmailSettings(res.data);
    } catch (err) {
      if (!handleAdminError(err)) setToast("Could not load email settings.");
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async (e) => {
    e.preventDefault();
    if (!testEmailInput || !testEmailInput.includes("@")) {
      setToast("Please enter a valid test email address.");
      return;
    }
    setLoading(true);
    setTestEmailResult(null);
    try {
      const res = await axios.post(`${API}/admin/email/test`, { testEmail: testEmailInput }, { headers: adminHeaders });
      setTestEmailResult(res.data);
      if (res.data.emailSent) {
        setToast("Test email accepted by provider!");
      } else {
        setToast(res.data.message || res.data.error || "Test email failed");
      }
      await loadEmailSettings();
    } catch (err) {
      const errMsg = err.response?.data?.error || "Could not send test email";
      setTestEmailResult({ success: false, error: errMsg, message: errMsg });
      setToast(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // CMS Product Editor Logic
  const initCmsEditor = () => {
    const cloned = JSON.parse(JSON.stringify(product));
    setCmsProduct(cloned);
    setCmsDirty(false);
    setCmsSaveStatus("saved");
    fetchProductRevisions();
  };

  const updateCmsField = (field, val) => {
    setCmsProduct(prev => {
      const updated = { ...prev, [field]: val };
      if (field === "price" || field === "originalPrice") {
        const p = field === "price" ? Number(val) : Number(updated.price);
        const orig = field === "originalPrice" ? Number(val) : Number(updated.originalPrice);
        if (orig > 0 && orig > p) {
          updated.discountPercent = Math.round(((orig - p) / orig) * 100);
        }
      }
      return updated;
    });
    setCmsDirty(true);
    setCmsSaveStatus("unsaved");
  };

  const handleImageFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setCmsProduct(prev => ({
          ...prev,
          images: [...(prev.images || []), reader.result]
        }));
        setCmsDirty(true);
        setCmsSaveStatus("unsaved");
      };
      reader.readAsDataURL(file);
    });
  };

  const fetchProductRevisions = async () => {
    try {
      const res = await axios.get(`${API}/admin/product/revisions`, { headers: adminHeaders });
      setCmsRevisions(res.data);
    } catch {
      setCmsRevisions([]);
    }
  };

  const saveCmsProduct = async () => {
    if (!cmsProduct?.name || !cmsProduct?.price) {
      setToast("Product Name and Price are required.");
      return;
    }
    setCmsSaveStatus("saving");
    try {
      const res = await axios.put(`${API}/admin/product`, cmsProduct, { headers: adminHeaders });
      setProduct(res.data);
      setCmsProduct(JSON.parse(JSON.stringify(res.data)));
      setCmsDirty(false);
      setCmsSaveStatus("saved");
      setToast("Product saved successfully to database!");
      fetchProductRevisions();
    } catch (err) {
      setCmsSaveStatus("error");
      setToast(err.response?.data?.error || "Could not save product");
    }
  };

  const discardCmsChanges = () => {
    setCmsProduct(JSON.parse(JSON.stringify(product)));
    setCmsDirty(false);
    setCmsSaveStatus("saved");
    setToast("Discarded unsaved changes.");
  };

  const handleAdminTabSelect = async (tab) => {
    if (adminTab === "product" && cmsDirty) {
      setPendingTabSwitch(() => async () => {
        setAdminTab(tab);
        setCmsDirty(false);
        if (tab === "dashboard") loadAdmin();
        if (tab === "orders") await loadOrders();
        if (tab === "coupons") await loadAdminCoupons();
        if (tab === "offers") await loadOffers();
        if (tab === "subscribers") await loadSubscribers();
        if (tab === "campaigns") await loadCampaigns();
        if (tab === "email") await loadEmailSettings();
        if (tab === "product") initCmsEditor();
      });
      setUnsavedModalOpen(true);
      return;
    }
    setAdminTab(tab);
    if (tab === "dashboard") loadAdmin();
    if (tab === "orders") loadOrders();
    if (tab === "coupons") loadAdminCoupons();
    if (tab === "offers") loadOffers();
    if (tab === "subscribers") loadSubscribers();
    if (tab === "campaigns") loadCampaigns();
    if (tab === "email") loadEmailSettings();
    if (tab === "product") initCmsEditor();
  };

  const logoutAdmin = () => {
    localStorage.removeItem("eb_admin_token");
    setAdminToken("");
    setAdmin(null);
    setAdminLogin({ email: "", password: "" });
    go("home");
    setToast("Logged out of Admin Panel");
  };

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      {/* UNSAVED CHANGES GUARD MODAL */}
      {unsavedModalOpen && (
        <div className="modal-overlay" onClick={() => setUnsavedModalOpen(false)}>
          <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
            <h2>Unsaved Changes</h2>
            <p>You have unsaved product edits. Are you sure you want to leave without saving?</p>
            <div className="modal-btn-row">
              <button className="button button-light" onClick={() => setUnsavedModalOpen(false)}>
                Stay on Editor
              </button>
              <button className="button button-primary" onClick={() => {
                setCmsDirty(false);
                setUnsavedModalOpen(false);
                if (pendingTabSwitch) pendingTabSwitch();
              }}>
                Discard & Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE ACCOUNT AUTH & PROFILE MODAL */}
      {googleModalOpen && (
        <div className="modal-overlay" onClick={() => setGoogleModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button type="button" className="text-button modal-close-text" onClick={() => setGoogleModalOpen(false)}>Close</button>
            {googleUser ? (
              <div className="google-user-profile-view">
                <div className="google-user-head">
                  {!imgError && googleUser.picture ? (
                    <img
                      src={googleUser.picture}
                      alt={googleUser.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="google-profile-large-img"
                    />
                  ) : (
                    <div className="google-avatar-fallback">
                      {googleUser.name ? googleUser.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <div>
                    <h2>{googleUser.name}</h2>
                    <p>{googleUser.email}</p>
                    <span className="logged-in-tag">Signed in with Google Account</span>
                  </div>
                </div>

                <div className="google-user-actions" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                  <button className="button button-primary full" onClick={() => { setGoogleModalOpen(false); go("checkout"); }}>
                    Proceed to Checkout
                  </button>
                  <button className="button button-light full" onClick={() => { handleGoogleLogout(); setGoogleModalOpen(false); }}>
                    Sign Out of Google Account
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="google-auth-header">
                  <h2>Sign In with Google</h2>
                  <p>Fast, secure 1-click Google Account sign in and instant checkout.</p>
                </div>
                <div className="google-btn-container">
                  <button className="button button-primary full google-continue-btn" onClick={triggerGooglePrompt} disabled={loading}>
                    Continue with Google
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOPBAR HEADER WITH RESTORED NAV ICONS & USER AVATAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button className="brand" onClick={() => go("home")}>
            <div className="brand-logo-box">
              <img src="/logo.png" alt="Eka Bhūmih" className="brand-logo-img" />
            </div>
          </button>

          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            <button onClick={() => go("home")} className={view === "home" ? "active" : ""}>Home</button>
            <button onClick={() => go("product")} className={view === "product" ? "active" : ""}>Shop</button>
            <button onClick={() => scrollToSection("our-story")}>Our Story</button>
            <button onClick={() => scrollToSection("what-is-redensyl")}>What is Redensyl?</button>
            <button onClick={() => go("blogs")} className={view === "blogs" || view === "article" ? "active" : ""}>Blog</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </nav>

          <div className="header-actions">
            <button className="icon-button" onClick={() => setToast("Search feature ready")} aria-label="Search">
              <Search size={20} />
            </button>

            {googleUser ? (
              <div className="user-profile-badge" onClick={() => setGoogleModalOpen(true)} title={googleUser.email} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                {!imgError && googleUser.picture ? (
                  <img
                    src={googleUser.picture}
                    alt={googleUser.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="user-avatar-img"
                    style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 6, objectFit: "cover" }}
                  />
                ) : (
                  <div className="user-avatar-fallback-initial" style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--green)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginRight: 6 }}>
                    {googleUser.name ? googleUser.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="user-name-short">{googleUser.name.split(" ")[0]}</span>
              </div>
            ) : (
              <button className="icon-button google-auth-btn" onClick={() => setGoogleModalOpen(true)} title="Sign in with Google">
                <User size={20} />
              </button>
            )}

            <button className="icon-button cart-button" onClick={() => go("cart")} aria-label="Cart">
              <ShoppingBag size={21} />
              <span className="cart-badge">{cartQty}</span>
            </button>
          </div>
        </div>
      </header>

      {view === "home" && (
        <main className="home-view">
          {/* HERO BANNER SECTION */}
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-copy">
                <span className="eyebrow">Eka Bhūmih Redensyl</span>
                <h1 className="hero-title">
                  Hair care shaped by roots, ritual, and Redensyl.
                </h1>
                <p className="hero-desc">
                  Eka Bhumih brings Redensyl led hair care into a calmer, cleaner routine with fewer steps, softer visuals, and ingredients that stay in focus.
                </p>
                <div className="hero-actions">
                  <button className="button button-primary" onClick={() => go("product")}>
                    Shop Redensyl
                  </button>
                  <button className="button button-light" onClick={() => go("product")}>
                    Explore collection
                  </button>
                </div>
              </div>
              <div className="hero-art-wrapper">
                <div className="hero-art">
                  <img
                    src="/product_pedestal.jpg"
                    alt="Eka Bhūmih Redensyl Hair Growth Concentrate"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4-PILLAR BRAND PHILOSOPHY GRID */}
          <section className="values-container" id="our-story">
            <div className="values-grid">
              <div className="value-item">
                <div className="value-text">
                  <strong>Plant derived actives</strong>
                  <em>Pure. Safe. Effective.</em>
                  <span>Eka Bhūmih builds each ritual around stronger looking roots and healthier looking growth.</span>
                </div>
              </div>

              <div className="value-item">
                <div className="value-text">
                  <strong>Science backed</strong>
                  <em>Clinically researched formulas.</em>
                  <span>Our formulas pair modern hair care intent with a softer botanical point of view.</span>
                </div>
              </div>

              <div className="value-item">
                <div className="value-text">
                  <strong>Gentle on scalp</strong>
                  <em>For all hair types.</em>
                  <span>Our product story is built for everyday use, not for crowded shelves and complicated steps.</span>
                </div>
              </div>

              <div className="value-item">
                <div className="value-text">
                  <strong>Fast and secure delivery</strong>
                  <em>Across India.</em>
                  <span>Consistent use is designed to support fuller looking, calmer, better cared for hair over time.</span>
                </div>
              </div>
            </div>
          </section>

          {/* THE EKA BHŪMIH COLLECTION */}
          <section className="collection-section" id="collection">
            <div className="collection-header">
              <span className="eyebrow">OUR CURATED FORMULAS</span>
              <h2>The Eka Bhūmih Collection</h2>
              <h3>Redensyl led products for healthier looking hair</h3>
              <p>
                Explore Eka Bhūmih formulas created to support the scalp, strengthen strands, and make daily hair care feel more intentional.
              </p>
              <div className="collection-badges">
                <span>Redensyl based support</span>
                <span>Gentle daily ritual</span>
                <span>Minimal care with visible intent</span>
              </div>
            </div>

            <div className="collection-card">
              <div className="spotlight-card">
                <div className="spotlight-header">
                  <span className="eyebrow">FEATURED PRODUCT</span>
                  <h2>{product.name}</h2>
                  <p className="spotlight-desc">{product.shortDescription || product.description || product.subtitle}</p>
                  <div className="price-line">
                    <strong>{money(product.price)}</strong>
                    <span>{money(product.originalPrice)}</span>
                    <em>{product.discountPercent}% OFF</em>
                  </div>
                  <div className="spotlight-action">
                    <button className="button button-primary" onClick={() => go("product")}>
                      Shop Now
                    </button>
                  </div>
                </div>

                <div className="spotlight-image">
                  <img src={product.images?.[1] || fallbackProduct.images[1]} alt={product.name} />
                </div>
              </div>
            </div>
          </section>

          {/* STAR INGREDIENT: WHAT IS REDENSYL? */}
          <section className="star-ingredient-section" id="what-is-redensyl">
            <div className="star-ingredient-card">
              <div className="star-copy">
                <span className="eyebrow">OUR STAR INGREDIENT</span>
                <h2>What is Redensyl?</h2>
                <p>
                  Redensyl is a patented hair growth compound that targets hair follicle stem cells (ORS cells) at the root of the problem. Unlike conventional treatments, it reactivates dormant follicles without hormonal disruption working in harmony with your body's natural growth cycle.
                </p>
                <p className="star-subtext">
                  Developed through advanced botanical science, Redensyl is the first cosmetic ingredient to target hair follicle stem cells, triggering a natural growth cycle for visibly fuller, stronger hair.
                </p>

                <div className="star-badges">
                  <div className="badge-chip">Plant derived DHQG</div>
                  <div className="badge-chip">Clinically Validated</div>
                  <div className="badge-chip">Safe for All Hair Types</div>
                  <div className="badge-chip">No Hormonal Side Effects</div>
                </div>

                <div className="star-actions">
                  <button className="button button-primary" onClick={() => go("product")}>
                    Explore Products
                  </button>
                  <button className="button button-light" onClick={() => go("product")}>
                    View full collection
                  </button>
                </div>
              </div>

              <div className="star-highlight-box">
                <div className="star-tag">Redensyl botanical hair growth</div>
                <div className="star-stat">3x</div>
                <div className="star-stat-label">Hair Growth Support</div>
                <div className="star-standout">
                  <strong>Why it stands out</strong>
                  <p>A modern botanical active designed to support fuller looking hair with a gentle, non hormonal approach.</p>
                </div>
              </div>
            </div>
          </section>

          {/* RITUAL & FORMULA PRINCIPLES */}
          <section className="principles-bar">
            <div className="principles-grid">
              <div className="principle-item">
                <div>
                  <strong>Focused formula</strong>
                  <span>Science backed and botanical led</span>
                </div>
              </div>
              <div className="principle-item">
                <div>
                  <strong>Our daily ritual</strong>
                  <span>Made to feel simple, premium, and easy to repeat</span>
                </div>
              </div>
              <div className="principle-item">
                <div>
                  <strong>Our Redensyl routine</strong>
                  <span>Healthier looking roots, and a calmer everyday hair ritual.</span>
                </div>
              </div>
            </div>
          </section>

          {/* CLINICAL SCALP TRANSFORMATION SHOWCASE */}
          <section className="results-showcase">
            <div className="results-card">
              <div className="results-copy">
                <span className="eyebrow">CLINICAL DENSITY RESULTS</span>
                <h2>Real Scalp Transformation in 90 Days</h2>
                <p>
                  Clinically evaluated over 12 weeks. 89% of users experienced noticeable reduction in hair fall and visible improvement in scalp density from Month 0 to Month 3.
                </p>
                <div className="results-pills">
                  <span>Month 0 to Month 3 Progress</span>
                  <span>3% Redensyl + Baicapil + AnaGain</span>
                </div>
                <button className="button button-primary" onClick={() => go("product")}>
                  Start Your Routine
                </button>
              </div>
              <div className="results-image">
                <img src="/results.jpg" alt="Clinical scalp density improvement Month 0 vs Month 3" />
              </div>
            </div>
          </section>

          {/* FORMULA TEXTURE BANNER */}
          <section className="texture-banner">
            <div className="texture-card">
              <div className="texture-image">
                <img src="/texture.jpg" alt="Golden active serum formula texture" />
              </div>
              <div className="texture-copy">
                <span className="eyebrow">THE FORMULA AND TEXTURE</span>
                <h2>Feather-light Active Concentrate</h2>
                <p>
                  A golden water-based elixir that penetrates quickly into scalp pores without leaving oiliness, weight, or build-up behind. Suitable for all hair types and daily scalp application.
                </p>
              </div>
            </div>
          </section>

          {/* VERIFIED RESULTS & CUSTOMER STORIES */}
          <section className="reviews-section">
            <div className="reviews-header">
              <span className="eyebrow">VERIFIED RESULTS</span>
              <h2>Stories of stronger, healthier-looking hair</h2>
              <p>Explore real experiences from customers who made botanical care part of their routine.</p>
            </div>

            <div className="selected-story-box">
              <div className="story-badge">Selected Story</div>
              <blockquote className="story-quote">
                "{customerStories[selectedStory].story}"
              </blockquote>
              <div className="story-author-info">
                <div className="author-avatar">{customerStories[selectedStory].initial}</div>
                <div>
                  <strong>{customerStories[selectedStory].author}</strong>
                  <span>{customerStories[selectedStory].role}</span>
                </div>
                <div className="full-review-tag">Showing full review</div>
              </div>
            </div>

            <div className="story-grid">
              {customerStories.map((item, idx) => (
                <div
                  key={item.id}
                  className={`story-card ${selectedStory === idx ? "active-story" : ""}`}
                  onClick={() => setSelectedStory(idx)}
                >
                  <div className="story-card-top">
                    <div className="author-avatar small">{item.initial}</div>
                    <div>
                      <strong>{item.author}</strong>
                      <small>{item.role}</small>
                    </div>
                  </div>
                  <p className="story-card-text">"{item.story}"</p>
                  <span className="preview-tag">Tap to preview</span>
                </div>
              ))}
            </div>

            <div className="reviews-action">
              <button className="button button-light" onClick={() => setToast("Thank you for sharing! Reviews can be submitted in your account.")}>
                Share Your Experience
              </button>
            </div>
          </section>

          {/* HAIR CARE INSIGHTS & JOURNAL */}
          <section className="insights-section" id="blog">
            <div className="insights-header">
              <span className="eyebrow">THE EKA BHŪMIH JOURNAL</span>
              <h2>Guidance rooted in science and routine</h2>
              <p>Browse thoughtful reads on scalp care, ingredient education, and practical habits that support healthier-looking hair over time.</p>
            </div>

            <div className="insights-grid">
              {blogArticles.slice(0, 3).map(article => (
                <div className="insight-card" key={article.id} onClick={() => openArticle(article)}>
                  {article.image && <img src={article.image} alt={article.title} className="insight-card-img" />}
                  <div className="insight-card-body">
                    <div className="insight-tag">{article.tag}</div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <button type="button" className="text-button" onClick={(e) => { e.stopPropagation(); openArticle(article); }}>
                      Read article
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="insights-action text-center" style={{ marginTop: "32px" }}>
              <button className="button button-primary" onClick={() => go("blogs")}>
                View all blogs ({blogArticles.length})
              </button>
            </div>
          </section>
        </main>
      )}

      {/* DEDICATED ALL BLOGS LISTING PAGE */}
      {view === "blogs" && (
        <main className="page narrow terms-page blogs-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>

          <div className="insights-header" style={{ marginBottom: "32px", textAlign: "center" }}>
            <span className="eyebrow">THE EKA BHŪMIH JOURNAL</span>
            <h1>All Scalp Care & Hair Science Articles</h1>
            <p>Explore all 5 thoughtful reads on scalp care, ingredient education, and daily habits for healthier-looking hair.</p>
          </div>

          <div className="insights-grid">
            {blogArticles.map(article => (
              <div className="insight-card" key={article.id} onClick={() => openArticle(article)}>
                {article.image && <img src={article.image} alt={article.title} className="insight-card-img" />}
                <div className="insight-card-body">
                  <div className="insight-tag">{article.tag}</div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <button type="button" className="text-button" onClick={(e) => { e.stopPropagation(); openArticle(article); }}>
                    Read article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {view === "product" && (
        <main className="page pd-main-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>

          {/* MAIN PRODUCT HERO SECTION */}
          <div className="product-grid">
            <section>
              <div className="product-main-image">
                {product.isBestseller && <span className="badge">Bestseller</span>}
                <div className="pd-image-badges">
                  <span className="pd-badge pd-badge--soft">{product.customBadgeText || "Clinical Hair Care"}</span>
                  <span className="pd-badge pd-badge--solid">In Stock, Ready to Ship</span>
                </div>
                <img src={product.images?.[selectedImage] || fallbackProduct.images[0]} alt={product.name} />
              </div>
              <div className="thumbs">
                {(product.images || []).map((image, index) => (
                  <button className={selectedImage === index ? "thumb active" : "thumb"} key={image + index} onClick={() => setSelectedImage(index)}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </section>

            <section className="product-info">
              <div className="eyebrow">OUR SIGNATURE PRODUCT</div>
              <h1>{product.name}</h1>
              
              <div className="pd-hero-rating-head">
                <span className="pd-rating-text">{product.rating} out of 5 based on {product.reviewsCount} customer reviews</span>
              </div>

              <p className="pd-summary-text">
                {product.description || product.shortDescription}
              </p>

              <div className="pd-badge-row">
                {(product.benefits || []).slice(0, 4).map((b, i) => (
                  <span key={i} className="pd-inline-pill">{b}</span>
                ))}
              </div>

              <div className="price-line big">
                <strong>{money(product.price)}</strong>
                <span>{money(product.originalPrice)}</span>
                <em>{product.discountPercent}% OFF</em>
              </div>
              <div className="net-weight">Net Wt. {product.netWeight}, Clinically validated formula</div>

              <div className="quantity-row">
                <div className="qty-control text-qty-control">
                  <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.max(1, q - 1))}>-</button>
                  <span className="qty-num">{cartQty}</span>
                  <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.min(product.stock || 99, q + 1))}>+</button>
                </div>
                <button className="button button-primary add-button" onClick={addToCart}>
                  Add to Cart
                </button>
                <button className="button button-light" onClick={() => { addToCart(); go("checkout"); }}>
                  Buy Now
                </button>
              </div>

              {/* ACCORDIONS SECTION BESIDE PRODUCT IMAGE */}
              <section className="pd-section-card full-width-accordions-card" style={{ marginTop: "24px" }}>
                <span className="pd-section-kicker">PRODUCT SPECIFICATIONS AND RITUAL</span>
                <h2>Product Details and Usage Guide</h2>
                <div className="accordions full-width-accordions">
                  {(product.details || fallbackProduct.details).map((item, index) => (
                    <div className={`accordion ${openDetail === index ? "accordion-open" : ""}`} key={item.title}>
                      <button onClick={() => setOpenDetail(openDetail === index ? null : index)}>
                        <span>{item.title}</span>
                        <span className="accordion-state-label">{openDetail === index ? "Hide" : "Show"}</span>
                      </button>
                      {openDetail === index && <p className="accordion-content">{item.content}</p>}
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>

          {/* BENEFITS PROOF STRIP */}
          <section className="pd-proof-strip">
            <article className="pd-proof-card">
              <span className="pd-proof-num">01</span>
              <h3>Hair Growth Activation</h3>
              <p>Formulated with 3% Redensyl to target hair stem cells, awakening dormant follicles for visible new growth.</p>
            </article>
            <article className="pd-proof-card">
              <span className="pd-proof-num">02</span>
              <h3>89% Hair Fall Reduction</h3>
              <p>Strengthens hair roots at the scalp junction to prevent shedding during combing and washing.</p>
            </article>
            <article className="pd-proof-card">
              <span className="pd-proof-num">03</span>
              <h3>Thicker Hair Density</h3>
              <p>Nourishes scalp micro-environment for visibly fuller, stronger, and more resilient hair volume over time.</p>
            </article>
          </section>

          {/* CLINICAL COMPARISON TABLE */}
          <section className="pd-section-card">
            <span className="pd-section-kicker">CLINICAL SUPERIORITY</span>
            <h2>Why Redensyl active outperforms traditional products.</h2>
            <div className="pd-compare-table-wrap">
              <table className="pd-compare-table">
                <thead>
                  <tr>
                    <th>Efficacy Factor</th>
                    <th>Eka Bhūmih Formula</th>
                    <th>Standard Hair Oils</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Active Formulation</strong></td>
                    <td className="pd-compare-ours">3% Redensyl + AnaGain + Botanical Extracts targeting hair stem cells.</td>
                    <td>Generic mineral oils or synthetic fragrance formulas with minimal active ingredients.</td>
                  </tr>
                  <tr>
                    <td><strong>Hair Fall Action</strong></td>
                    <td className="pd-compare-ours">Reactivates dormant stem cells to reduce hair fall by up to 89%.</td>
                    <td>Coats hair strands temporarily without strengthening hair roots.</td>
                  </tr>
                  <tr>
                    <td><strong>Visible Growth Results</strong></td>
                    <td className="pd-compare-ours">Promotes new baby hair sprouting and visible density boost in 8 to 12 weeks.</td>
                    <td>Slow or no visible improvement in hair volume or new hair growth.</td>
                  </tr>
                  <tr>
                    <td><strong>Scalp and Root Feeling</strong></td>
                    <td className="pd-compare-ours">Non-greasy, fast-absorbing micro-formula that penetrates deep into hair follicles.</td>
                    <td>Heavy oil buildup that clogs scalp pores and weighs hair down.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* TARGETED TIMELINE */}
          <section className="pd-section-card">
            <span className="pd-section-kicker">TARGETED TIMELINE</span>
            <h2>Visible results rhythm week by week.</h2>
            <div className="pd-results-steps">
              <article className="pd-result-card">
                <span className="pd-result-phase">Weeks 1 to 3</span>
                <h3>Root Anchoring and Less Shedding</h3>
                <p>Hair fall during washing and combing drops significantly. Scalp feels rebalanced, calm, and deeply nourished.</p>
              </article>
              <article className="pd-result-card">
                <span className="pd-result-phase">Weeks 4 to 8</span>
                <h3>Dormant Follicle Activation</h3>
                <p>Redensyl stimulates resting stem cells, reactivating hair follicles to initiate the new growth cycle.</p>
              </article>
              <article className="pd-result-card">
                <span className="pd-result-phase">Weeks 8 to 12</span>
                <h3>Visible Growth and Density Boost</h3>
                <p>Noticeable new baby hair sprouting along hairline and crown, with significantly fuller root density.</p>
              </article>
            </div>
          </section>

          {/* FORMULATION SCIENCE AND BENEFITS SUMMARY */}
          <section className="pd-story-grid">
            <section className="pd-section-card pd-section-card--story">
              <span className="pd-section-kicker">FORMULATION SCIENCE</span>
              <h2>Targeted Hair Growth Active</h2>
              <p className="pd-long-copy">
                Eka Bhūmih combines 3% Redensyl with targeted botanical extracts to directly act on hair stem cells (ORSc). Unlike traditional oil treatments that only grease the hair shaft, this micro-serum penetrates deep into scalp follicles to arrest root hair fall and accelerate new hair density.
              </p>
            </section>

            <section className="pd-section-card pd-section-card--story">
              <span className="pd-section-kicker">KEY BENEFITS SUMMARY</span>
              <h2>What to expect from regular use</h2>
              <ul className="pd-routine-list">
                {(product.benefits || []).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          </section>

          {/* VERIFIED CUSTOMER REVIEWS */}
          <section className="pd-reviews-section">
            <div className="pd-reviews-header">
              <div>
                <span className="pd-section-kicker">VERIFIED EXPERIENCES</span>
                <h2>Customer Ratings and Real Results</h2>
              </div>
              <div className="pd-reviews-score-card">
                <div className="pd-score-big">{product.rating}</div>
                <div className="pd-score-meta">
                  <span className="pd-rating-text">{product.rating} out of 5 based on {product.reviewsCount} customer reviews</span>
                </div>
              </div>
            </div>

            <div className="pd-reviews-stats-strip">
              <div className="pd-review-stat-item">
                <strong>94%</strong>
                <span>Saw less hair fall in 4 weeks</span>
              </div>
              <div className="pd-review-stat-item">
                <strong>91%</strong>
                <span>Noticed new baby hair growth</span>
              </div>
              <div className="pd-review-stat-item">
                <strong>96%</strong>
                <span>Would recommend to a friend</span>
              </div>
            </div>

            <div className="pd-reviews-grid">
              {customerStories.map(rev => (
                <article key={rev.id} className="pd-review-card">
                  <div className="pd-review-head">
                    <div className="pd-review-user">
                      <div className="pd-review-avatar">{rev.initial}</div>
                      <div>
                        <h4 className="pd-review-name">{rev.author}</h4>
                        <span className="pd-review-verified">Verified Buyer</span>
                      </div>
                    </div>
                    <div className="pd-review-date">{rev.role}</div>
                  </div>

                  <div className="pd-review-stars-wrap">
                    <h5 className="pd-review-title">Verified Result</h5>
                  </div>

                  <p className="pd-review-text">"{rev.story}"</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ENHANCED RICH CART SCREEN */}
      {view === "cart" && (
        <main className="page narrow">
          <div className="page-head">
            <button className="back-link" onClick={() => go("product")}>Continue shopping</button>
          </div>
          <div className="checkout-card">
            <div className="checkout-title-row">
              <div><div className="eyebrow">YOUR CART</div><h1>Cart ({cartQty})</h1></div>
            </div>

            <div className="cart-rich-card">
              <div className="cart-rich-card-inner">
                <div className="cart-rich-media">
                  <img src={product.images?.[0] || "/product_pedestal.jpg"} alt={product.name} className="cart-rich-img" />
                </div>

                <div className="cart-rich-details">
                  <div className="cart-rich-head">
                    <h3>{product.name}</h3>
                    <span className="cart-rich-net-wt">Net Wt. {product.netWeight || "50g"}</span>
                  </div>

                  <p className="cart-rich-desc">
                    {product.shortDescription || product.subtitle || "Powered by 3% Redensyl, Baicapil and AnaGain, designed for a simple scalp care routine."}
                  </p>

                  <div className="cart-rich-ingredients">
                    {(product.keyIngredients || ["Redensyl 3%", "Baicapil 3%", "AnaGain 3%"]).map((ing, i) => (
                      <span key={i} className="cart-ing-chip">{ing}</span>
                    ))}
                  </div>

                  <div className="cart-rich-controls-row">
                    <div className="cart-price-block">
                      <span className="cart-unit-price">Price: {money(product.price)}</span>
                      <strong className="cart-item-subtotal">Subtotal: {money(rawSubtotal)}</strong>
                    </div>

                    <div className="qty-control text-qty-control">
                      <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.max(1, q - 1))}>-</button>
                      <span className="qty-num">{cartQty}</span>
                      <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.min(product.stock || 99, q + 1))}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COUPON INPUT */}
            <div className="coupon-box">
              <form onSubmit={applyCouponCode} className="coupon-form">
                <div className="coupon-input-wrapper">
                  <input
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon code (WELCOME10)"
                  />
                </div>
                <button type="submit" className="button button-light" disabled={loading}>Apply</button>
              </form>

              {appliedCoupon && (
                <div className="applied-coupon-pill">
                  <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({money(discountAmount)} off)</span>
                  <button type="button" onClick={removeCoupon}>Remove</button>
                </div>
              )}
            </div>

            <div className="summary">
              <div><span>Subtotal</span><strong>{money(rawSubtotal)}</strong></div>
              {discountAmount > 0 && (
                <div className="discount-row"><span>Discount ({appliedCoupon?.code})</span><strong className="green-text">-{money(discountAmount)}</strong></div>
              )}
              <div><span>Shipping</span><span className="muted">Free Shipping</span></div>
              <div className="total"><span>Total</span><strong>{money(finalTotal)}</strong></div>
              <button className="button button-primary full" onClick={() => go("checkout")}>Proceed to Checkout</button>
            </div>
          </div>
        </main>
      )}

      {view === "checkout" && (
        <main className="page narrow">
          <div className="page-head">
            <button className="back-link" onClick={() => go("cart")}>Back to Cart</button>
          </div>
          <div className="checkout-card">
            <div className="checkout-title-row">
              <div><div className="eyebrow">CHECKOUT</div><h1>Shipping Address</h1></div>
            </div>

            {!googleUser ? (
              <div className="checkout-google-prompt">
                <div className="checkout-google-head">
                  <div>
                    <strong>Create an account with Google</strong>
                    <p>Sign in with your Google account for 1-click checkout, order tracking, and delivery notifications.</p>
                  </div>
                </div>
                <button type="button" className="button button-primary checkout-google-btn" onClick={triggerGooglePrompt}>
                  Continue with Google
                </button>
              </div>
            ) : (
              <div className="logged-in-checkout-banner">
                <img src={googleUser.picture} alt="" />
                <div>
                  <strong>Signed in as {googleUser.name}</strong>
                  <span>{googleUser.email}</span>
                </div>
                <button type="button" onClick={handleGoogleLogout}>Switch Account</button>
              </div>
            )}

            <form className="form" onSubmit={placeOrder}>
              <label>Full Name<input required value={customer.name} onChange={e => updateCustomer("name", e.target.value)} placeholder="Priya Sharma" /></label>
              <div className="two-col">
                <label>Mobile Number<input required type="tel" value={customer.phone} onChange={e => updateCustomer("phone", e.target.value)} placeholder="+91 98765 43210" /></label>
                <label>Email Address<input required type="email" value={customer.email} onChange={e => updateCustomer("email", e.target.value)} placeholder="priya@gmail.com" /></label>
              </div>
              <label>Address<input required value={customer.address} onChange={e => updateCustomer("address", e.target.value)} placeholder="House No, Street, Area" /></label>
              <div className="two-col">
                <label>City<input required value={customer.city} onChange={e => updateCustomer("city", e.target.value)} placeholder="Mumbai" /></label>
                <label>Pincode<input required value={customer.pincode} onChange={e => updateCustomer("pincode", e.target.value)} placeholder="400001" /></label>
              </div>

              {/* CHECKOUT COUPON BOX */}
              <div className="coupon-box mini">
                {appliedCoupon ? (
                  <div className="applied-coupon-pill">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({money(discountAmount)} off)</span>
                    <button type="button" onClick={removeCoupon}>Remove</button>
                  </div>
                ) : (
                  <div className="coupon-form">
                    <div className="coupon-input-wrapper">
                      <input
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (WELCOME10)"
                      />
                    </div>
                    <button type="button" className="button button-light" onClick={applyCouponCode}>Apply</button>
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD SELECTION */}
              <div className="payment-method-selector">
                <label className="eyebrow" style={{ display: "block", marginBottom: "10px" }}>PAYMENT METHOD</label>
                <div className="payment-options-grid">
                  <div className="payment-option-card selected">
                    <div className="payment-option-head">
                      <div>
                        <strong>Razorpay Secure Online Payment</strong>
                        <span>UPI, GPay, PhonePe, Credit/Debit Cards, Netbanking, Wallets</span>
                      </div>
                      <span className="recommended-badge">Instant & Secure</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout-footer">
                <div>
                  <small>Total Amount</small>
                  <strong>{money(finalTotal)}</strong>
                </div>
                <button className="button button-primary" disabled={loading}>
                  {loading ? "Processing..." : "Pay with Razorpay"}
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {view === "confirmation" && order && (
        <main className="page narrow">
          <div className="confirmation">
            <div className="eyebrow">ORDER CONFIRMATION</div>
            <h1>Thank You</h1>
            <p>Your order has been placed successfully.</p>
            <div className="confirmation-card">
              <div><span>Order ID</span><strong>{order.orderId}</strong></div>
              <div><span>Payment Method</span><strong>{order.paymentMethod === "Razorpay" ? "Razorpay Online (PAID)" : "Cash on Delivery (COD)"}</strong></div>
              {order.razorpayPaymentId && (
                <div><span>Razorpay Payment ID</span><code>{order.razorpayPaymentId}</code></div>
              )}
              <div><span>Date</span><strong>{new Date(order.createdAt).toLocaleDateString("en-IN")}</strong></div>
              <div><span>Total Amount</span><strong>{money(order.totalAmount)}</strong></div>
              {order.discountAmount > 0 && (
                <div><span>Discount</span><strong>-{money(order.discountAmount)} ({order.couponCode})</strong></div>
              )}
              <div><span>Status</span><strong>{order.status}</strong></div>
              <div><span>Customer</span><strong>{order.customer?.name} ({order.customer?.phone})</strong></div>
            </div>
            <button className="button button-primary" onClick={() => go("home")}>Back to Home</button>
          </div>
        </main>
      )}

      {/* FULL STORE POLICY PAGES */}
      {view === "terms" && (
        <main className="page narrow terms-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>
          <article className="policy-card">
            <div className="policy-header">
              <span className="eyebrow">LEGAL AND COMPLIANCE</span>
              <h1>Terms and Conditions</h1>
              <span className="policy-date">Last updated: 22 Feb 2026</span>
            </div>

            <div className="policy-body">
              <p className="policy-intro">
                These Terms and Conditions govern your use of the Ekabhumih website and purchases made through it. By accessing or using this website, you agree to these terms.
              </p>

              <h2>About Ekabhumih</h2>
              <p>
                Ekabhumih sells skin and hair care products, including cosmetic products such as Redensyl Hair Growth Concentrate. We operate from Kaloor, Kochi, Kerala, India.
              </p>

              <h2>Orders and Payments</h2>
              <p>
                Orders are confirmed only after successful payment, unless stated otherwise.
              </p>
              <p>
                Payments are processed securely through Razorpay using available payment methods such as UPI, Cards, Netbanking, and Wallets.
              </p>
              <p>
                We may cancel or refund an order in rare cases such as stock unavailability, technical issues, suspected fraud, or pricing errors.
              </p>

              <h2>Pricing and Taxes</h2>
              <p>
                All prices are displayed in INR and may change without prior notice. Shipping charges, if applicable, are shown during checkout. Taxes, including GST where applicable, are charged according to Indian regulations.
              </p>

              <h2>Shipping and Delivery</h2>
              <p>
                We typically dispatch orders within 24 hours after successful payment. Delivery is usually completed within 2 to 5 business days after dispatch, depending on location, courier availability, and serviceability.
              </p>

              <h2>Returns and Refunds</h2>
              <p>
                Returns and refunds are governed by our Refund Policy. Due to hygiene and safety reasons, opened or used cosmetic products are not eligible for return unless the item received is damaged, defective, or incorrect.
              </p>

              <h2>User Responsibilities</h2>
              <ul>
                <li>You must provide accurate shipping, billing, and contact information.</li>
                <li>You must not misuse the website or attempt fraudulent, abusive, or unauthorized transactions.</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                Ekabhumih is not liable for indirect, incidental, or consequential damages arising from the use of this website or products. Our maximum liability is limited to the amount paid by the customer for the relevant order.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Kerala, India.
              </p>

              <h2>Contact</h2>
              <div className="policy-contact-box">
                <strong>Ekabhumih</strong>
                <span>Email: bhumihlifestyle@gmail.com</span>
                <span>Phone: +91 78290 33319</span>
                <span>Address: Kaloor, Kochi, Kerala, India</span>
              </div>
            </div>
          </article>
        </main>
      )}

      {view === "privacy" && (
        <main className="page narrow terms-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>
          <article className="policy-card">
            <div className="policy-header">
              <span className="eyebrow">PRIVACY AND DATA PROTECTION</span>
              <h1>Privacy Policy</h1>
              <span className="policy-date">Last updated: 22 Feb 2026</span>
            </div>

            <div className="policy-body">
              <p className="policy-intro">
                This Privacy Policy explains how Ekabhumih collects, uses, and protects your information when you use our website to browse and purchase our skin and hair care products.
              </p>

              <h2>Information We Collect</h2>
              <ul>
                <li><strong>Contact Details:</strong> Name, email address, and phone number.</li>
                <li><strong>Shipping Details:</strong> Delivery address and pincode.</li>
                <li><strong>Order Details:</strong> Product name, quantity, order value, and order status.</li>
                <li><strong>Payment Information:</strong> Processed securely by Razorpay. We do not store your card details, UPI details, or bank account credentials on our servers.</li>
              </ul>

              <h2>How We Use Information</h2>
              <ul>
                <li>To process payments, orders, dispatch, and delivery.</li>
                <li>To provide customer support and resolve complaints or issues.</li>
                <li>To send order updates such as confirmation, shipping, and delivery notifications.</li>
                <li>To prevent fraud, abuse, unauthorized access, or suspicious transactions.</li>
              </ul>

              <h2>Sharing of Information</h2>
              <p>
                We share only the minimum necessary information with trusted service providers to complete your order:
              </p>
              <ul>
                <li><strong>Payment Gateway:</strong> Razorpay</li>
                <li><strong>Courier / Logistics Partners:</strong> DTDC or other available courier providers</li>
              </ul>

              <h2>Your Consent</h2>
              <p>
                By using our website, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>

              <h2>Contact</h2>
              <div className="policy-contact-box">
                <strong>Ekabhumih</strong>
                <span>Email: bhumihlifestyle@gmail.com</span>
                <span>Phone: +91 78290 33319</span>
                <span>Address: Kaloor, Kochi, Kerala, India</span>
              </div>
            </div>
          </article>
        </main>
      )}

      {view === "refunds" && (
        <main className="page narrow terms-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>
          <article className="policy-card">
            <div className="policy-header">
              <span className="eyebrow">RETURNS AND REFUNDS</span>
              <h1>Refund and Return Policy</h1>
              <span className="policy-date">Last updated: 22 Feb 2026</span>
            </div>

            <div className="policy-body">
              <p className="policy-intro">
                At Ekabhumih, we sell cosmetic and personal care products. Due to hygiene and safety reasons, returns and refunds are accepted only under the specific conditions mentioned below.
              </p>

              <h2>Returns (Within 7 Days)</h2>
              <p>
                Returns are accepted within 7 days of delivery only if the product is unused, unopened, and in its original packaging.
              </p>
              <p>
                Opened or used cosmetic products are not eligible for return due to hygiene and safety reasons.
              </p>

              <h2>Damaged, Defective, or Wrong Item</h2>
              <p>
                If you receive a damaged, leaked, defective, or incorrect item, contact us as soon as possible after delivery with:
              </p>
              <ul>
                <li>Order ID</li>
                <li>Unboxing photos or videos, if available</li>
                <li>Clear product images showing the issue</li>
              </ul>
              <p>
                After review, we will arrange a replacement or refund where applicable.
              </p>

              <h2>Refund Processing</h2>
              <p>
                If a refund is approved, the amount will be processed back to the original payment method used during purchase.
              </p>
              <p>
                Refund processing typically takes 5 to 7 business days. The final credit time may vary depending on your bank, card network, UPI provider, or payment gateway.
              </p>

              <h2>Non-Returnable Items</h2>
              <p>
                Products that are opened, used, damaged due to customer handling, or not returned in original condition are not eligible for return or refund.
              </p>

              <h2>Contact</h2>
              <div className="policy-contact-box">
                <strong>Ekabhumih</strong>
                <span>Email: bhumihlifestyle@gmail.com</span>
                <span>Phone: +91 78290 33319</span>
                <span>Address: Kaloor, Kochi, Kerala, India</span>
              </div>
            </div>
          </article>
        </main>
      )}

      {view === "cancellation" && (
        <main className="page narrow terms-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>
          <article className="policy-card">
            <div className="policy-header">
              <span className="eyebrow">ORDER MANAGEMENT</span>
              <h1>Cancellation Policy</h1>
              <span className="policy-date">Last updated: 22 Feb 2026</span>
            </div>

            <div className="policy-body">
              <p className="policy-intro">
                At Ekabhumih, customers may contact us immediately after placing an order if they need help with cancellation.
              </p>

              <h2>Order Cancellation</h2>
              <p>
                Orders cannot be guaranteed for cancellation once placed and confirmed. However, if you contact us immediately after placing the order, we will try to assist you if dispatch has not yet started.
              </p>

              <h2>After Dispatch</h2>
              <p>
                Once the order has been dispatched, cancellation is not possible.
              </p>

              <h2>Order Cancellation Window</h2>
              <p>
                Customers may request cancellation only before the order is dispatched. Cancellation requests received after dispatch cannot be accepted.
              </p>

              <h2>How to Request Cancellation</h2>
              <p>
                To request cancellation, customers must contact Ekabhumih support immediately with their Order ID, registered phone number, and reason for cancellation.
              </p>

              <h2>Refund for Approved Cancellation</h2>
              <p>
                If a cancellation request is approved before dispatch, the refund will be processed to the original payment method within 5 to 7 business days.
              </p>

              <h2>Contact</h2>
              <div className="policy-contact-box">
                <strong>Ekabhumih</strong>
                <span>Email: bhumihlifestyle@gmail.com</span>
                <span>Phone: +91 78290 33319</span>
                <span>Address: Kaloor, Kochi, Kerala, India</span>
              </div>
            </div>
          </article>
        </main>
      )}

      {view === "shipping" && (
        <main className="page narrow terms-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Home</button>
          </div>
          <article className="policy-card">
            <div className="policy-header">
              <span className="eyebrow">LOGISTICS AND FULFILLMENT</span>
              <h1>Shipping and Delivery Policy</h1>
              <span className="policy-date">Last updated: 22 Feb 2026</span>
            </div>

            <div className="policy-body">
              <p className="policy-intro">
                Ekabhumih currently ships within India only. Shipping charges, if any, may vary based on delivery pincode and are shown during checkout.
              </p>

              <h2>Dispatch</h2>
              <p>
                Orders are typically dispatched within 24 hours after successful payment, excluding rare cases such as high order volume, address verification, stock issues, public holidays, or unexpected delays.
              </p>

              <h2>Delivery Timeline</h2>
              <p>
                Delivery is usually completed within 2 to 5 business days after dispatch, depending on location, courier availability, and serviceability.
              </p>
              <p>
                We may use DTDC or other available courier partners based on pincode and service availability.
              </p>

              <h2>Shipping Charges</h2>
              <p>
                Shipping charges are calculated based on delivery location, serviceability, and order value, and are displayed before you complete payment.
              </p>

              <h2>Delivery Issues</h2>
              <p>
                If your order is delayed, lost in transit, or marked delivered but not received, please contact support with your order ID and registered phone number or email address. We will assist in checking the status with the courier partner.
              </p>

              <h2>Incorrect Address</h2>
              <p>
                Please make sure your shipping address and pincode are correct before placing an order. Delivery failures due to incorrect or incomplete address may lead to delays or additional shipping charges.
              </p>

              <h2>Contact</h2>
              <div className="policy-contact-box">
                <strong>Ekabhumih</strong>
                <span>Email: bhumihlifestyle@gmail.com</span>
                <span>Phone: +91 78290 33319</span>
                <span>Address: Kaloor, Kochi, Kerala, India</span>
              </div>
            </div>
          </article>
        </main>
      )}

      {/* FULL ARTICLE READER VIEW */}
      {view === "article" && selectedArticle && (
        <main className="page narrow terms-page article-reader-page">
          <div className="page-head">
            <button className="back-link" onClick={() => go("home")}>Back to Journal</button>
          </div>

          <article className="policy-card article-reader-card">
            <div className="policy-header">
              <span className="eyebrow">{selectedArticle.tag}</span>
              <h1>{selectedArticle.title}</h1>
              <p className="policy-intro">{selectedArticle.excerpt}</p>
            </div>

            {selectedArticle.image && (
              <img src={selectedArticle.image} alt={selectedArticle.title} className="article-hero-img" />
            )}

            <div className="policy-body">
              {(selectedArticle.contentSections || []).map((sec, idx) => (
                <div key={idx} className="article-section-block" style={{ marginBottom: "28px" }}>
                  <h2>{sec.heading}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} style={{ marginBottom: "12px", lineHeight: "1.8" }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </article>
        </main>
      )}

      {/* ADMIN LOGIN SCREEN */}
      {view === "admin-login" && (
        <main className="page admin-login-page">
          <form className="admin-login" onSubmit={loginAdmin}>
            <img src="/logo.png" alt="Eka Bhūmih" className="admin-logo-img" />
            <div className="eyebrow">ADMIN PORTAL</div>
            <h1>Admin Panel Login</h1>
            <p>Sign in to view orders, review status, send shipping emails, and edit pricing and coupons.</p>

            <label>Email / Username
              <input
                type="email"
                required
                value={adminLogin.email}
                onChange={e => setAdminLogin({ ...adminLogin, email: e.target.value })}
                placeholder="contact.ekabhumih@gmail.com"
              />
            </label>
            <label>Password
              <input
                type="password"
                required
                value={adminLogin.password}
                onChange={e => setAdminLogin({ ...adminLogin, password: e.target.value })}
                placeholder="••••••••"
              />
            </label>

            <button className="button button-primary full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Admin Panel"}
            </button>
            <button type="button" className="text-button" onClick={() => go("home")}>
              Back to store home
            </button>
          </form>
        </main>
      )}

      {/* COUPON CAMPAIGN CONFIRMATION MODAL */}
      {couponConfirmModal && (
        <div className="modal-overlay" onClick={() => setCouponConfirmModal(null)}>
          <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
            <h2>Coupon Created</h2>
            <p style={{ fontSize: "15px", margin: "12px 0" }}>
              Coupon Code <strong>{couponConfirmModal.code}</strong> ({couponConfirmModal.discount}) has been created.
            </p>
            <h3 style={{ fontSize: "16px", color: "var(--green-dark)", margin: "16px 0 8px" }}>
              Notify subscribers about this offer?
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              Sending will dispatch a branded promotional email campaign to all active subscribers.
            </p>
            <div className="modal-btn-row" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="button button-primary" onClick={sendCouponCampaign} disabled={loading}>
                {loading ? "Sending..." : "Yes, Send Email Campaign"}
              </button>
              <button className="button button-light" onClick={() => setCouponConfirmModal(null)}>
                No, Keep Coupon Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFER CAMPAIGN CONFIRMATION MODAL */}
      {offerConfirmModal && (
        <div className="modal-overlay" onClick={() => setOfferConfirmModal(null)}>
          <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
            <h2>Publish Promotional Offer</h2>
            <p style={{ fontSize: "15px", margin: "12px 0" }}>
              Offer Title: <strong>{offerConfirmModal.title}</strong>
            </p>
            <h3 style={{ fontSize: "16px", color: "var(--green-dark)", margin: "16px 0 8px" }}>
              Notify subscribers about this offer?
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
              Choose whether to launch an email campaign to all subscribed customers.
            </p>
            <div className="modal-btn-row" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="button button-primary" onClick={() => createOfferWithCampaign(true)} disabled={loading}>
                {loading ? "Sending..." : "Yes, Send Email Campaign"}
              </button>
              <button className="button button-light" onClick={() => createOfferWithCampaign(false)} disabled={loading}>
                No, Publish Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL ADMIN PANEL */}
      {view === "admin" && (
        <main className="admin-shell">
          <aside className="admin-sidebar">
            <div className="admin-brand">
              <strong>Eka Bhūmih CMS</strong>
            </div>
            <div className="admin-nav">
              <button className={adminTab === "dashboard" ? "active" : ""} onClick={() => handleAdminTabSelect("dashboard")}>
                Dashboard
              </button>
              <button className={adminTab === "orders" ? "active" : ""} onClick={() => handleAdminTabSelect("orders")}>
                Orders
              </button>
              <button className={adminTab === "product" ? "active" : ""} onClick={() => handleAdminTabSelect("product")}>
                Product Management
              </button>
              <button className={adminTab === "coupons" ? "active" : ""} onClick={() => handleAdminTabSelect("coupons")}>
                Coupons
              </button>
              <button className={adminTab === "offers" ? "active" : ""} onClick={() => handleAdminTabSelect("offers")}>
                Promotional Offers
              </button>
              <button className={adminTab === "subscribers" ? "active" : ""} onClick={() => handleAdminTabSelect("subscribers")}>
                Subscribers
              </button>
              <button className={adminTab === "campaigns" ? "active" : ""} onClick={() => handleAdminTabSelect("campaigns")}>
                Email Campaigns
              </button>
              <button className={adminTab === "email" ? "active" : ""} onClick={() => handleAdminTabSelect("email")}>
                Email Settings
              </button>
            </div>
            <button className="admin-logout" onClick={logoutAdmin}>Logout</button>
          </aside>

          <section className="admin-content">
            <div className="admin-top">
              <div>
                <div className="eyebrow">ADMIN PORTAL ROUTE (/admin)</div>
                <h1>
                  {adminTab === "dashboard" ? "Dashboard Overview" :
                   adminTab === "orders" ? "Customer Orders & Email Notifications" :
                   adminTab === "product" ? "Product Management CMS" :
                   adminTab === "coupons" ? "Manage Coupon Codes" :
                   adminTab === "offers" ? "Promotional Offers" :
                   adminTab === "subscribers" ? "Subscribers List" :
                   adminTab === "campaigns" ? "Email Campaigns & Delivery Logs" :
                   "Email System Configuration"}
                </h1>
              </div>
              <div className="admin-user">{admin?.email || "admin@ekabhumih.com"}</div>
            </div>

            {adminTab === "dashboard" && (
              <>
                {admin?.stats ? (
                  <>
                    <div className="admin-stats">
                      <div><span>Total Orders</span><strong>{admin.stats.totalOrders}</strong></div>
                      <div><span>Pending</span><strong>{admin.stats.pendingOrders}</strong></div>
                      <div><span>Confirmed / Shipped</span><strong>{admin.stats.confirmedOrders}</strong></div>
                      <div><span>Total Revenue</span><strong>{money(admin.stats.totalRevenue)}</strong></div>
                    </div>
                    <div className="admin-panel-card">
                      <div className="panel-head">
                        <h2>Recent Orders</h2>
                        <button onClick={() => handleAdminTabSelect("orders")}>View All Orders</button>
                      </div>
                      <div className="order-table">
                        {(admin.recentOrders || []).map(item => (
                          <div className="order-row" key={item._id}>
                            <div>
                              <strong>{item.orderId}</strong>
                              <span>{item.customer?.name} ({item.customer?.phone})</span>
                            </div>
                            <div>
                              <strong>{money(item.totalAmount)}</strong>
                              <span className={`status ${String(item.status).toLowerCase()}`}>{item.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="empty-admin"><button className="button button-primary" onClick={loadAdmin}>Load Dashboard Overview</button></div>
                )}
              </>
            )}

            {adminTab === "orders" && (
              <div className="admin-panel-card">
                <div className="panel-head">
                  <h2>Review Customer Orders and Dispatch Emails</h2>
                  <button className="button button-light" onClick={loadOrders}>Refresh List</button>
                </div>

                <div className="orders-list">
                  {(admin?.orders || []).map(item => {
                    const hasEmail = Boolean(item.customer?.email);
                    const sendEmailChecked = sendEmailCheckedMap[item._id] !== false;

                    return (
                      <div className="order-detail-card" key={item._id}>
                        <div className="order-info-block">
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <strong>{item.orderId}</strong>
                            <span className={`status ${String(item.status).toLowerCase()}`}>{item.status}</span>
                          </div>
                          <span>Customer: <strong>{item.customer?.name}</strong> | Phone: {item.customer?.phone}</span>
                          {hasEmail ? (
                            <span style={{ color: "var(--green-dark)" }}>Email: {item.customer?.email}</span>
                          ) : (
                            <span style={{ color: "#d32f2f", fontStyle: "italic" }}>Customer email unavailable</span>
                          )}
                          <small>Address: {item.customer?.address}, {item.customer?.city} {item.customer?.pincode}</small>
                          <small className="order-date-tag">Placed on: {new Date(item.createdAt).toLocaleString("en-IN")}</small>
                        </div>

                        <div className="order-actions-block" style={{ gap: "12px" }}>
                          <div className="order-price-box">
                            <strong>{money(item.totalAmount)}</strong>
                            {item.couponCode && <span className="coupon-used-badge">Coupon: {item.couponCode}</span>}
                          </div>

                          <div className="order-status-select-wrap" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <label style={{ fontSize: "12px", fontWeight: "600" }}>New Status:</label>
                            <select
                              value={item.status}
                              onChange={e => updateOrderStatus(item._id, e.target.value, hasEmail && sendEmailChecked)}
                            >
                              {["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map(status => (
                                <option key={status}>{status}</option>
                              ))}
                            </select>

                            <div style={{ marginTop: "4px" }}>
                              {hasEmail ? (
                                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer" }}>
                                  <input
                                    type="checkbox"
                                    checked={sendEmailChecked}
                                    onChange={e => setSendEmailCheckedMap(prev => ({ ...prev, [item._id]: e.target.checked }))}
                                  />
                                  <span>Send email notification to customer</span>
                                </label>
                              ) : (
                                <span className="no-email-badge" style={{ color: "#d32f2f", background: "#fdf2f2", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }}>
                                  Customer email unavailable
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            className="button button-light notify-btn"
                            disabled={!hasEmail || loading}
                            onClick={() => resendOrderEmail(item._id)}
                            title={!hasEmail ? "Customer email unavailable" : "Resend notification email"}
                          >
                            Resend Email Notification
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {!admin?.orders?.length && <div className="empty-state">No orders found.</div>}
                </div>
              </div>
            )}

            {/* FULL REDESIGNED CMS PRODUCT MANAGEMENT UI */}
            {adminTab === "product" && cmsProduct && (
              <div className="cms-product-shell">
                {/* STICKY TOP SAVE BAR */}
                <div className="cms-sticky-bar">
                  <div className="cms-save-status">
                    <span className={`status-dot ${cmsSaveStatus}`}></span>
                    <strong>
                      {cmsSaveStatus === "saving" ? "Saving to Database..." : cmsSaveStatus === "unsaved" ? "Unsaved Changes" : cmsSaveStatus === "error" ? "Save Failed" : "All Changes Saved"}
                    </strong>
                    <small>Last saved by: {cmsProduct.updatedBy || admin?.email || "admin@ekabhumih.com"}</small>
                  </div>

                  <div className="cms-bar-actions">
                    {cmsDirty && (
                      <button type="button" className="button button-light" onClick={discardCmsChanges}>
                        Discard Changes
                      </button>
                    )}
                    <button type="button" className="button button-primary" onClick={saveCmsProduct} disabled={loading || cmsSaveStatus === "saving"}>
                      {cmsSaveStatus === "saving" ? "Saving..." : "Save All Changes to Database"}
                    </button>
                  </div>
                </div>

                {/* 2-COLUMN CMS LAYOUT */}
                <div className="cms-two-col-layout">
                  {/* LEFT COLUMN: LIVE EDITABLE PRODUCT PREVIEW */}
                  <div className="cms-preview-column">
                    <div className="cms-card-sticky">
                      <div className="eyebrow">LIVE EDITABLE PREVIEW</div>
                      <h3>Store Product Card Preview</h3>
                      
                      <div className="cms-preview-card">
                        <div className="cms-preview-img-box">
                          {cmsProduct.isBestseller && <span className="badge">Bestseller</span>}
                          <div className="pd-image-badges">
                            <span className="pd-badge pd-badge--soft">{cmsProduct.customBadgeText || "Clinical Hair Care"}</span>
                            <span className="pd-badge pd-badge--solid">In Stock ({cmsProduct.stock})</span>
                          </div>
                          <img src={cmsProduct.images?.[selectedImage] || cmsProduct.images?.[0] || "/product_pedestal.jpg"} alt={cmsProduct.name} />
                        </div>

                        <div className="cms-preview-thumbs">
                          {(cmsProduct.images || []).map((img, i) => (
                            <img key={i} src={img} alt="" className={selectedImage === i ? "active" : ""} onClick={() => setSelectedImage(i)} />
                          ))}
                        </div>

                        <div className="cms-preview-details">
                          <span className="sku-tag">SKU: {cmsProduct.sku || "EB-RED-50G"}</span>
                          <h4>{cmsProduct.name || "Product Name"}</h4>
                          <p className="cms-short-desc">{cmsProduct.shortDescription || cmsProduct.subtitle}</p>

                          <div className="price-line big">
                            <strong>{money(cmsProduct.price)}</strong>
                            <span>{money(cmsProduct.originalPrice)}</span>
                            <em>{cmsProduct.discountPercent}% OFF</em>
                          </div>

                          <div className="cms-preview-pills">
                            {(cmsProduct.keyIngredients || []).map((ing, i) => (
                              <span key={i} className="badge-chip">{ing}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: CMS EDIT SECTIONS */}
                  <div className="cms-form-column">
                    {/* SECTION 1: BASIC INFORMATION */}
                    <section className="cms-section-card">
                      <h2>1. Basic Product Information</h2>
                      <div className="form two-col">
                        <label>Product Name
                          <input value={cmsProduct.name || ""} onChange={e => updateCmsField("name", e.target.value)} placeholder="Redensyl Hair Growth Concentrate" />
                        </label>

                        <label>SKU / Product Code
                          <input value={cmsProduct.sku || ""} onChange={e => updateCmsField("sku", e.target.value)} placeholder="EB-RED-50G" />
                        </label>

                        <label>Net Weight / Volume
                          <input value={cmsProduct.netWeight || ""} onChange={e => updateCmsField("netWeight", e.target.value)} placeholder="50g" />
                        </label>

                        <label>Available Stock
                          <input type="number" value={cmsProduct.stock ?? 100} onChange={e => updateCmsField("stock", Number(e.target.value))} />
                        </label>
                      </div>

                      <label style={{ marginTop: "12px", display: "block" }}>Short Teaser Description
                        <input value={cmsProduct.shortDescription || ""} onChange={e => updateCmsField("shortDescription", e.target.value)} placeholder="Powered by 3% Redensyl..." />
                      </label>

                      <label style={{ marginTop: "12px", display: "block" }}>Full Description
                        <textarea rows={4} value={cmsProduct.description || ""} onChange={e => updateCmsField("description", e.target.value)} placeholder="A clinically backed blend designed to reduce hair fall..." />
                      </label>
                    </section>

                    {/* SECTION 2: PRICING & DISCOUNT CALCULATOR */}
                    <section className="cms-section-card">
                      <h2>2. Pricing & Automatic Discount Calculator</h2>
                      <div className="form three-col">
                        <label>Selling Price (₹)
                          <input type="number" value={cmsProduct.price ?? 0} onChange={e => updateCmsField("price", Number(e.target.value))} />
                        </label>

                        <label>Original Price / MRP (₹)
                          <input type="number" value={cmsProduct.originalPrice ?? 0} onChange={e => updateCmsField("originalPrice", Number(e.target.value))} />
                        </label>

                        <label>Discount Percentage (%)
                          <input type="number" value={cmsProduct.discountPercent ?? 0} onChange={e => updateCmsField("discountPercent", Number(e.target.value))} />
                        </label>
                      </div>

                      <div className="cms-price-comparison-bar">
                        <span>Live Calculation:</span>
                        <strong>{money(cmsProduct.originalPrice)}</strong>
                        <span>discounted to</span>
                        <strong className="green-text">{money(cmsProduct.price)}</strong>
                        <span className="recommended-badge">{cmsProduct.discountPercent}% OFF Savings</span>
                      </div>
                    </section>

                    {/* SECTION 3: PRODUCT IMAGE GALLERY MANAGEMENT */}
                    <section className="cms-section-card">
                      <h2>3. Product Image Gallery</h2>
                      <p className="section-desc">Manage image ordering, set main cover image, or upload new files.</p>

                      <div className="image-upload-dropzone">
                        <input type="file" multiple accept="image/*" onChange={handleImageFileUpload} id="cms-img-upload" style={{ display: "none" }} />
                        <label htmlFor="cms-img-upload" className="dropzone-label">
                          <strong>Click to Upload Image Files</strong>
                          <span>Supports JPG, PNG, WebP</span>
                        </label>
                      </div>

                      <div className="cms-image-list">
                        {(cmsProduct.images || []).map((imgUrl, i) => (
                          <div className={`cms-img-card ${selectedImage === i ? "is-main" : ""}`} key={i}>
                            <img src={imgUrl} alt="" className="cms-img-thumb" />
                            <div className="cms-img-info">
                              <span className="img-order-badge">#{i + 1} {i === 0 ? "(Main Cover Image)" : ""}</span>
                              <input
                                value={imgUrl}
                                onChange={e => {
                                  const updated = [...cmsProduct.images];
                                  updated[i] = e.target.value;
                                  updateCmsField("images", updated);
                                }}
                                placeholder="Image URL string"
                              />
                              <div className="cms-img-card-actions">
                                <button type="button" className="text-button" onClick={() => setSelectedImage(i)}>
                                  Set Main
                                </button>
                                {i > 0 && (
                                  <button type="button" className="text-button" onClick={() => {
                                    const updated = [...cmsProduct.images];
                                    const temp = updated[i - 1];
                                    updated[i - 1] = updated[i];
                                    updated[i] = temp;
                                    updateCmsField("images", updated);
                                  }}>
                                    Move Up
                                  </button>
                                )}
                                {i < cmsProduct.images.length - 1 && (
                                  <button type="button" className="text-button" onClick={() => {
                                    const updated = [...cmsProduct.images];
                                    const temp = updated[i + 1];
                                    updated[i + 1] = updated[i];
                                    updated[i] = temp;
                                    updateCmsField("images", updated);
                                  }}>
                                    Move Down
                                  </button>
                                )}
                                <button type="button" className="text-button delete-btn" onClick={() => {
                                  const updated = cmsProduct.images.filter((_, idx) => idx !== i);
                                  updateCmsField("images", updated);
                                }}>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* SECTION 4: KEY INGREDIENTS MANAGER */}
                    <section className="cms-section-card">
                      <h2>4. Key Ingredients Manager</h2>
                      <div className="repeatable-list">
                        {(cmsProduct.keyIngredients || []).map((ing, i) => (
                          <div className="repeatable-row" key={i}>
                            <input
                              value={ing}
                              onChange={e => {
                                const updated = [...cmsProduct.keyIngredients];
                                updated[i] = e.target.value;
                                updateCmsField("keyIngredients", updated);
                              }}
                            />
                            <button type="button" className="text-button delete-btn" onClick={() => {
                              const updated = cmsProduct.keyIngredients.filter((_, idx) => idx !== i);
                              updateCmsField("keyIngredients", updated);
                            }}>
                              Remove
                            </button>
                          </div>
                        ))}
                        <button type="button" className="button button-light" onClick={() => {
                          updateCmsField("keyIngredients", [...(cmsProduct.keyIngredients || []), "New Active Ingredient"]);
                        }}>
                          Add Key Ingredient
                        </button>
                      </div>
                    </section>

                    {/* SECTION 5: PRODUCT BENEFITS MANAGER */}
                    <section className="cms-section-card">
                      <h2>5. Product Benefits Manager</h2>
                      <div className="repeatable-list">
                        {(cmsProduct.benefits || []).map((ben, i) => (
                          <div className="repeatable-row" key={i}>
                            <input
                              value={ben}
                              onChange={e => {
                                const updated = [...cmsProduct.benefits];
                                updated[i] = e.target.value;
                                updateCmsField("benefits", updated);
                              }}
                            />
                            <button type="button" className="text-button delete-btn" onClick={() => {
                              const updated = cmsProduct.benefits.filter((_, idx) => idx !== i);
                              updateCmsField("benefits", updated);
                            }}>
                              Remove
                            </button>
                          </div>
                        ))}
                        <button type="button" className="button button-light" onClick={() => {
                          updateCmsField("benefits", [...(cmsProduct.benefits || []), "New Product Benefit"]);
                        }}>
                          Add Benefit Row
                        </button>
                      </div>
                    </section>

                    {/* SECTION 6: PRODUCT DETAILS / ACCORDION SPECIFICATIONS */}
                    <section className="cms-section-card">
                      <h2>6. Product Details & Accordion Specifications</h2>
                      <div className="repeatable-cards-list">
                        {(cmsProduct.details || []).map((det, i) => (
                          <div className="cms-accordion-editor-card" key={i}>
                            <div className="two-col">
                              <label>Accordion Title
                                <input
                                  value={det.title || ""}
                                  onChange={e => {
                                    const updated = [...cmsProduct.details];
                                    updated[i].title = e.target.value;
                                    updateCmsField("details", updated);
                                  }}
                                />
                              </label>
                              <button type="button" className="text-button delete-btn self-end" onClick={() => {
                                const updated = cmsProduct.details.filter((_, idx) => idx !== i);
                                updateCmsField("details", updated);
                              }}>
                                Delete Accordion Section
                              </button>
                            </div>
                            <label style={{ marginTop: "8px", display: "block" }}>Accordion Content Text
                              <textarea
                                rows={2}
                                value={det.content || ""}
                                onChange={e => {
                                  const updated = [...cmsProduct.details];
                                  updated[i].content = e.target.value;
                                  updateCmsField("details", updated);
                                }}
                              />
                            </label>
                          </div>
                        ))}
                        <button type="button" className="button button-light" onClick={() => {
                          updateCmsField("details", [...(cmsProduct.details || []), { title: "New Specification Section", content: "Details text goes here..." }]);
                        }}>
                          Add Accordion Section
                        </button>
                      </div>
                    </section>

                    {/* SECTION 7: DEDICATED FAQ MANAGER */}
                    <section className="cms-section-card">
                      <h2>7. Product FAQ Manager</h2>
                      <div className="repeatable-cards-list">
                        {(cmsProduct.faqs || []).map((faq, i) => (
                          <div className="cms-faq-editor-card" key={i}>
                            <div className="two-col">
                              <label>Question
                                <input
                                  value={faq.q || ""}
                                  onChange={e => {
                                    const updated = [...(cmsProduct.faqs || [])];
                                    updated[i].q = e.target.value;
                                    updateCmsField("faqs", updated);
                                  }}
                                />
                              </label>
                              <button type="button" className="text-button delete-btn self-end" onClick={() => {
                                const updated = cmsProduct.faqs.filter((_, idx) => idx !== i);
                                updateCmsField("faqs", updated);
                              }}>
                                Delete FAQ
                              </button>
                            </div>
                            <label style={{ marginTop: "8px", display: "block" }}>Answer
                              <textarea
                                rows={2}
                                value={faq.a || ""}
                                onChange={e => {
                                  const updated = [...(cmsProduct.faqs || [])];
                                  updated[i].a = e.target.value;
                                  updateCmsField("faqs", updated);
                                }}
                              />
                            </label>
                          </div>
                        ))}
                        <button type="button" className="button button-light" onClick={() => {
                          updateCmsField("faqs", [...(cmsProduct.faqs || []), { q: "New Question?", a: "Answer response goes here." }]);
                        }}>
                          Add FAQ Item
                        </button>
                      </div>
                    </section>

                    {/* SECTION 8: BADGES & TOGGLES */}
                    <section className="cms-section-card">
                      <h2>8. Product Badges & Display Toggles</h2>
                      <div className="form two-col">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={!!cmsProduct.isBestseller}
                            onChange={e => updateCmsField("isBestseller", e.target.checked)}
                          />
                          Show Bestseller Badge
                        </label>

                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={!!cmsProduct.showDiscount}
                            onChange={e => updateCmsField("showDiscount", e.target.checked)}
                          />
                          Show Discount Badge
                        </label>
                      </div>

                      <label style={{ marginTop: "12px", display: "block" }}>Custom Badge Text
                        <input value={cmsProduct.customBadgeText || ""} onChange={e => updateCmsField("customBadgeText", e.target.value)} placeholder="Clinical Hair Care" />
                      </label>
                    </section>

                    {/* SECTION 9: REVISION & CHANGE HISTORY LOG */}
                    <section className="cms-section-card">
                      <h2>9. Product Revision & Change History Log</h2>
                      <div className="revisions-list">
                        {(cmsRevisions || []).map((rev, i) => (
                          <div className="revision-item" key={rev._id || i}>
                            <div>
                              <strong>{rev.productName || "Product Saved"}</strong>
                              <span>Price: {money(rev.price)}</span>
                            </div>
                            <div>
                              <small>Changed by: {rev.changedBy}</small>
                              <small>{new Date(rev.changedAt || rev.createdAt).toLocaleString("en-IN")}</small>
                            </div>
                          </div>
                        ))}
                        {!cmsRevisions.length && <div className="empty-state">No revision history logged yet.</div>}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            )}

            {/* PROMOTIONAL OFFERS MANAGEMENT TAB */}
            {adminTab === "offers" && (
              <div className="admin-panel-card">
                <div className="panel-head">
                  <h2>Promotional Offers & Campaign Releases</h2>
                  <button className="button button-light" onClick={loadOffers}>Refresh Offers</button>
                </div>

                <form onSubmit={submitNewOfferForm} className="create-coupon-form">
                  <h3>Create New Promotional Offer</h3>
                  <div className="two-col">
                    <label>Offer Title
                      <input required value={newOffer.title} onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} placeholder="Festive Density Offer" />
                    </label>
                    <label>Discount Tag Text
                      <input value={newOffer.discount} onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })} placeholder="20% OFF + Free Serum Kit" />
                    </label>
                  </div>
                  <div className="two-col">
                    <label>Associated Coupon Code (Optional)
                      <input value={newOffer.couponCode} onChange={e => setNewOffer({ ...newOffer, couponCode: e.target.value.toUpperCase() })} placeholder="FESTIVE20" />
                    </label>
                    <label>Offer Banner / Image URL
                      <input value={newOffer.bannerUrl} onChange={e => setNewOffer({ ...newOffer, bannerUrl: e.target.value })} placeholder="/results.jpg" />
                    </label>
                  </div>
                  <div className="two-col">
                    <label>Start Date
                      <input type="date" value={newOffer.startDate} onChange={e => setNewOffer({ ...newOffer, startDate: e.target.value })} />
                    </label>
                    <label>End Date
                      <input type="date" value={newOffer.endDate} onChange={e => setNewOffer({ ...newOffer, endDate: e.target.value })} />
                    </label>
                  </div>
                  <label>Offer Description
                    <textarea rows={2} value={newOffer.description} onChange={e => setNewOffer({ ...newOffer, description: e.target.value })} placeholder="Describe offer details, validity and eligible products..." />
                  </label>
                  <button className="button button-primary" disabled={loading}>
                    Create Promotional Offer
                  </button>
                </form>

                <div className="coupons-list" style={{ marginTop: "24px" }}>
                  <h3>Active & Historical Offers</h3>
                  <div className="orders-list">
                    {(offers || []).map(off => (
                      <div className="order-detail-card" key={off._id}>
                        <div className="order-info-block">
                          <strong>{off.title}</strong>
                          <span style={{ color: "var(--green-dark)", fontWeight: "600" }}>{off.discount}</span>
                          {off.couponCode && <span>Code: <strong>{off.couponCode}</strong></span>}
                          <small>{off.description}</small>
                          <small className="order-date-tag">Valid: {off.startDate || "Ongoing"} to {off.endDate || "Ongoing"}</small>
                        </div>
                      </div>
                    ))}
                    {!offers.length && <div className="empty-state">No promotional offers created yet.</div>}
                  </div>
                </div>
              </div>
            )}

            {/* SUBSCRIBERS MANAGEMENT TAB */}
            {adminTab === "subscribers" && (
              <div className="admin-panel-card">
                <div className="panel-head">
                  <h2>Newsletter & Marketing Subscribers ({subscribers.length})</h2>
                  <button className="button button-light" onClick={loadSubscribers}>Refresh Subscribers</button>
                </div>

                <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <input
                    type="text"
                    placeholder="Search subscriber by email..."
                    value={subscriberSearch}
                    onChange={e => setSubscriberSearch(e.target.value)}
                    style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--cream-border)", borderRadius: "8px" }}
                  />
                  <select
                    value={subscriberFilter}
                    onChange={e => setSubscriberFilter(e.target.value)}
                    style={{ padding: "10px 14px", border: "1px solid var(--cream-border)", borderRadius: "8px" }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Subscribed">Subscribed Only</option>
                    <option value="Unsubscribed">Unsubscribed Only</option>
                  </select>
                </div>

                <div className="order-table" style={{ marginTop: "12px" }}>
                  {(subscribers || [])
                    .filter(s => subscriberFilter === "All" || s.status === subscriberFilter)
                    .filter(s => !subscriberSearch || s.email.toLowerCase().includes(subscriberSearch.toLowerCase()))
                    .map(sub => (
                      <div className="order-row" key={sub._id || sub.email} style={{ alignItems: "center" }}>
                        <div>
                          <strong style={{ fontSize: "15px" }}>{sub.email}</strong>
                          <span style={{ fontSize: "12px", color: "var(--muted)" }}>Source: {sub.source || "Website Footer"} | Date: {new Date(sub.subscribedAt || sub.createdAt).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className={`status ${sub.status === "Subscribed" ? "confirmed" : "cancelled"}`}>
                            {sub.status}
                          </span>
                          <button
                            className="button button-light"
                            style={{ fontSize: "12px", padding: "6px 12px" }}
                            onClick={() => toggleSubscriberStatus(sub._id, sub.status)}
                          >
                            {sub.status === "Subscribed" ? "Unsubscribe" : "Reactivate"}
                          </button>
                        </div>
                      </div>
                    ))}
                  {!subscribers.length && <div className="empty-state">No subscribers found.</div>}
                </div>
              </div>
            )}

            {/* EMAIL CAMPAIGNS & LOGS TAB */}
            {adminTab === "campaigns" && (
              <div className="admin-panel-card">
                <div className="panel-head">
                  <h2>Email Campaign History & Delivery Logs</h2>
                  <button className="button button-light" onClick={loadCampaigns}>Refresh Logs</button>
                </div>

                <div className="coupons-list">
                  <h3>Promotional Email Campaigns</h3>
                  <div className="orders-list">
                    {(campaigns || []).map(camp => (
                      <div className="order-detail-card" key={camp._id}>
                        <div className="order-info-block">
                          <strong>{camp.title}</strong>
                          <span>Subject: {camp.subject}</span>
                          <small>Created By: {camp.createdBy} | Date: {new Date(camp.createdAt).toLocaleString("en-IN")}</small>
                          <div style={{ display: "flex", gap: "16px", marginTop: "6px", fontSize: "13px" }}>
                            <span>Recipients: <strong>{camp.recipientsCount}</strong></span>
                            <span style={{ color: "var(--green-dark)" }}>Sent: <strong>{camp.sentCount}</strong></span>
                            <span style={{ color: camp.failedCount > 0 ? "#d32f2f" : "var(--muted)" }}>Failed: <strong>{camp.failedCount}</strong></span>
                          </div>
                        </div>

                        <div className="order-actions-block">
                          <span className={`status ${String(camp.status).toLowerCase().includes("completed") ? "confirmed" : "pending"}`}>
                            {camp.status}
                          </span>
                          {camp.failedCount > 0 && (
                            <button className="button button-primary" style={{ fontSize: "12px" }} onClick={() => retryCampaignFailed(camp._id)}>
                              Retry Failed Emails
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {!campaigns.length && <div className="empty-state">No promotional campaigns created yet.</div>}
                  </div>
                </div>

                <div className="coupons-list" style={{ marginTop: "32px" }}>
                  <h3>Recent Server-Side Email Delivery Logs</h3>
                  <div className="order-table">
                    {(emailLogs || []).map(log => (
                      <div className="order-row" key={log._id} style={{ fontSize: "13px", padding: "10px 14px" }}>
                        <div>
                          <strong>{log.recipientEmail}</strong>
                          <span style={{ fontSize: "12px" }}>Type: {log.emailType} | Subject: {log.subject}</span>
                          {log.error && <small style={{ color: "#d32f2f" }}>Error: {log.error}</small>}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span className={`status ${log.status === "Sent" ? "confirmed" : "cancelled"}`}>
                            {log.status}
                          </span>
                          <small style={{ display: "block", color: "var(--muted)" }}>{new Date(log.sentAt || log.createdAt).toLocaleString("en-IN")}</small>
                        </div>
                      </div>
                    ))}
                    {!emailLogs.length && <div className="empty-state">No email delivery logs recorded yet.</div>}
                  </div>
                </div>
              </div>
            )}

            {/* EMAIL SETTINGS & TEST EMAIL TAB */}
            {adminTab === "email" && (
              <div className="admin-panel-card">
                <div className="panel-head">
                  <h2>Server-Side Email Service Configuration</h2>
                  <button className="button button-light" onClick={loadEmailSettings}>Check Status</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ padding: "16px", background: "var(--cream)", border: "1px solid var(--cream-border)", borderRadius: "10px" }}>
                    <span className="eyebrow">PROVIDER STATUS</span>
                    <h3 style={{ margin: "6px 0", color: emailSettings?.isEmailConfigured ? "var(--green-dark)" : "#d32f2f" }}>
                      {emailSettings?.isEmailConfigured ? "Connected & Verified" : "Not Configured"}
                    </h3>
                    <small style={{ color: "var(--muted)" }}>
                      {emailSettings?.isEmailConfigured ? "Nodemailer SMTP Transporter active" : "EMAIL_PASSWORD missing in backend/.env"}
                    </small>
                  </div>

                  <div style={{ padding: "16px", background: "var(--cream)", border: "1px solid var(--cream-border)", borderRadius: "10px" }}>
                    <span className="eyebrow">SENDER & SMTP</span>
                    <p style={{ margin: "4px 0", fontSize: "14px", fontWeight: "600" }}>{emailSettings?.fromAddress || '"Eka Bhūmih"'}</p>
                    <small style={{ color: "var(--muted)" }}>Host: {emailSettings?.emailHost}:{emailSettings?.emailPort}</small>
                  </div>

                  <div style={{ padding: "16px", background: "var(--cream)", border: "1px solid var(--cream-border)", borderRadius: "10px" }}>
                    <span className="eyebrow">LAST ACTIVITY</span>
                    <small style={{ display: "block", color: "var(--green-dark)" }}>
                      Success: {emailSettings?.lastSuccess ? `${emailSettings.lastSuccess.to} (${new Date(emailSettings.lastSuccess.time).toLocaleTimeString()})` : "None recorded"}
                    </small>
                    <small style={{ display: "block", color: "#d32f2f" }}>
                      Failed: {emailSettings?.lastFailed ? `${emailSettings.lastFailed.to} (${new Date(emailSettings.lastFailed.time).toLocaleTimeString()})` : "None recorded"}
                    </small>
                  </div>
                </div>

                {!emailSettings?.isEmailConfigured && (
                  <div style={{ padding: "16px", background: "#fff8e6", border: "1px solid #ffe0b2", borderRadius: "10px", marginBottom: "24px" }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#b78103" }}>How to Enable Live SMTP Email Delivery:</h4>
                    <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", lineHeight: "1.6", color: "var(--text)" }}>
                      <li>Open <code style={{ background: "#f5eada", padding: "2px 6px", borderRadius: "4px" }}>backend/.env</code></li>
                      <li>Go to <strong>Google Account Security</strong> (myaccount.google.com/apppasswords) and create a 16-digit App Password for <strong>contact.ekabhumih@gmail.com</strong>.</li>
                      <li>Set <code style={{ background: "#f5eada", padding: "2px 6px", borderRadius: "4px" }}>EMAIL_PASSWORD=xxxx xxxx xxxx xxxx</code> in <code style={{ background: "#f5eada", padding: "2px 6px", borderRadius: "4px" }}>backend/.env</code></li>
                      <li>Save the file — the Nodemailer transporter will automatically activate live email delivery!</li>
                    </ol>
                  </div>
                )}

                {/* SEND TEST EMAIL SECTION */}
                <form onSubmit={sendTestEmail} className="create-coupon-form">
                  <h3>Send Test Email Verification</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
                    Verify backend SMTP email delivery by sending a real test message to your inbox.
                  </p>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                    <label style={{ flex: 1, margin: 0 }}>Recipient Email Address
                      <input
                        type="email"
                        required
                        placeholder="your.email@gmail.com"
                        value={testEmailInput}
                        onChange={e => setTestEmailInput(e.target.value)}
                      />
                    </label>
                    <button className="button button-primary" style={{ padding: "12px 24px" }} disabled={loading}>
                      {loading ? "Sending..." : "Send Test Email"}
                    </button>
                  </div>

                  {testEmailResult && (
                    <div style={{ marginTop: "16px", padding: "14px", borderRadius: "8px", background: testEmailResult.emailSent ? "#eef5eb" : "#fdf2f2", border: `1px solid ${testEmailResult.emailSent ? "var(--green)" : "#d32f2f"}` }}>
                      <strong style={{ color: testEmailResult.emailSent ? "var(--green-dark)" : "#d32f2f" }}>
                        {testEmailResult.emailSent ? "Email accepted by the email provider" : testEmailResult.message || testEmailResult.error}
                      </strong>
                      {testEmailResult.providerMessageId && (
                        <small style={{ display: "block", color: "var(--muted)", marginTop: "4px" }}>
                          Provider Message ID: {testEmailResult.providerMessageId}
                        </small>
                      )}
                    </div>
                  )}
                </form>
              </div>
            )}
          </section>
        </main>
      )}

      {/* STICKY ADD TO CART BAR */}
      {(view === "home" || view === "product") && showStickyBar && (
        <div className="sticky-add-bar">
          <div className="sticky-bar-inner">
            <div className="sticky-product-info">
              <img src={product.images?.[0] || fallbackProduct.images[0]} alt="" className="sticky-thumb" />
              <div>
                <strong>{product.name}</strong>
                <span>{money(product.price)} <small>MRP {money(product.originalPrice)}</small></span>
              </div>
            </div>

            <div className="sticky-actions">
              <div className="qty-control text-qty-control small">
                <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.max(1, q - 1))}>-</button>
                <span className="qty-num">{cartQty}</span>
                <button type="button" className="qty-btn" onClick={() => setCartQty(q => Math.min(product.stock || 99, q + 1))}>+</button>
              </div>
              <button className="button button-primary" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="button button-light" onClick={() => { addToCart(); go("checkout"); }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RICH FOOTER WITH RESTORED FOOTER ICONS */}
      <footer className="footer" id="contact">
        <div className="footer-top-strip">
          <div className="footer-newsletter">
            <span className="eyebrow light">BECOME PART OF OUR RITUAL</span>
            <h2>Rooted in science. Crafted for daily scalp care.</h2>
            <p>Subscribe to receive hair growth research updates, scalp wellness guides, and direct offer releases.</p>
            <form onSubmit={handleFooterSubscribe} className="footer-sub-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="button button-primary" disabled={loading}>Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-main-grid">
          <div className="footer-brand-col">
            <img src="/logo.png" alt="Eka Bhūmih" className="footer-logo-img" />
            <p className="footer-brand-desc">
              Eka Bhūmih brings Redensyl led hair care into a calmer, cleaner routine with fewer steps, softer visuals, and ingredients that stay in focus.
            </p>
          </div>

          <div className="footer-links-col">
            <strong>Quick Navigation</strong>
            <div className="footer-links">
              <button onClick={() => go("home")}>Home</button>
              <button onClick={() => go("product")}>Shop Collection</button>
              <button onClick={() => scrollToSection("our-story")}>Our Story and Philosophy</button>
              <button onClick={() => scrollToSection("what-is-redensyl")}>What is Redensyl?</button>
            </div>
          </div>

          <div className="footer-links-col">
            <strong>Store Policies</strong>
            <div className="footer-links">
              <button onClick={() => go("terms")}>Terms and Conditions</button>
              <button onClick={() => go("privacy")}>Privacy Policy</button>
              <button onClick={() => go("refunds")}>Refund and Return Policy</button>
              <button onClick={() => go("cancellation")}>Cancellation Policy</button>
              <button onClick={() => go("shipping")}>Shipping and Delivery</button>
            </div>
          </div>

          <div className="footer-contact-col">
            <strong>Contact and Support</strong>
            <div className="footer-contact-info">
              <span><Mail size={15} style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} /> bhumihlifestyle@gmail.com</span>
              <span><MapPin size={15} style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} /> Kaloor, Kochi, Kerala</span>
              <span><Phone size={15} style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} /> +91 78290 33319</span>
              <small className="contact-hours">Customer Support: Mon to Sat (9 AM to 6 PM)</small>
            </div>
          </div>
        </div>

        <div className="footer-copyright-bar">
          <span>2026 Eka Bhūmih. All rights reserved. Made for healthy hair.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
