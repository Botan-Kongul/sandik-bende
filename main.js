let candidateCounts = {
  kk_oy: 0,
  rte_oy: 0,
  invalid_vote: 0,
};

const kkOyElement = document.getElementById("kk_oy");
const rteOyElement = document.getElementById("rte_oy");
const totalOyElement = document.getElementById("toplam_oy");
const kkPlusButton = document.getElementById("kk_plus");
const kkMinusButton = document.getElementById("kk_minus");
const rtePlusButton = document.getElementById("rte_plus");
const rteMinusButton = document.getElementById("rte_minus");
const invalidVoteElement = document.getElementById("invalid_vote");
const invalidVoteButton = document.getElementById("invalid_vote_button");
const resetOyButton = document.getElementById("reset_oy");
const sonuclarDiv = document.getElementById("sonuclar");
const previousResultsTable = document.getElementById("previous_results");
const previousResultsTableBody =
  previousResultsTable.getElementsByTagName("tbody")[0];

if (localStorage.getItem("candidateCounts")) {
  candidateCounts = JSON.parse(localStorage.getItem("candidateCounts"));
  updateVotes();
}

kkPlusButton.addEventListener("click", () => {
  candidateCounts.kk_oy++;
  updateVotes();
});

kkMinusButton.addEventListener("click", () => {
  if (candidateCounts.kk_oy > 0) {
    candidateCounts.kk_oy--;
    updateVotes();
  }
});

rtePlusButton.addEventListener("click", () => {
  candidateCounts.rte_oy++;
  updateVotes();
});

rteMinusButton.addEventListener("click", () => {
  if (candidateCounts.rte_oy > 0) {
    candidateCounts.rte_oy--;
    updateVotes();
  }
});

invalidVoteButton.addEventListener("click", () => {
  candidateCounts.invalid_vote++;
  updateVotes();
});

resetOyButton.addEventListener("click", () => {
  const previousResultsRow = document.createElement("tr");
  previousResultsRow.innerHTML = `
    <td>${getFormattedDate()}</td>
    <td>${candidateCounts.kk_oy}</td>
    <td>${candidateCounts.rte_oy}</td>
    <td>${candidateCounts.invalid_vote}</td>
  `;
  previousResultsTableBody.appendChild(previousResultsRow);
  localStorage.removeItem("candidateCounts");

  candidateCounts.kk_oy = 0;
  candidateCounts.rte_oy = 0;
  candidateCounts.invalid_vote = 0;
  updateVotes();
});

function updateVotes() {
  kkOyElement.textContent = candidateCounts.kk_oy;
  rteOyElement.textContent = candidateCounts.rte_oy;
  invalidVoteElement.textContent = candidateCounts.invalid_vote;

  const totalOy =
    candidateCounts.kk_oy +
    candidateCounts.rte_oy +
    candidateCounts.invalid_vote;
  totalOyElement.textContent = totalOy.toString();

  // Sonuçları localStorage'a kaydet
  localStorage.setItem("candidateCounts", JSON.stringify(candidateCounts));
}

function getFormattedDate() {
  const now = new Date();
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return now.toLocaleDateString("tr-TR", options);
}
