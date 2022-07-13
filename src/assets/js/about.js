var teamBios = {
  "Remy" : "Nathaniel Remy is an experienced programmer with a BSc of Computer Science & Entrepreneurship from HSU in Barcelona, Spain. He has experience building many iOS apps for startups, constructing CRMs and is completing a masters in Artificial Intelligence and Machine Learning from MIT. He has since dedicated his high-level understanding of the digital world to the crypto and NFT space. Nathaniel - or Remy as his friends call him - is a highly intelligent and creative individual. He’s fluent in 3 languages, if anyone cares.",

  "Damon" : "Damon has received a bachelor’s degree in Finance and Accounting from McGill University in Montreal, Canada. Having already held analyst positions at several elite investment firms, he has developed a robust understanding of company structure, and the work ethic required for a start-up to reach the next level. Damon is effectively a ‘numbers guy’. His time spent analyzing companies at the forefront of innovation has allowed him to see the true potential of Web3, and as a result the potential of EraMeta.",

  "Jordan" : "Jordan is an audio engineer with experience in marketing and creative direction in the NFT and crypto spaces. Well-acquainted with the corporate world from his time in the music industry, Jordan now wants to use his keen eye for detail and unconventional creativity to help bridge the gap between the digital and physical realms. For Jordan, becoming part of EraMeta is an opportunity for him to put his diverse skill-set into action.",

  "Alizhan" : "Alizhan is a software developer who has released 4 mobile apps in 2 years time. Each of them has over 60K users around the world. He has gained a lot of experience in creating telegram bots, back end services and releasing production ready apps. As new blockchain technology is becoming more and more popular, Ali becomes more and more curious. Ali joined EraMeta' team to explore the world of crypto, NFTs and metaverse.",

  "Jonathan" : "Jonathan aka HomeRun worked with one of the biggest banks in Canada as a 5-star stockbroker. He went on to manage over $1.5 billion in trades on the stock market since the beginning of his career. He broke the firm’s record for the greatest amount of sales closed in a single quarter for a high-level stockbroker, closing $129M CAD in just 90 days. He has since taken his analytical prowess to the Web3 world, and now specifically to EraMeta."
};

var teamMemberBioContainer = document.createElement('div');
teamMemberBioContainer.id = "teamMemberBioContainer";
teamMemberBioContainer.style.textAlign = "center";
teamMemberBioContainer.style.alignItems = "center";
teamMemberBioContainer.style.marginLeft = "-1vw";
teamMemberBioContainer.style.position = "absolute";
teamMemberBioContainer.style.padding = "16px";
teamMemberBioContainer.style.backgroundColor = "rgba(26, 26, 26, 1)";
teamMemberBioContainer.style.top = "0";
teamMemberBioContainer.style.display = "none";

var teamMemberBio = document.createElement('p');
teamMemberBio.id = "teamMemberBio";
teamMemberBio.style.color = "white";
teamMemberBio.style.marginLeft = "2%";
teamMemberBio.style.marginRight = "2%";
teamMemberBio.style.textAlign = "center";
teamMemberBio.style.fontSize = "min(3vw, 16px)";
teamMemberBio.style.color = "rgba(255, 255, 255, 1)";

teamMemberBioContainer.appendChild(teamMemberBio);

var infoButtons = document.getElementsByClassName('infoButton');
// Add the teamMemberBio over the correct team member when selected.
for (var item = 0; item < infoButtons.length; item++) {

  const selectedItem = infoButtons[item];

  selectedItem.addEventListener('click', (e) => {
    // Use the ID of the button to figure out which bio to show
    const selectedTeamMember = document.querySelector("." + selectedItem.id + "Bio");

    //Calcuate current height of div
    const selectedDivHeight = selectedTeamMember.clientHeight;
    const selectedDivWidth = selectedTeamMember.clientWidth;

    teamMemberBio.innerText = teamBios[selectedItem.id];

    //Set the top of Bio at top of div
    teamMemberBioContainer.style.minHeight = "" + (selectedDivHeight) + "px";
    teamMemberBioContainer.style.maxWidth = "" + selectedDivWidth + "px";
    teamMemberBioContainer.style.minWidth = "" + selectedDivWidth + "px";

    selectedTeamMember.appendChild(teamMemberBioContainer);
    teamMemberBioContainer.classList.add('active');
    teamMemberBioContainer.style.display = "flex";
  });
}

//Remove the team member's bio
teamMemberBioContainer.addEventListener('click', (e) => {
  teamMemberBioContainer.classList.remove('active');
  teamMemberBioContainer.style.display = "none";
});
