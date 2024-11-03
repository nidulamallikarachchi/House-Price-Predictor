import React from 'react';
import Visualization1 from "./Visualizations/Visualization1";
import Visualization2 from "./Visualizations/Visualization2";
import Visualization4 from "./Visualizations/Visualization4";
import CrimeChoroplethMap from "./Visualizations/CrimeChoroplethMap";
import styles from './Styles/OurData.module.css'

const OurData = () => {
    return(
        <div className={styles.ourDataContainer}>
            <center><h1 className={styles.dataHeading}>Data We Used for Our Model</h1></center>
            <p>In our effort to enhance the house market prediction model, we utilized two critical datasets: house prices and crime rates. Understanding the interplay between these factors is essential for predicting housing trends and making informed decisions for potential buyers and investors.

The house prices dataset provides a comprehensive overview of property values across various neighborhoods, reflecting market dynamics influenced by location, size, and other attributes. In contrast, the crime rate dataset offers insights into the safety and security of these neighborhoods, which can significantly impact buyer sentiment and property values.

In this section, we present visualizations that illustrate key trends and correlations between house prices and crime rates. These graphs will help users identify patterns, assess risks, and gain a clearer understanding of how neighborhood safety can affect property values. By integrating these datasets, we aim to provide a more holistic view of the housing market, empowering users with the data needed for sound investment decisions. </p>

            <h2>Average Property Price By State</h2>
            <div className={styles.visualizationN}>
                <div className={styles.graph}><Visualization2/></div>
                <div className={styles.description}>The bar chart shows substantial variation in property prices across states. States like California, Washington, and New York have the highest average property prices, while states in the Midwest and South generally have lower property prices.
                    High property prices in states like California and New York make homeownership challenging for average-income residents. This often leads to a higher demand for rental properties, driving up rental costs and decreasing overall housing affordability.
                    In states with both high-priced and more affordable housing, such as Texas, there is a notable divide between areas where residents can afford homes and areas where they struggle with housing costs. This polarization can lead to disparities in the neighborhood quality and economic opportunity.
                    States with lower average property prices, such as Kentucky and Tennessee, might attract people seeking affordable housing options, particularly as prices rise in states like California and Washington. This migration can drive up demand and prices in historically affordable states, creating housing challenges for long-term residents.
                </div>
            </div>

            <h2>Property Distribution by Price</h2>
            <div className={styles.visualizationN}>
                <div className={styles.description}>
                    The distribution of properties by price indicates that most properties are clustered within a specific price range, with a sharp decline as prices increase. This suggests a limited availability of high-end properties, with most properties being within lower to mid-range prices.
                    The concentration of properties in lower price ranges could indicate strong demand for affordable housing, which may be beneficial for first-time buyers but also signal a need for more high-end housing to balance the market.
                    The limited supply of high-priced homes could push up the prices of luxury properties, further increasing inequality in housing access.
                    For policymakers, this data may point to a need for policies that encourage the development of both affordable and luxury housing to create a balanced market.
                    The concentration of properties in certain price ranges points to potential gaps in the market. For a balanced market, more affordable and mid-range housing might need to be developed in high-demand areas, while high-end housing may need to be expanded in luxury markets.

                </div>
                <div className={styles.graph}><Visualization4/></div>
            </div>

            <h2>Crime Rates per 100,000 Population</h2>
            <div className={styles.visualizationN}>
                <div className={styles.graph}><CrimeChoroplethMap/></div>
                <div className={styles.description}>
                    This map shows the distribution of violent crime rates across states, with darker colors representing higher crime rates. States like New Mexico and Alaska are notably darker, suggesting higher crime rates per 100,000 residents, while states in the Northeast and some Midwestern states show lighter shades, indicating lower crime rates.
                    Areas with higher crime rates may experience lower demand for housing, as safety is a major factor for most homebuyers. Lower demand can lead to lower property values and rents in high-crime areas.
                    High crime rates can drive residents to relocate to safer areas, which may cause population declines in high-crime regions. Conversely, low-crime areas may attract more people, potentially driving up housing prices due to increased demand.
                    Investors are often hesitant to purchase properties in high-crime areas, which can limit economic development and lead to slower growth in the housing market.

                </div>
            </div>

            <h2>Affordability of Properties by State </h2>
            <div className={styles.visualizationN}>
                <div className={styles.description}> The bar chart shows substantial variation in property prices across states. States like California, Washington, and New York have the highest average property prices, while states in the Midwest and South generally have lower property prices.
                    High property prices in states like California and New York make homeownership challenging for average-income residents. This often leads to a higher demand for rental properties, driving up rental costs and decreasing overall housing affordability.
                    In states with both high-priced and more affordable housing, such as Texas, there is a notable divide between areas where residents can afford homes and areas where they struggle with housing costs. This polarization can lead to disparities in the neighborhood quality and economic opportunity.
                    States with lower average property prices, such as Kentucky and Tennessee, might attract people seeking affordable housing options, particularly as prices rise in states like California and Washington. This migration can drive up demand and prices in historically affordable states, creating housing challenges for long-term residents.
                </div>
                <div className={styles.graph}><Visualization1/></div>
            </div>

        </div>

    );
};

export default OurData;
