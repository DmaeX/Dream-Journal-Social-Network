
const form = document.getElementById("dreamForm");
const dreamList = document.getElementById("dreamList");
const today = new Date();
const newDate = today.toDateString();
const outputDate = newDate.split('T')[0];


// Load dreams from localStorage on page load
window.onload = function () {
    showDreams();
};

// Save dream on form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dream = {
        title: document.getElementById("title").value,
        date: outputDate,
        content: document.getElementById("content").value,
        mood: document.getElementById("mood").value
    };

    // Get old dreams, add new one
    let dreams = JSON.parse(localStorage.getItem("dreams")) || [];
    dreams.push(dream);
    localStorage.setItem("dreams", JSON.stringify(dreams));

    // Clear form and refresh dream list
    form.reset();
    showDreams();
});

// Function to display dreams
function showDreams() {
    dreamList.innerHTML = "";
    let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

    if (dreams.length === 0) {
        dreamList.innerHTML = "<p>No dreams logged yet 💤</p>";
        return;
    }

    dreams.forEach((d, index) => {
        const dreamCard = document.createElement("div");
        dreamCard.classList.add("dream");
        dreamCard.innerHTML = `
          <h3>${d.title}</h3>
          <p class="dream-date">${d.date} | Mood: ${d.mood}</p>
          <p>${d.content}</p>
          <button onclick="deleteDream(${index})" style="background:#ff6b6b; color:white; border:none; border-radius:6px; padding:5px 10px; cursor:pointer;">Delete</button>
        `;
        dreamList.prepend(dreamCard); // newest first
      });
    }

    // Delete a dream
    function deleteDream(index) {
      let dreams = JSON.parse(localStorage.getItem("dreams")) || [];
      dreams.splice(index, 1);
      localStorage.setItem("dreams", JSON.stringify(dreams));
      showDreams();
    }
