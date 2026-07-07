// Guard: Script ini juga menginisialisasi Leaflet map.
// Kalau Chart.js belum termuat (mis. halaman tertentu), jangan sampai throw error
// yang menghentikan eksekusi JS dan membuat map tidak terinisialisasi.
if (typeof Chart !== "undefined") {
    Chart.defaults.font.family = "Poppins";
    Chart.defaults.color = "#475569";
    Chart.defaults.borderColor = "#E5E7EB";
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
}
function createBarChart(id, labels, data, colors) {

    const canvas = document.getElementById(id);

    if (!canvas) return;

    return new Chart(canvas, {

        type: "bar",

        data: {

            labels,

            datasets: [{

                data,

                backgroundColor: colors,

                borderRadius: 12,

                borderSkipped: false,

                barThickness: 48

            }]

        },

        options: {

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    grid: {

                        color: "#ECECEC"

                    },

                    ticks: {

                        stepSize: 200

                    }

                },

                x: {

                    grid: {

                        display: false

                    }

                }

            },

            animation: {

                duration: 1200,

                easing: "easeOutQuart"

            }

        }

    });

}
createBarChart(

    "pendidikanChart",

    ["SD", "SMP", "SMA", "D3/S1"],

    [950, 700, 1200, 390],

    [

        "#4E7A52",

        "#7A9E7E",

        "#C3B091",

        "#8C6A43"

    ]

);
createBarChart(

    "pekerjaanChart",

    [

        "Petani",

        "Nelayan",

        "UMKM",

        "PNS",

        "Pelajar"

    ],

    [

        900,

        350,

        280,

        110,

        600

    ],

    [

        "#4E7A52",

        "#A7C4A0",

        "#D8C3A5",

        "#B08968",

        "#7A9E7E"

    ]

);
createBarChart(

    "umurChart",

    [

        "0-14",

        "15-24",

        "25-44",

        "45-59",

        "60+"

    ],

    [

        420,

        580,

        1030,

        720,

        490

    ],

    [

        "#BFD8B8",

        "#91B493",

        "#6C8E6B",

        "#D6B98C",

        "#A47149"

    ]

);
const genderCanvas = document.getElementById("genderChart");

if (genderCanvas) {

    new Chart(genderCanvas, {

        type: "doughnut",

        data: {

            labels: [

                "Laki-laki",

                "Perempuan"

            ],

            datasets: [{

                data: [

                    1635,

                    1605

                ],

                backgroundColor: [

                    "#4E7A52",

                    "#D6B98C"

                ],

                borderWidth: 0,

                hoverOffset: 12

            }]

        },

        options: {

            cutout: "72%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        padding: 20,

                        usePointStyle: true

                    }

                }

            },

            animation: {

                duration: 1200

            }

        }

    });

}
document.querySelectorAll(".counter").forEach(counter => {

    const target = Number(counter.dataset.target);

    let value = 0;

    const update = () => {

        value += target / 60;

        if (value < target) {

            counter.textContent = Math.ceil(value).toLocaleString();

            requestAnimationFrame(update);

        }

        else {

            counter.textContent = target.toLocaleString();

        }

    }

    update();

});
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    navbar?.classList.toggle("scrolled", window.scrollY > 60);

});
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.onclick = e => {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        const offset = 90;

        window.scrollTo({

            top: target.offsetTop - offset,

            behavior: "smooth"

        });

    };

});
const mapElement = document.getElementById("map");
if (mapElement) {
    // Pastikan Leaflet init sekali saja.
    // Masalah umum: Leaflet diinisialisasi sebelum tinggi container terhitung
    // atau terjadi init ganda (map variabel tidak ada / tile layer ditambah ke map yang belum dibuat).
    const coords = [-8.235525127926323, 111.34915231024438];

    const initMap = () => {
        // Hindari init ganda
        if (mapElement._leaflet_id) return;

        const map = L.map("map", { zoomControl: true }).setView(coords, 13);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "© OpenStreetMap" }
        ).addTo(map);

        L.marker(coords)
            .addTo(map)
            .bindPopup("<b>Kantor Desa Pagerkidul</b>");

        // Refresh ukuran setelah render DOM selesai
        setTimeout(() => map.invalidateSize(), 200);
        setTimeout(() => map.invalidateSize(), 600);
        console.log('initMap');
    };

    // jalankan setelah load + beberapa frame supaya layout (Bootstrap/AOS) sudah stabil
    requestAnimationFrame(() => requestAnimationFrame(initMap));
    window.addEventListener("load", initMap, { once: true });
}

const lightbox = GLightbox({
    selector: '.gallery-item'
});