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
        <h1 id={styles.heading1}>Team 16: Tech Titans</h1>

        <h1 id={styles.heading1}>Our Goal</h1>

        <p className={styles.aboutUsDescription}>
          In this project, we embarked on developing a comprehensive ML-powered web application for house price
          prediction, meticulously designed to provide users with a streamlined and interactive experience tailored to
          their specific needs. The core of our solution lies in a sophisticated machine learning model that was
          meticulously trained on extensive real estate datasets. This model is capable of predicting home values based
          on various critical features, including location, property size, number of bedrooms and bathrooms, and
          additional relevant attributes. By harnessing the predictive capabilities of artificial intelligence, we aim
          to empower users with accurate, data-driven insights into property pricing.

          <br/><br/>
          To support our ML model, we implemented a robust backend using FastAPI, which is known for its high
          performance and ability to handle asynchronous requests efficiently. This choice allows for rapid, real-time
          processing of user inputs, ensuring that predictions are delivered almost instantaneously. Users can expect a
          smooth experience as they input their property details and receive immediate feedback on predicted values. The
          backend seamlessly integrates with the frontend, which is developed using React.js to create a highly
          engaging, dynamic user interface. The React framework is particularly well-suited for building interactive
          applications, enabling us to craft a responsive design that adjusts beautifully across various devices,
          including desktops, tablets, and smartphones.

          <br/><br/>
          A key feature of our application is the incorporation of three interactive data visualizations: a bar graph, a
          line graph, and a dynamic map. The bar graph provides a clear visual representation of price comparisons
          across different properties, allowing users to quickly gauge how specific features correlate with property
          values. The line graph offers insights into pricing trends over time, helping users to understand market
          fluctuations and make informed decisions about their real estate investments. However, perhaps the most
          engaging aspect of our visualization suite is the dynamic map. This feature allows users to visualize property
          prices in different geographic regions and see how these prices shift based on their selected criteria,
          specifically the number of bedrooms and bathrooms. By manipulating these inputs, users can observe real-time
          updates in price predictions on the map, providing an intuitive understanding of how specific housing features
          impact overall value in various locales.

          <br/><br/>
          Throughout the development process, we placed a strong emphasis on enhancing the user experience. We designed
          intuitive input forms that guide users effortlessly through the data entry process, ensuring that they can
          easily provide the necessary information without feeling overwhelmed. Real-time feedback mechanisms were
          implemented to inform users instantly about any errors or adjustments needed in their input, thereby reducing
          frustration and enhancing satisfaction. Smooth navigation throughout the application was prioritized, allowing
          users to move seamlessly between input forms, visualizations, and results. Furthermore, robust error handling
          was built into the system to manage any potential issues gracefully, ensuring that users can rely on the
          application for consistent performance.

          <br/><br/>
          This application serves not only as a tool for accurate price predictions but also as a comprehensive resource
          that empowers users to explore and understand real estate trends in a meaningful way. By combining the
          analytical power of ML with a user-friendly interface and engaging visual tools, we have created a platform
          that transforms the often complex and intimidating process of house buying into a more accessible and
          insightful journey. Ultimately, this project exemplifies the intersection of technology and user experience
          design, resulting in a powerful application that caters to the diverse needs of homebuyers and real estate
          professionals alike.

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
