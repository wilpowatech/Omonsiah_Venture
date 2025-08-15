// === Site Loaded Message ===
console.log("Site loaded for M. A. Idaiye & Co.");

// === Highlight Active Link in Navbar ===
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".topnav-right a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href === currentPage ||
      (href === "services.html" && currentPage.endsWith("-form.html"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// === Modal Service Request Handler ===
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("service-modal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close");
  const titleEl = document.getElementById("modal-title");
  const serviceType = document.getElementById("service-type");
  const form = document.getElementById("service-form");

  document.querySelectorAll(".service-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-card");
      const svc = card.getAttribute("data-service") + " Request";
      titleEl.textContent = svc;
      serviceType.value = card.getAttribute("data-service");
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Service requested: ${serviceType.value}`);
    modal.style.display = "none";
    form.reset();
  });
});

// === Testimonial Submission with JSONBin Integration ===
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY =
    "$2a$10$Sv81zXtU6lJAkLBA8hTSKOg.DgjWcZcvKSvduv3G2NwIAPwbQZzcO";
  const BIN_ID = "6858f8898960c979a5af8e71";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const form = document.getElementById("testimonial-form");
  const ticker = document.getElementById("testimonial-ticker");

  // Load existing testimonials from JSONBin
  async function loadTestimonials() {
    try {
      const response = await fetch(BIN_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      const data = await response.json();
      const testimonials = data.record.testimonials || [];

      ticker.innerHTML = ""; // Clear previous testimonials

      testimonials.forEach((t) => {
        const span = document.createElement("span");
        span.textContent = `"${t.message}" - ${t.name}`;
        ticker.appendChild(span);
      });
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  }

  // Submit new testimonial and update JSONBin
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("testimonial-name").value.trim();
    const message = document.getElementById("testimonial-message").value.trim();

    if (!name || !message) return;

    try {
      // Get current testimonials
      const response = await fetch(BIN_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      const data = await response.json();
      const testimonials = data.record.testimonials || [];

      // Add new testimonial
      const updated = [...testimonials, { name, message }];

      // Save updated testimonials to JSONBin
      await fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ testimonials: updated }),
      });

      // Reload ticker and reset form
      await loadTestimonials();
      form.reset();
    } catch (err) {
      console.error("Failed to submit testimonial:", err);
    }
  });

  // Load testimonials on page load
  loadTestimonials();
});

// for product gallery
let slideIndex = 0;
const slides = document.querySelectorAll(".gallery-image");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Initial display
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
});

/* =========================================================
   Omonsiah – Products + Cart + Checkout
   - Replace the placeholder products[] below with real items
   - Prices are optional; we’re mainly sending a request list
   ========================================================= */

// 1) PRODUCT CATALOG (edit to match Omonsiah’s equipment)
const products = [
 {
  id: "laparoscopy",
  name: "Laparoscopy Tower",
  desc: `
    <b>Manufacturer:</b> Stryker<br>
    <b>Type:</b> Telescoping laparoscopy cart with monitor and integrated modules<br>
    <b>Features:</b> Mobile design, modular shelves, medical-grade display
  `,
  price: 0,
  img: "assets/images/laparoscopy_tower.jpg"
},
{
  id: "autoclave",
  name: "SciCan Bravo 1946-1 Autoclave",
  desc: `
    <b>Manufacturer:</b> SciCan<br>
    <b>Type:</b> Class B steam sterilizer for medical/dental instruments<br>
    <b>Features:</b> Fast cycles, vacuum-assisted steam, efficient drying
  `,
  price: 0,
  img: "assets/images/autoclave.jpg"
},
{
  id: "blood_gas_analyser",
  name: "Blood Gas Analyzer",
  desc: `
    <b>Manufacturer:</b> Generic<br>
    <b>Type:</b> Diagnostic device for blood gas and pH measurement<br>
    <b>Features:</b> Rapid results, multi-parameter analysis, compact design
  `,
  price: 0,
  img: "assets/images/blood_gas_analyser.webp"
},
{
  id: "sterlizer",
  name: "LX-B Digital Vertical Pressure Steam Sterilizer",
  desc: `
    <b>Manufacturer:</b> Generic<br>
    <b>Type:</b> Digital vertical autoclave for clinical/lab sterilization<br>
    <b>Features:</b> Stainless steel chamber, safety interlocks, auto exhaust
  `,
  price: 0,
  img: "assets/images/sterlizer.jpg"
},
{
  id: "electrophoresis",
  name: "DY-300 Electrophoresis Machine",
  desc: `
    <b>Manufacturer:</b> Generic<br>
    <b>Type:</b> DNA, RNA, and protein separation system<br>
    <b>Features:</b> Stable voltage, clear results, compact design
  `,
  price: 0,
  img: "assets/images/electrophoresis.jpg"
},
{
  id: "haemodialysis",
  name: "Haemodialysis Machine",
  desc: `
    <b>Manufacturer:</b> Generic<br>
    <b>Type:</b> Kidney replacement therapy system<br>
    <b>Features:</b> Blood filtration, digital controls, safety monitoring
  `,
  price: 0,
  img: "assets/images/haemodialysis.avif"
},
{
  id: "ecg",
  name: "Norav 1200W Wireless Stress ECG System",
  desc: `
    <b>Manufacturer:</b> Norav<br>
    <b>Type:</b> Wireless 12-lead ECG for stress testing<br>
    <b>Features:</b> Real-time monitoring, motion artifact reduction, Bluetooth
  `,
  price: 0,
  img: "assets/images/ecg.jpg"
},
{
  id: "wheelchair",
  name: "Wheelchair",
  desc: `
    <b>Manufacturer:</b> Generic<br>
    <b>Type:</b> Manual mobility aid for individuals with limited walking ability<br>
    <b>Features:</b> Foldable frame, durable wheels, ergonomic seating
  `,
  price: 0,
  img: "assets/images/wheelchair.webp"
},
{
  id: "trinocular",
  name: "Trinocular Biological Microscope",
  desc: `
    <b>Manufacturer:</b> LW Scientific, Model LWINS-T4BV-IPL3<br>
    <b>Type:</b> Trinocular biological microscope with S-LED illumination<br>
    <b>Features:</b> 4×–100× objectives, BioVIEW camera, 11.6" monitor
  `,
  img: "assets/images/trinocular.jpg"
},
{
  id: "lcd_digital_microscope",
  name: "LCD Digital Microscope with 4.3\" LCD Screen",
  desc: `
    <b>Manufacturer:</b> Generic, Model DM-4.3LCD<br>
    <b>Type:</b> Digital microscope with integrated LCD display<br>
    <b>Features:</b> LED lighting, fixed magnification, CMOS camera
  `,
  price: 0,
  img: "assets/images/digital_microscope.avif"
},
    {
    id: "peak_flow_meter",
    name: "Peak Flow Meter",
    desc: `
      <b>Manufacturer:</b> Generic, Model PFM-100<br>
      <b>Type:</b> Handheld peak flow meter for respiratory monitoring<br>
      <b>Features:</b> 60–800 L/min range, durable plastic, factory calibrated, includes case
    `,
    price: 0,
    img: "assets/images/peak_flow_meter.jpg"
  },
    {
    id: "automatic_chemistry_analyzer",
    name: "Automatic Chemistry Analyzer",
    desc: `
      <b>Manufacturer:</b> Generic, Model ACA-5000<br>
      <b>Type:</b> Fully automated chemistry analyzer, up to 500 tests/hour<br>
      <b>Features:</b> Spectrophotometric detection, supports serum/plasma/urine, touchscreen interface, USB/LAN connectivity
    `,
    price: 0,
    img: "assets/images/auto_chemistry_analyser.jpg"
  },
    {
      id: "auto_hematology_analyzer",
      name: "5-Part Auto Hematology Analyzer BH-HA630",
      desc: `
        <b>Manufacturer:</b> BIOBASE, Model BH-HA630<br>
        <b>Type:</b> Fully automated 5-part hematology analyzer, up to 60 tests/hour<br>
        <b>Features:</b> Tri-angle laser scatter, flow cytometry, 14" touchscreen, 3 cyanide-free reagents, 100,000 result storage
      `,
      price: 0,
      img: "assets/images/diff_auto_hematology.jpg"
  },
    {
    id: "hamilton_t1_ventilator",
    name: "HAMILTON-T1 Intelligent Transport Ventilator",
    desc: `
      <b>Manufacturer:</b> Hamilton Medical<br>
      <b>Type:</b> Intelligent Transport Ventilator for Adult, Pediatric, Neonatal<br>
      <b>Features:</b> Adaptive Support Ventilation (ASV®), 8.4-inch touchscreen, battery-operated, multiple ventilation modes
    `,
    price: 0,
    img: "assets/images/mechanical_ventilation.png",
  },
    {
    id: "contec_sp100b_spirometer",
    name: "Contec SP100B Handheld Electric Spirometer",
    desc: `
      <b>Manufacturer:</b> Contec Medical Systems<br>
      <b>Type:</b> Portable spirometer for lung function testing<br>
      <b>Key Features:</b> Measures over 100 parameters including FVC, VC, MVV, and MV; 10.1" color LCD touchscreen; Built-in thermal printer; Wi-Fi connectivity; Rechargeable lithium battery
    `,
    price: 0,
    img: "assets/images/electronic_spirometer.avif",
  },
    {
    id: "up_7000_patient_monitor",
    name: "UP-7000 Multi-parameter Patient Monitor",
    desc: `
      <b>Manufacturer:</b> Lepu Medical<br>
      <b>Type:</b> Multi-parameter patient monitor for Adult, Pediatric, and Neonatal<br>
      <b>Features:</b> 12.1" TFT display, up to 9 waveform displays, arrhythmia & ST segment analysis, 2000-hour data trends, built-in rechargeable battery, optional thermal printer
    `,
    price: 0,
    img: "assets/images/patient_monitor.jpg",
  },
    {
    id: "hillrom_trauma_stretcher",
    name: "Hillrom Trauma Stretcher",
    desc: `
      <b>Manufacturer:</b> Hillrom<br>
      <b>Type:</b> High-capacity trauma stretcher for critical care transport<br>
      <b>Features:</b> 700 lb (317.5 kg) weight capacity, full-length X-ray cassette platform, integrated IV pole, Steering Plus™ system, dual-locking brakes, power-washable frame
    `,
    price: 0,
    img: "assets/images/stretcher.webp",
  },
    {
    id: "electric_examination_table",
    name: "Electric Examination Table",
    desc: `
      <b>Manufacturer:</b> [Unknown]<br>
      <b>Type:</b> Height-adjustable electric examination table on casters<br>
      <b>Features:</b> Dual-section top, steel frame with powder-coated finish, foot-control lifting, 50 mm foam padding, locking swivel wheels
    `,
    price: 0,
    img: "assets/images/examination_table.webp",
  },
    {
    id: "electric_operating_table",
    name: "Electric Operating Table",
    desc: `
      <b>Manufacturer:</b> [Unknown]<br>
      <b>Type:</b> Motorized height-adjustable surgical table with electro-hydraulic controls<br>
      <b>Features:</b> Stainless steel frame, modular radiolucent tabletop, multi-position adjustments (Trendelenburg, lateral tilt, head/leg sections), handheld remote control, central locking casters, emergency battery backup
    `,
    price: 0,
    img: "assets/images/operation_table.jpg",
  },
    {
    id: "manual_pediatric_bed",
    name: "Manual Pediatric Hospital Bed",
    desc: `
      <b>Manufacturer:</b> Jingdong Technology<br>
      <b>Type:</b> Fixed-height manual pediatric hospital bed<br>
      <b>Features:</b> Cold-rolled steel frame with electrostatic powder coating, removable acrylic headboard and footboard with cartoon designs, gas spring-assisted side rails with double-lock safety, backrest adjustment (0–70°), legrest adjustment (0–40°), 700 mm bed height, four 125 mm diameter casters with brakes
    `,
    price: 0,
    img: "assets/images/baby_bed.webp",
  },
    {
    id: "medical_resuscitation_trolley_mk_p03",
    name: "MEDIK MK‑P03 Medical Resuscitation Trolley",
    desc: `
      <b>Manufacturer:</b> MEDIK (Zhangjiagang, China)<br>
      <b>Type:</b> Emergency resuscitation trolley with ABS body and steel-reinforced support<br>
      <b>Features:</b> Five drawers with partitions, sliding side shelf, IV pole, CPR board, oxygen holder, 4 castors (2 locking)
    `,
    price: 0,
    img: "assets/images/resuscitation_cart.jpg",
  },
    {
    id: "my_r021_medical_flat_bed",
    name: "MY-R021 Multifunctional Medical Flat Bed",
    desc: `
      <b>Manufacturer:</b> Guangdong Hongyang Medical Equipment Limited<br>
      <b>Type:</b> Manual hospital bed with adjustable height and backrest<br>
      <b>Features:</b> ABS guardrails, oxygen cylinder holder, IV pole, 6-inch casters with brakes, electrostatic powder coating
    `,
    price: 0,
    img: "assets/images/flat_vehicle.avif",
  },
    {
    id: "ya_d7_1_electric_icu_bed",
    name: "YA-D7-1 Electric ICU Patient Bed",
    desc: `
      <b>Manufacturer:</b> MEDIK (Zhangjiagang, China)<br>
      <b>Type:</b> Full electric ICU bed with 5 functions<br>
      <b>Features:</b> Adjustable backrest (0–75°), footrest (0–40°), Trendelenburg (0–12°), Reverse Trendelenburg (0–12°), electric CPR, weighing scale, full-length X-ray translucent platform, central brake system with 125mm casters, and detachable head/footboards
    `,
    price: 0,
    img: "assets/images/hospital_bed3.jpg",
  },
    {
    id: "tryy_400_pharmaceutical_refrigerator",
    name: "TRYY-400 Pharmaceutical Refrigerator Double Door",
    desc: `
      <b>Manufacturer:</b> [Unknown]<br>
      <b>Type:</b> Double-door pharmaceutical refrigerator with 400L capacity<br>
      <b>Features:</b> Maintains 2–8°C for biological products, medicines, reagents, and vaccines; energy-efficient design; suitable for laboratory and medical use
    `,
    price: 0,
    img: "assets/images/pharmaceutical_refrigerator.jpg",
  },
    {
    id: "gromy_10kg_0.01g_digital_scale",
    name: "Gromy 10kg × 0.01g Digital High-Resolution Weighing Scale Balance",
    desc: `
      <b>Manufacturer:</b> Gromy Industry Co., Ltd.<br>
      <b>Type:</b> Digital precision balance with 10kg capacity and 0.01g accuracy<br>
      <b>Features:</b> LED display, stainless steel weighing platform, powered by 6V battery or 12V adapter, CE/ISO/SGS certified
    `,
    price: 0,
    img: "assets/images/scale.avif",
  },
    {
    id: "standing_5_reflector_shadowless_lamp",
    name: "Standing 5-Reflector Shadowless Operating Lamp",
    desc: `
      <b>Manufacturer:</b> Healicom (China)<br>
      <b>Type:</b> Mobile floor-standing surgical light with 5 reflectors<br>
      <b>Features:</b> 60,000 lux illumination, 4000±500K color temperature, 125W bulbs, 150VA input power
    `,
    price: 0,
    img: "assets/images/lamps.avif",
  },
    {
    id: "syringe_infusion_pump",
    name: "Syringe Infusion Pump",
    desc: `
      <b>Manufacturer:</b> [Unknown]<br>
      <b>Type:</b> Precision syringe pump for controlled fluid delivery<br>
      <b>Features:</b> Motor-driven plunger mechanism, accurate flow rates, suitable for small-volume infusions in medical and research settings
    `,
    price: 0,
    img: "assets/images/infusion pumps.jpg",
  },
    {
    id: "kd_legato_100_syringe_pump",
    name: "KD Scientific Legato 100 Syringe Pump",
    desc: `
      <b>Manufacturer:</b> KD Scientific (USA)<br>
      <b>Type:</b> Single-syringe infusion pump with 0.5 µl to 60 ml capacity<br>
      <b>Features:</b> ±0.5% accuracy, ±0.05% reproducibility, 1.28 pl/min to 88.28 ml/min flow range, 4.3" color touchscreen, USB/RS485/TLL interfaces, CE/UL/CSA certified
    `,
    price: 0,
    img: "assets/images/infusion pumps.jpg",
  },
];

// =======================
// 2) CART STATE (Persistent)
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || []; // { id, name, qty }

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// 3) HELPERS
// =======================
const $ = (sel) => document.querySelector(sel);
const fmtQty = (n) => `${n}`;
const encode = (s) => encodeURIComponent(s);

// =======================
// 4) RENDER PRODUCTS
// =======================
function renderProducts() {
  const grid = $("#productsGrid");
  if (!grid) return; // Prevent errors if grid doesn't exist
  grid.innerHTML = products
    .map(
      (p) => `
    <div class="product-card">
      <div class="img-wrap">
        <img src="${p.img || "icons/placeholder.png"}" alt="${p.name}" />
      </div>
      <h4>${p.name}</h4>
      <p style="font-size: 0.9em; color: #555;">${p.desc || ""}</p>
      ${p.price ? `<div class="price">₦${p.price.toLocaleString()}</div>` : ""}
      <div class="qty-row">
        <input type="number" min="1" value="1" id="qty-${p.id}" />
        <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add</button>
      </div>
    </div>
  `
    )
    .join("");
}

// =======================
// 5) CART FUNCTIONS (with saveCart added)
// =======================
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const qtyInput = document.getElementById(`qty-${id}`);
  const qty = Math.max(1, parseInt(qtyInput?.value || "1", 10));

  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id: id, name: product.name, qty });

  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

// =======================
// 5b) UPDATE CART UI
// =======================
function updateCartUI() {
  const count = cart.reduce((a, c) => a + c.qty, 0);
  $("#cartCount") && ( $("#cartCount").textContent = count );
  $("#totalItems") && ( $("#totalItems").textContent = count );

  if ($("#cartItems")) {
    $("#cartItems").innerHTML =
      cart.length === 0
        ? `<em>Your cart is empty.</em>`
        : cart
            .map(
              (i) => `
          <div class="cart-item">
            <div>${i.name} × ${fmtQty(i.qty)}</div>
            <button class="btn btn-outline" onclick="removeFromCart('${i.id}')">Remove</button>
          </div>
        `
            )
            .join("");
  }
}

// =======================
// 6) CHECKOUT FLOW
// =======================
async function handleCheckout(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = $("#clientName").value.trim();
  const phone = $("#clientPhone").value.trim();
  const email = $("#clientEmail").value.trim();
  const address = $("#clientAddress").value.trim();
  const notes = $("#clientNotes").value.trim();
  const waNumber = $("#whatsAppNumber").value.trim();
  const omonsiahEmail = $("#omonsiahEmail").value.trim();

  const lines = [
    `🧾 *New Order Request — Omonsiah*`,
    ``,
    `*Items:*`,
    ...cart.map((i) => `• ${i.name} × ${i.qty}`),
    ``,
    `*Client:* ${name}`,
    `*Phone:* ${phone}`,
    `*Email:* ${email}`,
    `*Address:* ${address}`,
    notes ? `*Notes:* ${notes}` : null,
    ``,
    `Please confirm availability and delivery schedule.`,
  ].filter(Boolean);

  const message = lines.join("\n");

  // Open WhatsApp
  window.open(`https://wa.me/${waNumber}?text=${encode(message)}`, "_blank");

  // Send email via server-side PHP
  try {
    const resp = await fetch("send_order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: omonsiahEmail,
        subject: `New Order Request — ${name}`,
        message,
        client: { name, phone, email, address, notes },
      }),
    });

    if (!resp.ok) throw new Error("Email failed");
    const data = await resp.json();
    if (data.ok) {
      alert("Order sent to WhatsApp and email. We will contact you shortly.");
      clearCart();
      $("#checkoutForm")?.reset();
      document.body.classList.remove("cart-open");
    } else {
      alert("WhatsApp sent. Email could not be sent.");
    }
  } catch (err) {
    console.error(err);
    alert("WhatsApp sent. Email could not be sent.");
  }
}

