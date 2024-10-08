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
  const nameRef = ref(db, '1PGoE6EvIeB0KoXwQ4LJvVk0EKPaV_HcVnGaj95bkcQY/Internal Website Content/');

  const cardContainer = document.querySelector(".snapshots-collection");

  // Listen for changes in the database
  onValue(nameRef, (snapshot) => {
      // Clear the whole collection before populating again
      cardContainer.innerHTML = '';
      snapshot.forEach((childSnapshot) => {
        const toPublish = childSnapshot.val()["Publish to Web"];
        if (toPublish === true) {
          createSnapshotCard(childSnapshot);
        }
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
      achieve: '#FBC687',
      belong: '#B8E994',
      revitalize: '#FFED85',
      thrive: '#9FC2E5',
      "truth & reconciliation": '#D8B4E2'
    }
    // Default color 
    const backgroundColor = bgColors[priorityData.toLowerCase()] || 'rgb(246, 179, 79)';
    snapshotCardContainer.style.backgroundColor = backgroundColor;
  
  
    // Image section
    const snapshotCardImage = document.createElement('div');
    snapshotCardImage.classList.add('snapshot-card-image');
    const imgElement = document.createElement('img');
    imgElement.src = `/Portals/0/Users/141/05/62605/${priorityData}.png`; // Default image
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
        <div>${gradeData}</div>
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
  
    // Add the category attribute to the card
    cardContainer.setAttribute("category", `${priorityData}`);
    // Append the complete card to the document
    document.querySelector('.snapshots-collection').appendChild(cardContainer);
  
    // EVENT LISTENERS
    snapshotCardContainer.addEventListener('click', () => {
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
  const impactItem = createDetailsItem('impact', 'How has this practice positively impacted students?', impactData);
  detailsContainer.appendChild(impactItem);

  // WOW! item
  const wowItem = createDetailsItem('wow', 'What are your words of wisdom for adopting this practice?', wowData);
  detailsContainer.appendChild(wowItem);

  // Resources item
  const resourcesArray = resourceData.split(',');
  let links = ''; // Initialize an empty string to hold all <a> tags
  // Loop through the array to create each <a> tag
  if (resourcesArray.length > 0) {
    resourcesArray.forEach((resource, index) => {
      if (resource)
      {
        links += `<a href="${resource}" target="_blank" rel="noopener noreferrer">Click ${index + 1}</a> `; // Add <a> tag and separate with <br><br>
      }
    });

  }

  const resourcesItem = createDetailsItem('resources', 'Additional Resources:<br><br>Want to know more?<br>Contact:', links, `<a href="#">${contactData}</a>`);
  detailsContainer.appendChild(resourcesItem);

  return detailsContainer;
}


// Helper function to create individual detail items
function createDetailsItem(imgName, title, content, subcontent='') {
  const item = document.createElement('div');
  item.classList.add('snapshot-card-details-item');

  const iconDiv = document.createElement('div');
  const imgElement = document.createElement('img');
  imgElement.src = `/Portals/0/Users/141/05/62605/${imgName}.png`;
  iconDiv.classList.add('snapshot-card-details-icon');
  iconDiv.appendChild(imgElement);


  const titleDiv = document.createElement('div');
  titleDiv.classList.add('details-title');
  titleDiv.innerHTML = `${title}`;

  const contentDiv = document.createElement('div');
  if (subcontent) {
    contentDiv.innerHTML = content + "<br><br>" + subcontent;
  } else {
    contentDiv.innerHTML = content;
  }


  item.appendChild(iconDiv);
  item.appendChild(titleDiv);
  item.appendChild(contentDiv);

  return item;
}



