
// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
    observer.unobserve(entry.target);
    }
});
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
observer.observe(el);
});

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================
const form = document.getElementById('contactForm');
if (form) {
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = {
    name: form.querySelector('input[aria-label="Your Name"]').value,
    restaurant: form.querySelector('input[aria-label="Restaurant Name"]').value,
    phone: form.querySelector('input[aria-label="Phone Number"]').value,
    email: form.querySelector('input[aria-label="Email"]').value || 'Not provided',
    message: form.querySelector('textarea').value
    };

    // Log form data (replace with actual API call)
    console.log('Form submitted:', data);
    
    // Show success message
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = '✓ Request Received!';
    button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
    
    setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    form.reset();
    form.classList.remove('was-validated');
    }, 3000);
});
}

// ==========================================
// SMOOTH SCROLL ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
    e.preventDefault();
    document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }
});
});

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
let statsAnimated = false;

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateStats();
        statsObserver.unobserve(entry.target);
    }
    });
}, { threshold: 0.5 });

statsObserver.observe(statsSection);
}

function animateStats() {
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    const target = stat.getAttribute('data-target');
    if (target) {
    let current = 0;
    const increment = target / 30;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
        stat.textContent = stat.textContent; // Keep original text
        clearInterval(counter);
        } else {
        const progress = Math.floor(current);
        if (progress > 0) {
            stat.textContent = stat.textContent.replace(/\d+/, progress);
        }
        }
    }, 30);
    }
});
}

// ==========================================
// PARALLAX EFFECT (HERO SECTION)
// ==========================================
const hero = document.querySelector('.hero');
if (hero) {
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
});
}

// ==========================================
// TOOLTIP INITIALIZATION (Bootstrap)
// ==========================================
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
new bootstrap.Tooltip(el);
});

// ==========================================
// ACCESSIBILITY: FOCUS MANAGEMENT
// ==========================================
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
    // Close any open modals or menus
    const offcanvas = document.querySelector('.offcanvas.show');
    if (offcanvas) {
    bootstrap.Offcanvas.getInstance(offcanvas).hide();
    }
}
});

// ==========================================
// MOBILE MENU CLOSE ON LINK CLICK
// ==========================================
const navLinks = document.querySelectorAll('.navbar-collapse a');
const navToggle = document.querySelector('.navbar-toggler');

navLinks.forEach(link => {
link.addEventListener('click', () => {
    if (navToggle.offsetParent !== null) { // Check if visible (mobile)
    navToggle.click();
    }
});
});

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener('load', () => {
document.body.style.opacity = '1';
initIndiaMap();
});

// ==========================================
// INDIA MAP INITIALIZATION
// ==========================================
function initIndiaMap() {
const mapContainer = document.getElementById('mapContainer');
if (!mapContainer) return;

const chart = echarts.init(mapContainer, null, { useDirtyRect: true });

const cities = [
    { name: 'Mumbai', coord: [72.8479, 19.0760], value: 10 },
    { name: 'Delhi', coord: [77.2090, 28.6139], value: 9 },
    { name: 'Bangalore', coord: [77.5946, 12.9716], value: 8 },
    { name: 'Hyderabad', coord: [78.4711, 17.3850], value: 7 },
    { name: 'Pune', coord: [73.8567, 18.5204], value: 6 },
    { name: 'Chennai', coord: [80.2707, 13.0827], value: 5 }
];

const option = {
    backgroundColor: 'transparent',
    title: {
    show: false
    },
    tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(17, 18, 20, 0.9)',
    borderColor: '#D4AF37',
    borderWidth: 1,
    textStyle: {
        color: '#fff',
        fontSize: 12
    },
    formatter: function(params) {
        if (params.componentSubType === 'scatter') {
        return `<strong>${params.name}</strong>`;
        }
        return '';
    }
    },
    geo: {
    map: 'india',
    roam: true,
    label: {
        emphasis: {
        show: false
        }
    },
    itemStyle: {
        normal: {
        areaColor: '#2a2a2d',
        borderColor: '#3a3a3d'
        },
        emphasis: {
        areaColor: '#3a3a3d'
        }
    }
    },
    series: [
    {
        name: 'Headquarters',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: cities.sort(function(a, b) {
        return b.value - a.value;
        }),
        symbolSize: function(val) {
        return val / 2;
        },
        showEffectOn: 'render',
        rippleEffect: {
        brushType: 'stroke',
        scale: 3,
        period: 4
        },
        hoverAnimation: true,
        label: {
        formatter: '{b}',
        position: 'bottom',
        show: true,
        color: '#D4AF37',
        fontSize: 11,
        fontWeight: 'bold',
        distance: 8
        },
        itemStyle: {
        color: '#D4AF37',
        shadowBlur: 10,
        shadowColor: '#D4AF37'
        },
        zlevel: 1
    }
    ]
};

// Load India map data
fetch('https://echarts.apache.org/dist/echarts-gl/data/simplifed-india.json')
    .then(response => response.json())
    .then(data => {
    echarts.registerMap('india', data);
    chart.setOption(option);
    })
    .catch(() => {
    // Fallback if map data fails to load - still show the chart without geo map
    const fallbackOption = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        series: [
        {
            name: 'Our Locations',
            type: 'scatter',
            symbolSize: 20,
            data: cities.map(c => [c.coord[0], c.coord[1], c.value]),
            itemStyle: {
            color: '#D4AF37',
            shadowBlur: 10,
            shadowColor: '#D4AF37'
            },
            label: {
            formatter: '{b}',
            show: true,
            color: '#fff'
            }
        }
        ]
    };
    chart.setOption(fallbackOption);
    });

// Handle responsive resize
window.addEventListener('resize', () => {
    chart.resize();
});

// Store chart instance for later use
window.mapChart = chart;
}

console.log('%c KREAD.in v3.0 - Production Ready | Premium Loaded', 'color: #D4AF37; font-size: 14px; font-weight: bold;');
