const API_URL = "https://api.americanroleplay.net/api/v1";
const TOKEN = "YOUR_API_KEY"; // Use CAD API key

// Fetch citizens
async function fetchCitizens() {
  const res = await fetch(`${API_URL}/citizen`, {
    headers: { "Authorization": `Bearer ${TOKEN}` }
  });
  return res.json();
}

// Render citizens
async function renderCitizens() {
  const citizens = await fetchCitizens();
  const container = document.getElementById("citizen-list");

  container.innerHTML = citizens.map(c => `
    <div class="p-5 bg-gray-800 rounded-lg border border-gray-700 shadow-lg flex flex-col justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.28 0 4.41.51 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-lg font-semibold text-white">${c.name}</p>
          <p class="text-sm text-gray-400">SSN: ${c.socialSecurityNumber || 'N/A'}</p>
        </div>
      </div>
      <button onclick="viewCitizen('${c.id}','${c.name}','${c.socialSecurityNumber}','${c.dateOfBirth}','${c.address || 'N/A'}')" 
        class="mt-4 w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white">View Details</button>
    </div>
  `).join("");
}

// Modal Logic
function viewCitizen(id, name, ssn, dob, address) {
  document.getElementById("citizenName").innerText = name;
  document.getElementById("citizenSSN").innerText = ssn;
  document.getElementById("citizenDOB").innerText = dob;
  document.getElementById("citizenAddress").innerText = address;
  document.getElementById("viewCitizenModal").classList.remove("hidden");
}

// Hide modal
document.querySelectorAll("[data-modal-hide]").forEach(btn => {
  btn.addEventListener("click", () => document.getElementById("viewCitizenModal").classList.add("hidden"));
});

// Initial load
renderCitizens();
