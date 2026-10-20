/**
 * Eternal Knot - Online Wedding Booking Website
 * Frontend JavaScript Interactions, Validation & Dynamic Price Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initBookingCalculator();
  initContactForm();
  initGallery();
  initVenueModals();
});

/* ==========================================================================
   1. Navbar Scroll Effect & Active Page Highlighting
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active link detection based on URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. Back To Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   3. Wedding Booking Page - Live Price Estimator & Form Validation
   ========================================================================== */
// Venue prices database for calculation (Frontend simulation)
const venueData = {
  'royal-palace': { name: 'Grand Royal Palace', basePrice: 8500, maxGuests: 800, location: 'Udaipur, Rajasthan' },
  'sunset-beach': { name: 'Sunset Beach Resort & Spa', basePrice: 6500, maxGuests: 400, location: 'Goa Coastal Coast' },
  'emerald-garden': { name: 'Emerald Garden Estate', basePrice: 5200, maxGuests: 500, location: 'Bangalore Hills' },
  'heritage-fort': { name: 'Heritage Fort & Courtyard', basePrice: 9500, maxGuests: 600, location: 'Jaipur Heritage Hub' },
  'crystal-ballroom': { name: 'Crystal Luxury Ballroom', basePrice: 7000, maxGuests: 450, location: 'Mumbai Financial City' },
  'rustic-vineyard': { name: 'Rustic Vineyard Haven', basePrice: 4800, maxGuests: 300, location: 'Nashik Valley' }
};

// Services price catalog
const serviceData = {
  'decor': { name: 'Wedding Theme Decoration', price: 1500 },
  'catering': { name: 'Gourmet Catering (Menu Setup)', price: 2500 },
  'photography': { name: 'Candid Photography & Cinematic Film', price: 1800 },
  'makeup': { name: 'Bridal & Groom Makeup Artistry', price: 600 },
  'flowers': { name: 'Fresh Exotic Flowers & Fairy Lighting', price: 1200 },
  'music': { name: 'Live Band, Sound & DJ Setup', price: 1000 },
  'planning': { name: 'Full Dedicated Wedding Planner', price: 2000 }
};

