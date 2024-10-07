const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();

const today = new Date(); // Current date for comparison
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    // Add days to the calendar
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentDay = new Date(fullDate);
        
        dayDiv.innerText = day;

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
                    if (currentDay <= today) {
                        dayDiv.innerText += `\n${discount.description}`;
                        dayDiv.classList.add("activeDiscount");
                    } else {
                        dayDiv.classList.add("pastDiscount");
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

loadCalendar(currentDate);
