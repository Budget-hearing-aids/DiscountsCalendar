const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();

const today = new Date(); // Current date for comparison
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Discount data for the calendar
const discountData = {
    October: [
        { start: "2024-10-08", end: "2024-10-09", description: "Ion series $150 off prime day" },
        { start: "2024-10-31", end: "2024-10-31", description: "Halloween sale (atom 2 series)" }
    ],
    November: [
        { start: "2024-11-15", end: "2024-11-20", description: "$50 off 2 series" },
        { start: "2024-11-15", end: "2024-11-20", description: "25% off ion series" },
        { start: "2024-11-21", end: "2024-11-24", description: "20% off all products" },
        { start: "2024-11-25", end: "2024-11-28", description: "$125 off ion Series" },
        { start: "2024-11-29", end: "2024-12-01", description: "BOGO Atom 2 Series" },
        { start: "2024-11-29", end: "2024-12-01", description: "$150 off ion series" }
    ],
    December: [
        { start: "2024-12-02", end: "2024-12-04", description: "Final Sale: 20% off all products" },
        { start: "2024-12-02", end: "2024-12-09", description: "QVC" },
        { start: "2024-12-14", end: "2024-12-19", description: "QVC" },
        { start: "2024-12-05", end: "2024-12-09", description: "$75 off atom 2 series" },
        { start: "2024-12-10", end: "2024-12-12", description: "30% off ion series" },
        { start: "2024-12-13", end: "2024-12-17", description: "BOGO ALL PRODUCTS" },
        { start: "2024-12-24", end: "2024-12-25", description: "$150 off ion series, $80 off atom 2 series" }
    ]
};

// Load the current month
function loadCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.innerText = `${months[month]} ${year}`;
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill empty days at the start of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarGrid.appendChild(emptyDiv);
    }

    // Get the current date in Pacific Time Zone (PT)
    const currentDateInPT = new Date(today.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

    // Add days to the calendar
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentDay = new Date(fullDate);
        
        dayDiv.innerText = day;

        // Dimming past days only (not active discount days)
        if (currentDay < currentDateInPT) {
            dayDiv.classList.add("pastDay");
        }

        // Check discount data for current month
        if (discountData[months[month]]) {
            discountData[months[month]].forEach(discount => {
                const discountStart = new Date(discount.start);
                const discountEnd = new Date(discount.end);
                
                // Calculate the day before the discount start date
                const revealDate = new Date(discountStart);
                revealDate.setDate(discountStart.getDate() - 1);

                if (currentDay >= discountStart && currentDay <= discountEnd) {
                    // Only show discount during its duration
                    if (currentDay <= currentDateInPT) {
                        dayDiv.innerText += `\n${discount.description}`;
                        dayDiv.classList.add("activeDiscount");
                    }
                } else if (currentDay < discountStart && currentDay.toDateString() === revealDate.toDateString()) {
                    // Show 'Upcoming Discount' one day before the discount starts
                    dayDiv.innerText += "\nUpcoming Discount";
                    dayDiv.classList.add("upcoming");
                }
            });
        }

        calendarGrid.appendChild(dayDiv);
    }
}

// Navigate months
document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
});

// Initial load of the calendar
loadCalendar(currentDate);