function initBookingCalculator() {
  const bookingForm = document.getElementById('weddingBookingForm');
  if (!bookingForm) return;

  const weddingDateInput = document.getElementById('weddingDate');
  const venueSelect = document.getElementById('venueSelect');
  const guestCountInput = document.getElementById('guestCount');
  const serviceCheckboxes = document.querySelectorAll('.service-checkbox');

  // Summary display elements
  const summaryVenueName = document.getElementById('summaryVenueName');
  const summaryVenuePrice = document.getElementById('summaryVenuePrice');
  const summaryGuestCount = document.getElementById('summaryGuestCount');
  const summaryGuestFee = document.getElementById('summaryGuestFee');
  const summaryServicesList = document.getElementById('summaryServicesList');
  const summaryServicesTotal = document.getElementById('summaryServicesTotal');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');

  // 1. Set minimum date to tomorrow to prevent past date booking
  if (weddingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    weddingDateInput.setAttribute('min', minDateStr);
  }

  // 2. Read URL Parameters for pre-selection (e.g., booking.html?venue=royal-palace)
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedVenue = urlParams.get('venue');
  const preselectedService = urlParams.get('service');

  if (preselectedVenue && venueSelect) {
    venueSelect.value = preselectedVenue;
  }

  if (preselectedService) {
    const serviceBox = document.getElementById('srv-' + preselectedService);
    if (serviceBox) {
      serviceBox.checked = true;
      const parentCard = serviceBox.closest('.service-checkbox-card');
      if (parentCard) parentCard.classList.add('selected');
    }
  }

  // 3. Calculation Function
  function calculateTotal() {
    let venueCost = 0;
    let venueLabel = 'None selected';
    const selectedVenueKey = venueSelect.value;

    if (selectedVenueKey && venueData[selectedVenueKey]) {
      venueCost = venueData[selectedVenueKey].basePrice;
      venueLabel = venueData[selectedVenueKey].name;
    }

    // Guest Calculation: $15 per guest service & dining management fee
    const guests = parseInt(guestCountInput.value, 10) || 0;
    const guestFeePerPerson = 15;
    const totalGuestFee = guests * guestFeePerPerson;

    // Services Calculation
    let servicesTotal = 0;
    let selectedServicesArray = [];

    serviceCheckboxes.forEach(cb => {
      const parentCard = cb.closest('.service-checkbox-card');
      if (cb.checked) {
        const srvKey = cb.value;
        if (serviceData[srvKey]) {
          servicesTotal += serviceData[srvKey].price;
          selectedServicesArray.push(serviceData[srvKey]);
        }
        if (parentCard) parentCard.classList.add('selected');
      } else {
        if (parentCard) parentCard.classList.remove('selected');
      }
    });

    const grandTotal = venueCost + totalGuestFee + servicesTotal;

    // Update Live Summary Box
    if (summaryVenueName) summaryVenueName.textContent = venueLabel;
    if (summaryVenuePrice) summaryVenuePrice.textContent = venueCost > 0 ? `$${venueCost.toLocaleString()}` : '$0';
    if (summaryGuestCount) summaryGuestCount.textContent = `${guests} Guests ($${guestFeePerPerson}/ea)`;
    if (summaryGuestFee) summaryGuestFee.textContent = `$${totalGuestFee.toLocaleString()}`;

    if (summaryServicesList) {
      if (selectedServicesArray.length === 0) {
        summaryServicesList.innerHTML = '<span class="text-muted small fst-italic">No additional services selected</span>';
      } else {
        summaryServicesList.innerHTML = selectedServicesArray
          .map(srv => `<div class="d-flex justify-content-between small text-muted"><span>• ${srv.name}</span><span>$${srv.price.toLocaleString()}</span></div>`)
          .join('');
      }
    }

    if (summaryServicesTotal) summaryServicesTotal.textContent = `$${servicesTotal.toLocaleString()}`;
    if (summaryTotalPrice) summaryTotalPrice.textContent = `$${grandTotal.toLocaleString()}`;

    return {
      venueName: venueLabel,
      venueCost,
      guests,
      totalGuestFee,
      selectedServices: selectedServicesArray,
      servicesTotal,
      grandTotal
    };
  }

  // Event Listeners for Live Update
  if (venueSelect) venueSelect.addEventListener('change', calculateTotal);
  if (guestCountInput) guestCountInput.addEventListener('input', calculateTotal);
  serviceCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Run initial calculation on page load
  calculateTotal();

  // 4. Form Validation & Submission Handling
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const weddingDate = weddingDateInput.value;
    const venueValue = venueSelect.value;
    const guests = parseInt(guestCountInput.value, 10);
    const specialRequests = document.getElementById('specialRequests') ? document.getElementById('specialRequests').value.trim() : '';
    const agreeTerms = document.getElementById('agreeTerms');

    // Validation checks
    let isValid = true;
    let errorMessage = '';

    if (fullName.length < 3) {
      isValid = false;
      errorMessage = 'Please enter your full name (minimum 3 characters).';
    } else if (!validateEmail(email)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address (e.g. name@example.com).';
    } else if (!validatePhone(phone)) {
      isValid = false;
      errorMessage = 'Please enter a valid 10-digit mobile phone number.';
    } else if (!weddingDate) {
      isValid = false;
      errorMessage = 'Please pick a wedding date.';
    } else {
      const selectedDate = new Date(weddingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        isValid = false;
        errorMessage = 'Wedding date must be in the future. Past dates are not allowed.';
      }
    }

    if (isValid && !venueValue) {
      isValid = false;
      errorMessage = 'Please select your preferred wedding venue.';
    }

    if (isValid && (!guests || guests < 10)) {
      isValid = false;
      errorMessage = 'Please specify at least 10 wedding guests.';
    }

    if (isValid && agreeTerms && !agreeTerms.checked) {
      isValid = false;
      errorMessage = 'Please acknowledge and agree to the booking terms.';
    }

    if (!isValid) {
      showBookingAlert(errorMessage, 'danger');
      return;
    }

    // Calculation result for receipt
    const pricing = calculateTotal();
    const bookingRef = 'EK-' + Math.floor(100000 + Math.random() * 900000);

    // Populate Receipt Modal
    document.getElementById('receiptRefNumber').textContent = bookingRef;
    document.getElementById('receiptClientName').textContent = fullName;
    document.getElementById('receiptEmail').textContent = email;
    document.getElementById('receiptPhone').textContent = phone;
    document.getElementById('receiptDate').textContent = new Date(weddingDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.getElementById('receiptVenue').textContent = pricing.venueName;
    document.getElementById('receiptGuests').textContent = `${pricing.guests} Guests`;
    document.getElementById('receiptTotal').textContent = `$${pricing.grandTotal.toLocaleString()}`;

    const receiptServicesList = document.getElementById('receiptServicesList');
    if (receiptServicesList) {
      if (pricing.selectedServices.length > 0) {
        receiptServicesList.innerHTML = pricing.selectedServices
          .map(s => `<li class="d-flex justify-content-between"><span>✓ ${s.name}</span><strong>$${s.price.toLocaleString()}</strong></li>`)
          .join('');
      } else {
        receiptServicesList.innerHTML = '<li class="text-muted fst-italic">No custom services added</li>';
      }
    }

    const receiptNotes = document.getElementById('receiptNotes');
    if (receiptNotes) {
      receiptNotes.textContent = specialRequests ? `"${specialRequests}"` : 'None specified';
    }

    // Show Confirmation Modal using Bootstrap Modal
    const bookingModalEl = document.getElementById('bookingSuccessModal');
    if (bookingModalEl && window.bootstrap) {
      const modalInstance = new bootstrap.Modal(bookingModalEl);
      modalInstance.show();
    } else {
      alert(`Booking Successful!\nReference: ${bookingRef}\nEstimated Total: $${pricing.grandTotal.toLocaleString()}`);
    }

    // Reset Form fields smoothly
    bookingForm.reset();
    calculateTotal();
    hideBookingAlert();
  });
}