// =======================
// 7) PAGE INIT
// =======================
function initProductsPage() {
  renderProducts();
  updateCartUI();

  // Cart drawer toggles
  $("#openCartBtn")?.addEventListener("click", () =>
    document.body.classList.add("cart-open")
  );
  $("#closeCartBtn")?.addEventListener("click", () =>
    document.body.classList.remove("cart-open")
  );
  $("#clearCartBtn")?.addEventListener("click", clearCart);

  // Checkout form
  $("#checkoutForm")?.addEventListener("submit", handleCheckout);
}

// =======================
// 8) EXPOSE FUNCTIONS FOR INLINE ONCLICK
// =======================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.initProductsPage = initProductsPage;

// =======================
// 9) AUTO INIT PRODUCTS PAGE SAFELY
// Only runs if function exists and #productsGrid exists
// =======================
if (typeof initProductsPage === "function" && document.querySelector("#productsGrid")) {
  initProductsPage();
}

// CART TOGGLE (works on all pages)
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openCartBtn");
  const closeBtn = document.getElementById("closeCartBtn");
  const clearBtn = document.getElementById("clearCartBtn");

  openBtn?.addEventListener("click", () => document.body.classList.add("cart-open"));
  closeBtn?.addEventListener("click", () => document.body.classList.remove("cart-open"));
  clearBtn?.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartUI();
  });
});

  // Highlight active page in navbar
  document.addEventListener("DOMContentLoaded", () => {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentLocation || 
          link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  });

  document.getElementById("contactSellerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("sellerName").value;
  const email = document.getElementById("sellerEmail").value;
  const phone = document.getElementById("sellerPhone").value;
  const desc = document.getElementById("productDesc").value;

  // Prepare WhatsApp message
  const whatsappNumber = "2348060074414";
  const whatsappMsg = `Hello, my name is ${name}. I am looking for: ${desc}. My contact: ${phone}, Email: ${email}`;
  const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMsg)}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappURL, "_blank");

  // Send email via mailto (note: can't attach images directly without a backend)
  const mailto = `mailto:omonsiahoo@yahoo.com?subject=Product%20Request%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(whatsappMsg)}`;
  window.location.href = mailto;

  alert("Your request has been prepared for WhatsApp and email. Please attach the image in WhatsApp if you selected one.");
});