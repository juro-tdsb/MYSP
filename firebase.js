// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASES_U1YqqWu9z78yb2i4WwAmohFtkhr4",
  authDomain: "mysp-cb2d8.firebaseapp.com",
  databaseURL: "https://mysp-cb2d8-default-rtdb.firebaseio.com",
  projectId: "mysp-cb2d8",
  storageBucket: "mysp-cb2d8.appspot.com",
  messagingSenderId: "890265514245",
  appId: "1:890265514245:web:ac020c063d394e9f53476c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

window.onload = function() {
  loadSnapShotData();
};

function loadSnapShotData() {
  const nameRef = ref(db, '1CuDUHwinzc-Dvzs1mvylySEL1eW2mXU0_pTnFTSC7P8/Internal Website Content/');

  // Listen for changes in the database
  onValue(nameRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          createSnapshotCard(childSnapshot);
      });
  });
}


function createSnapshotCard(childSnapshot) {
  const bpNameData = childSnapshot.val()["BP Name"];
  const priorityData = childSnapshot.val()["MYSP Priority"];
  const schoolNameData = childSnapshot.val()["Schools Department Name"];
  const gradeData = childSnapshot.val()["Grade Levels "];
  const timeData = childSnapshot.val()["BP Implentation Timeframe"];
  const imageData = childSnapshot.val()["BP Image for Below Header"];
  const descriptionData = childSnapshot.val()["BP Description"];
  const impactData = childSnapshot.val()["IMPACT"];
  const wowData = childSnapshot.val()["WOW"];
  const resourceData = childSnapshot.val()["Additional Resources "];
  const contactData = childSnapshot.val()["Key Contact(s)"];


  // Card container
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('snapshot-single');

  // Snapshot card container (main part of the card)
  const snapshotCardContainer = document.createElement('div');
  snapshotCardContainer.classList.add('snapshot-card-container');
  // snapshotCardContainer.style.backgroundColor = 'rgb(246, 179, 79)';

  // Protity and Colors
  const bgColors = {
    achieve: '#f6b34f',
    belong: '#9fca71',
    revitalize: '#f1c40f',
    thrive: '#5dade2'
  }
  // Default color too
  const backgroundColor = bgColors[priorityData.toLowerCase()] || 'rgb(246, 179, 79)';
  snapshotCardContainer.style.backgroundColor = backgroundColor;


  // Image section
  const snapshotCardImage = document.createElement('div');
  snapshotCardImage.classList.add('snapshot-card-image');
  const imgElement = document.createElement('img');
  imgElement.src = `./assets/${priorityData}.png`; // Default image
  snapshotCardImage.appendChild(imgElement);

  // Text section (title and description)
  const snapshotCardText = document.createElement('div');
  snapshotCardText.classList.add('snapshot-card-text');

  const snapshotTitle = document.createElement('div');
  snapshotTitle.id = 'snapshot-title';
  snapshotTitle.textContent = bpNameData; // Set title here
  snapshotCardText.appendChild(snapshotTitle);

  const snapshotDescription = document.createElement('div');
  snapshotDescription.id = 'snapshot-description';
  snapshotDescription.innerHTML = `
      <div>${schoolNameData}</div>
      <div>Grade ${gradeData} Students</div>
      <div>${timeData}</div>
  `;
  snapshotCardText.appendChild(snapshotDescription);

  // Dropdown icon
  const snapshotCardExpandIcon = document.createElement('div');
  snapshotCardExpandIcon.classList.add('snapshot-card-expand-icon');
  const iconSpan = document.createElement('span');
  iconSpan.id = 'card-dropdown';
  iconSpan.classList.add('material-symbols-outlined');
  iconSpan.textContent = 'keyboard_arrow_down';
  snapshotCardExpandIcon.appendChild(iconSpan);

  // Append the main card sections to the card container
  snapshotCardContainer.appendChild(snapshotCardImage);
  snapshotCardContainer.appendChild(snapshotCardText);
  snapshotCardContainer.appendChild(snapshotCardExpandIcon);
  cardContainer.appendChild(snapshotCardContainer);

  // Create and append the detailed section (only appears when expanded)
  const cardDetailsContainer = createCardDetails(imageData, descriptionData, impactData, wowData, resourceData, contactData);
  cardContainer.appendChild(cardDetailsContainer);

  // Append the complete card to the document
  document.querySelector('.snapshots-collection').appendChild(cardContainer);

  // EVENT LISTENERS
  cardContainer.addEventListener('click', () => {
    const currentDisplay = window.getComputedStyle(cardDetailsContainer).display;
    cardDetailsContainer.style.display = currentDisplay === 'none' ? 'flex' : 'none';
  });
}


function createCardDetails(imageData, descriptionData, impactData, wowData, resourceData, contactData) {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('snapshot-card-details-container');

  // First details item (image and description)
  const firstItem = document.createElement('div');
  firstItem.classList.add('snapshot-card-details-item-first');

  const firstItemImage = document.createElement('div');
  firstItemImage.classList.add('snapshot-card-details-item-first-img');
  const imgElement = document.createElement('img');
  imgElement.src = imageData;
  firstItemImage.appendChild(imgElement);

  const firstItemText = document.createElement('div');
  firstItemText.classList.add('snapshot-card-details-item-first-text');
  firstItemText.innerHTML = `<div class="details-title">What?</div>${descriptionData}`;
  firstItem.appendChild(firstItemImage);
  firstItem.appendChild(firstItemText);
  detailsContainer.appendChild(firstItem);

  // Impact item
  const impactItem = createDetailsItem('kid_star', 'Impact', impactData, '#E4A11B');
  detailsContainer.appendChild(impactItem);

  // WOW! item
  const wowItem = createDetailsItem('sentiment_very_satisfied', 'WOW!', wowData, '#14A44D', 'What are your words of wisdom for adopting this practice?');
  detailsContainer.appendChild(wowItem);

  // Resources item
  const resourcesArray = resourceData.split(',');
  let links = ''; // Initialize an empty string to hold all <a> tags
  // Loop through the array to create each <a> tag
  resourcesArray.forEach((resource, index) => {
    links += `<a href="${resource}">Click ${index + 1}</a><br><br>`; // Add <a> tag and separate with <br><br>
  });
    const resourcesItem = createDetailsItem('auto_stories', 'Resources', links, '#3B71CA');
  detailsContainer.appendChild(resourcesItem);

  // Contact item
  const contactItem = createDetailsItem('question_mark', 'Want to know more?', `Contact: <a href="#">${contactData}</a>`, '#e93734');
  detailsContainer.appendChild(contactItem);

  return detailsContainer;
}


// Helper function to create individual detail items
function createDetailsItem(icon, title, content, color, subtitle = '') {
  const item = document.createElement('div');
  item.classList.add('snapshot-card-details-item');

  const iconDiv = document.createElement('div');
  iconDiv.style.fontVariationSettings = "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48";
  iconDiv.style.color = color;
  iconDiv.classList.add('details-icon');
  const iconSpan = document.createElement('span');
  iconSpan.classList.add('material-symbols-outlined');
  iconSpan.textContent = icon;
  iconDiv.appendChild(iconSpan);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('details-title');
  titleDiv.innerHTML = `${title}${subtitle ? `<div class="details-subtitle">${subtitle}</div>` : ''}`;

  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = content;

  item.appendChild(iconDiv);
  item.appendChild(titleDiv);
  item.appendChild(contentDiv);

  return item;
}