function showBookingAlert(msg, type) {
  const alertContainer = document.getElementById('bookingAlert');
  if (!alertContainer) return;
  alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
  alertContainer.innerHTML = `
    <i class="bi bi-exclamation-triangle-fill me-2"></i> ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertContainer.classList.remove('d-none');
  alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideBookingAlert() {
  const alertContainer = document.getElementById('bookingAlert');
  if (alertContainer) {
    alertContainer.classList.add('d-none');
  }
}

/* ==========================================================================
   4. Contact Page Form Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const subject = document.getElementById('contactSubject') ? document.getElementById('contactSubject').value.trim() : 'Wedding Inquiry';
    const message = document.getElementById('contactMessage').value.trim();

    let valid = true;
    let errorText = '';

    if (name.length < 2) {
      valid = false;
      errorText = 'Please provide your full name.';
    } else if (!validateEmail(email)) {
      valid = false;
      errorText = 'Please provide a valid email address.';
    } else if (!validatePhone(phone)) {
      valid = false;
      errorText = 'Please provide a valid 10-digit phone number.';
    } else if (message.length < 10) {
      valid = false;
      errorText = 'Please write a message with at least 10 characters.';
    }

    const alertBox = document.getElementById('contactAlert');
    if (!valid) {
      if (alertBox) {
        alertBox.className = 'alert alert-danger alert-dismissible fade show';
        alertBox.innerHTML = `
          <i class="bi bi-exclamation-circle-fill me-2"></i> ${errorText}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertBox.classList.remove('d-none');
      }
      return;
    }

    // Frontend success feedback demonstration
    if (alertBox) {
      alertBox.className = 'alert alert-success alert-dismissible fade show py-3';
      alertBox.innerHTML = `
        <h5 class="alert-heading mb-1"><i class="bi bi-check-circle-fill me-2 text-success"></i>Message Sent Successfully!</h5>
        <p class="mb-0">Thank you, <strong>${name}</strong>. Our senior wedding consultant will review your inquiry regarding "<em>${subject}</em>" and contact you at <strong>${email}</strong> or <strong>${phone}</strong> within 24 hours.</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertBox.classList.remove('d-none');
    }

    contactForm.reset();
  });
}

/* ==========================================================================
   5. Gallery Filtering & Image Lightbox Modal
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-col');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Lightbox Click Triggers
  const lightboxTriggers = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaptionText');

  if (lightboxTriggers.length > 0 && lightboxModal && lightboxImg) {
    lightboxTriggers.forEach(card => {
      card.addEventListener('click', () => {
        const fullImgSrc = card.getAttribute('data-full-img') || card.querySelector('img').src;
        const caption = card.getAttribute('data-caption') || card.querySelector('h5')?.innerText || 'Wedding Memory';

        lightboxImg.src = fullImgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;

        if (window.bootstrap) {
          const modalInstance = new bootstrap.Modal(lightboxModal);
          modalInstance.show();
        }
      });
    });
  }
}

/* ==========================================================================
   6. Venue Details Modal
   ========================================================================== */
function initVenueModals() {
  const venueDetailBtns = document.querySelectorAll('.btn-view-venue');
  const venueModal = document.getElementById('venueDetailModal');

  if (!venueModal || venueDetailBtns.length === 0) return;

  const venueModalTitle = document.getElementById('modalVenueTitle');
  const venueModalImg = document.getElementById('modalVenueImg');
  const venueModalLocation = document.getElementById('modalVenueLocation');
  const venueModalCapacity = document.getElementById('modalVenueCapacity');
  const venueModalPrice = document.getElementById('modalVenuePrice');
  const venueModalDesc = document.getElementById('modalVenueDesc');
  const venueModalBookBtn = document.getElementById('modalVenueBookBtn');

  venueDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const img = btn.getAttribute('data-img');
      const location = btn.getAttribute('data-location');
      const capacity = btn.getAttribute('data-capacity');
      const price = btn.getAttribute('data-price');
      const desc = btn.getAttribute('data-desc');
      const venueKey = btn.getAttribute('data-venue-key');

      if (venueModalTitle) venueModalTitle.textContent = title;
      if (venueModalImg) venueModalImg.src = img;
      if (venueModalLocation) venueModalLocation.textContent = location;
      if (venueModalCapacity) venueModalCapacity.textContent = capacity;
      if (venueModalPrice) venueModalPrice.textContent = price;
      if (venueModalDesc) venueModalDesc.textContent = desc;

      if (venueModalBookBtn) {
        venueModalBookBtn.href = `booking.html?venue=${venueKey}`;
      }

      if (window.bootstrap) {
        const modal = new bootstrap.Modal(venueModal);
        modal.show();
      }
    });
  });
}

/* ==========================================================================
   Helper Validation Functions
   ========================================================================== */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  // Allows digits, dashes, spaces, and optional + prefix, min 10 digits
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15 && /^\d+$/.test(cleanPhone);
}
