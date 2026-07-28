"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ─── Data Types ─────────────────────────────────────────────────────────────
export type Destination = {
  id: number;
  name: string;
  tag: string;
  img: string;
  rating: string;
  distance: string;
  duration: string;
  desc: string;
};

export type Experience = {
  id: number;
  category: string;
  title: string;
  desc: string;
  img: string;
  duration: string;
  groupSize: string;
  rating: string;
  price: string;
  color?: string;
  highlights: string[];
};

export type PackageItem = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  duration: string;
  img: string;
  featured: boolean;
  color?: string;
  features: string[];
};

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  tag: string;
  span?: string;
};

export type ContactDetails = {
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export type BookingRecord = {
  id: string;
  packageName: string;
  packagePrice: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  date: string;
  guests: number;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  bookedAt: string;
};

// ─── Default Initial Seed Data ──────────────────────────────────────────────
export const initialDestinations: Destination[] = [
  {
    id: 1, name: "Casuarina Beach", tag: "Beach", img: "/dest-casuarina.png",
    rating: "4.9", distance: "14 km", duration: "Half Day",
    desc: "One of the most beautiful beaches in Sri Lanka with crystal-clear shallow waters and casuarina trees lining the shore.",
  },
  {
    id: 2, name: "Nainativu Island", tag: "Heritage", img: "/dest-nainativu.png",
    rating: "4.8", distance: "45 km", duration: "Full Day",
    desc: "A sacred island accessible by boat, home to the revered Nagapooshani Amman temple surrounded by turquoise sea.",
  },
  {
    id: 3, name: "Jaffna Fort", tag: "History", img: "/dest-fort.png",
    rating: "4.7", distance: "2 km", duration: "2-3 Hours",
    desc: "A stunning Dutch colonial star-shaped fort surrounded by the ocean — one of the best-preserved forts in Asia.",
  },
  {
    id: 4, name: "Delft Island", tag: "Nature", img: "/dest-delft.png",
    rating: "4.9", distance: "60 km", duration: "Full Day",
    desc: "A remote island with wild horses, ancient baobab trees, and pristine untouched beaches — a truly unique experience.",
  },
  {
    id: 5, name: "Keerimalai Springs", tag: "Heritage", img: "/gal-lagoon.png",
    rating: "4.6", distance: "28 km", duration: "2-3 Hours",
    desc: "Natural freshwater springs on the ocean's edge, historically believed to have healing properties.",
  },
  {
    id: 6, name: "Jaffna Lagoon", tag: "Nature", img: "/gal-lagoon.png",
    rating: "4.8", distance: "5 km", duration: "Half Day",
    desc: "A serene lagoon perfect for sunrise boat rides through mangrove corridors with spectacular birdlife.",
  },
];

export const initialExperiences: Experience[] = [
  {
    id: 1,
    category: "Adventure",
    title: "Water Sports & Snorkeling",
    desc: "Dive into crystal-clear waters teeming with colorful coral and marine life. Kayak, snorkel, and paddleboard along Jaffna's stunning coast.",
    img: "/exp-watersports.png",
    duration: "4-6 Hours",
    groupSize: "2-12 people",
    rating: "4.9",
    price: "LKR 10,500",
    color: "from-teal-DEFAULT to-ocean-500",
    highlights: ["Snorkeling gear included", "Expert guide", "Reef exploration", "Kayaking"],
  },
  {
    id: 2,
    category: "Culture",
    title: "Sunset Island Cruise",
    desc: "Sail the magical Palk Bay in a traditional wooden boat as the sun melts into the ocean horizon, painting the sky in breathtaking orange and pink.",
    img: "/exp-sunset.png",
    duration: "3 Hours",
    groupSize: "2-8 people",
    rating: "4.9",
    price: "LKR 13,500",
    color: "from-coral to-sand",
    highlights: ["Traditional boat", "Sunset views", "Photography spots", "Refreshments"],
  },
  {
    id: 3,
    category: "Food",
    title: "Jaffna Food Trail",
    desc: "Embark on a mouth-watering culinary journey through Jaffna's iconic street food, famous crab curry, string hoppers, and traditional sweets.",
    img: "/exp-food.png",
    duration: "3-4 Hours",
    groupSize: "2-10 people",
    rating: "4.8",
    price: "LKR 8,500",
    color: "from-sand to-coral",
    highlights: ["8+ food stops", "Local chef guide", "Hands-on cooking", "Recipes included"],
  },
];

export const initialPackages: PackageItem[] = [
  {
    id: "explorer",
    name: "Explorer",
    subtitle: "Perfect for adventurers",
    price: "LKR 45,000",
    duration: "3 Days / 2 Nights",
    img: "/dest-casuarina.png",
    featured: false,
    color: "from-teal-DEFAULT to-ocean-500",
    features: [
      "Casuarina Beach visit",
      "Jaffna Fort tour",
      "Welcome breakfast",
      "Hotel accommodation",
      "Airport transfers",
      "Local guide (English & Tamil)",
    ],
  },
  {
    id: "voyager",
    name: "Voyager",
    subtitle: "Most popular choice",
    price: "LKR 90,000",
    duration: "5 Days / 4 Nights",
    img: "/exp-sunset.png",
    featured: true,
    color: "from-ocean-500 to-navy",
    features: [
      "All Explorer features",
      "Nainativu island boat tour",
      "Sunset cruise experience",
      "Jaffna food trail",
      "Mid-range hotel (AC)",
      "Daily breakfast & dinner",
      "Photography guide",
      "Delft island visit",
    ],
  },
  {
    id: "prestige",
    name: "Prestige",
    subtitle: "Ultimate luxury experience",
    price: "LKR 150,000",
    duration: "7 Days / 6 Nights",
    img: "/hero.png",
    featured: false,
    color: "from-sand to-coral",
    features: [
      "All Voyager features",
      "Private luxury boat charter",
      "5-Star beach resort stay",
      "Private chef dining experience",
      "Spa & wellness session",
      "Personal chauffeur & SUV",
      "Exclusive island access",
      "24/7 dedicated concierge",
    ],
  },
];

export const initialGallery: GalleryItem[] = [
  { id: 1, src: "/hero.png", alt: "Jaffna Coastline Aerial View", tag: "Beach", span: "col-span-2 row-span-2" },
  { id: 2, src: "/dest-casuarina.png", alt: "Casuarina Beach", tag: "Beach", span: "" },
  { id: 3, src: "/dest-nainativu.png", alt: "Nainativu Temple", tag: "Heritage", span: "" },
  { id: 4, src: "/dest-fort.png", alt: "Jaffna Fort at Sunset", tag: "History", span: "col-span-2" },
  { id: 5, src: "/dest-delft.png", alt: "Delft Island Wild Horses", tag: "Nature", span: "" },
  { id: 6, src: "/exp-sunset.png", alt: "Sunset Boat Cruise", tag: "Experiences", span: "" },
  { id: 7, src: "/exp-food.png", alt: "Jaffna Food Spread", tag: "Culture", span: "" },
  { id: 8, src: "/exp-watersports.png", alt: "Water Sports", tag: "Adventure", span: "" },
  { id: 9, src: "/gal-boats.png", alt: "Traditional Fishing Boats", tag: "Culture", span: "col-span-2" },
  { id: 10, src: "/gal-dance.png", alt: "Cultural Dance Performance", tag: "Culture", span: "" },
  { id: 11, src: "/gal-lagoon.png", alt: "Jaffna Lagoon Sunrise", tag: "Nature", span: "" },
  { id: 12, src: "/gal-palmyra.png", alt: "Palmyra Trees Sunset", tag: "Nature", span: "" },
];

export const initialContact: ContactDetails = {
  phone: "+94 21 222 1234",
  email: "hello@discoverjaffna.lk",
  address: "123 Beach Road, Jaffna, Northern Province, Sri Lanka",
  hours: "Mon–Sat: 8am – 6pm LKT",
};

export const initialBookings: BookingRecord[] = [];

// ─── Context Interface ──────────────────────────────────────────────────────
type DataContextType = {
  isInitialized: boolean;
  destinations: Destination[];
  addDestination: (item: Omit<Destination, "id">) => void;
  updateDestination: (id: number, item: Partial<Destination>) => void;
  deleteDestination: (id: number) => void;

  experiences: Experience[];
  addExperience: (item: Omit<Experience, "id">) => void;
  updateExperience: (id: number, item: Partial<Experience>) => void;
  deleteExperience: (id: number) => void;

  packages: PackageItem[];
  addPackage: (item: Omit<PackageItem, "id"> & { id?: string }) => void;
  updatePackage: (id: string, item: Partial<PackageItem>) => void;
  deletePackage: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: number) => void;

  contact: ContactDetails;
  updateContact: (data: Partial<ContactDetails>) => void;

  bookings: BookingRecord[];
  addBooking: (item: Omit<BookingRecord, "id" | "bookedAt"> & { id?: string }) => void;
  updateBookingStatus: (id: string, status: BookingRecord["status"]) => void;
  deleteBooking: (id: string) => void;

  resetToDefaults: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [packages, setPackages] = useState<PackageItem[]>(initialPackages);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [contact, setContact] = useState<ContactDetails>(initialContact);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);

  const [isInitialized, setIsInitialized] = useState(false);

  // Load stored data from API on mount
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const keys = [
          { key: "usr_destinations", setter: setDestinations },
          { key: "usr_experiences", setter: setExperiences },
          { key: "usr_packages", setter: setPackages },
          { key: "usr_gallery", setter: setGallery },
          { key: "usr_contact", setter: setContact },
          { key: "usr_bookings", setter: setBookings },
        ];

        await Promise.all(
          keys.map(async (item) => {
            const res = await fetch(`/api/store/${item.key}`, { cache: 'no-store' });
            if (res.ok) {
              const data = await res.json();
              if (data && mounted) item.setter(data);
            }
          })
        );
      } catch (err) {
        console.error("Failed to load stored data from KV API", err);
      } finally {
        if (mounted) setIsInitialized(true);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  // Save changes to API
  const saveDestinations = (data: Destination[]) => {
    setDestinations(data);
    fetch("/api/store/usr_destinations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  const saveExperiences = (data: Experience[]) => {
    setExperiences(data);
    fetch("/api/store/usr_experiences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  const savePackages = (data: PackageItem[]) => {
    setPackages(data);
    fetch("/api/store/usr_packages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  const saveGallery = (data: GalleryItem[]) => {
    setGallery(data);
    fetch("/api/store/usr_gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  const saveContact = (data: ContactDetails) => {
    setContact(data);
    fetch("/api/store/usr_contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  // ─── Destination CRUD ──────────────────────────────────────────────────────
  const addDestination = (item: Omit<Destination, "id">) => {
    const newId = destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1;
    saveDestinations([...destinations, { ...item, id: newId }]);
  };

  const updateDestination = (id: number, item: Partial<Destination>) => {
    saveDestinations(destinations.map(d => (d.id === id ? { ...d, ...item } : d)));
  };

  const deleteDestination = (id: number) => {
    saveDestinations(destinations.filter(d => d.id !== id));
  };

  // ─── Experience CRUD ───────────────────────────────────────────────────────
  const addExperience = (item: Omit<Experience, "id">) => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    saveExperiences([...experiences, { ...item, id: newId }]);
  };

  const updateExperience = (id: number, item: Partial<Experience>) => {
    saveExperiences(experiences.map(e => (e.id === id ? { ...e, ...item } : e)));
  };

  const deleteExperience = (id: number) => {
    saveExperiences(experiences.filter(e => e.id !== id));
  };

  // ─── Package CRUD ──────────────────────────────────────────────────────────
  const addPackage = (item: Omit<PackageItem, "id"> & { id?: string }) => {
    const pkgId = item.id || item.name.toLowerCase().replace(/\s+/g, "-");
    savePackages([...packages, { ...item, id: pkgId }]);
  };

  const updatePackage = (id: string, item: Partial<PackageItem>) => {
    savePackages(packages.map(p => (p.id === id ? { ...p, ...item } : p)));
  };

  const deletePackage = (id: string) => {
    savePackages(packages.filter(p => p.id !== id));
  };

  // ─── Gallery CRUD ──────────────────────────────────────────────────────────
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
    saveGallery([...gallery, { ...item, id: newId }]);
  };

  const deleteGalleryItem = (id: number) => {
    saveGallery(gallery.filter(g => g.id !== id));
  };

  // ─── Contact Update ────────────────────────────────────────────────────────
  const updateContact = (data: Partial<ContactDetails>) => {
    saveContact({ ...contact, ...data });
  };

  // ─── Booking CRUD ──────────────────────────────────────────────────────────
  const saveBookings = (data: BookingRecord[]) => {
    setBookings(data);
    fetch("/api/store/usr_bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(console.error);
  };

  const addBooking = (item: Omit<BookingRecord, "id" | "bookedAt"> & { id?: string }) => {
    const bookingId = item.id || `USR-BK-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const dateStr = now.toISOString().replace("T", " ").substring(0, 16);
    const newRecord: BookingRecord = {
      ...item,
      id: bookingId,
      bookedAt: dateStr,
    };
    saveBookings([newRecord, ...bookings]);
  };

  const updateBookingStatus = (id: string, status: BookingRecord["status"]) => {
    saveBookings(bookings.map(b => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    saveBookings(bookings.filter(b => b.id !== id));
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const resetToDefaults = () => {
    saveDestinations(initialDestinations);
    saveExperiences(initialExperiences);
    savePackages(initialPackages);
    saveGallery(initialGallery);
    saveContact(initialContact);
    saveBookings(initialBookings);
  };

  return (
    <DataContext.Provider
      value={{
        isInitialized,
        destinations,
        addDestination,
        updateDestination,
        deleteDestination,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        contact,
        updateContact,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
