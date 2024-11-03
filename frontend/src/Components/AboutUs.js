// src/pages/AboutUs.js
import React from "react";
import styles from './Styles/AboutUs.module.css';

// Import images
import member1Image from "./Data/logo192.png";
import member2Image from "./Data/logo192.png";
import member3Image from "./Data/logo192.png";

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Movindu Wijenayake",
      role: "Project Manager",
      description: "Having had a understanding of project management from the start I was selected to oversee all the tasks undertaken for this project regarding predictions of the US housing market. My role involved coordinating project tasks, setting project timelines, and ensuring clear communication between Team members.",
      contributions: [
        "Project Coordination",
        "Documentation"
      ],
      image: member2Image,
    },
    {
      name: "Nidula Mallikarachchi",
      role: "Tech Lead",
      description: "As the Lead Engineer on this project, I took charge of designing and implementing a comprehensive solution to analyze the U.S. housing market. I developed a machine learning model to predict house prices by state, built a responsive frontend with React.js, and managed data handling with a FastAPI backend.",
      contributions: [
          "Machine Learning Model Building",
        "Frontend Development",
        "Backend Development",
          "Documentation",
      ],
      image: member1Image,
    },
    {
      name: "Nisura Weerakkody",
      role: "UI/UX Designer",
      description: "My role as a UX / UI designer meant that I focused on making sure our design choices were based in user centered design principles, through the use of personas and user journey maps we had a clear idea of what our final product should be and we were able to continuinely iterate upon it until our final predictive tool is intuitive to the user.",
      contributions: [
        "UI/UX Design"
      ],
      image: member3Image,
    },
  ];

  return (
      <div className={styles.aboutUs}>
        <h1 id={styles.heading1}>Our Goal</h1>

        <p>The Housing Market in the USA is vast and complex, with numerous factors influencing housing prices. These
          factors include location, property size, number of bedrooms and bathrooms, year built and many more.
          Predicting housing prices accurately is vital for future investors, home buyers, home sellers, real estate
          agents
          and financial institutions, especially banks. With the power of computing and new concepts like machine
          learning, we can analyze and predict housing prices for the future accurately. Although we cannot be certain,
          the results that are generated using machine learning results will mostly be accurate due to the large dataset
          in
          its backend that shows how the prices increased or decreased over time. The predictions that are generated
          by these models can then be used by stakeholders in making informed decisions.
          Our aim is to develop a full-stack web application that hosts a machine learning model to predict housing
          prices. As of now we have found a dataset that fits these criteria, that contains over 1 million lines of
          data. This
          dataset will help us accurately predict data needed for our project. But due to its massive size we might
          decide
          on choosing a certain state, or a couple of states to implement in the learning model. The other states’ data
          will
          be used as testing data to make sure that the model works well.
        </p>

        <h1 id={styles.heading1}>Meet the Team</h1>

        <div className={styles.teamContainer}>
          {teamMembers.map((member, index) => (
              <div className={styles.teamMember} key={index}>
                <img src={member.image} alt={`${member.name}`} className={styles.teamImage}/>
                <h1 id={styles.memberRole}>{member.role}</h1>
                <h1 id={styles.memberName}>{member.name}</h1>
                <p>{member.description}</p>
                <h4 className={styles.contributionsHeading}>Contributions:</h4>
                <ul className={styles.contributionsList}>
                  {member.contributions.map((contribution, i) => (
                      <li key={i} className={styles.contributionItem}>{contribution}</li>
                  ))}
                </ul>
              </div>
          ))}
        </div>


      </div>
  );
};

export default AboutUs;
