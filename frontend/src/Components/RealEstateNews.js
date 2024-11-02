// frontend/src/components/RealEstateNews.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Styles/RealEstateNews.module.css'

const RealEstateNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything?q=real%20estate&apiKey=032dcad8bd3d4d86b0cc39e52c4abef7');
                setNews(response.data.articles);
            } catch (err) {
                setError('Failed to fetch news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading news...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.realEstateNews}> {/* Apply the CSS module style */}
            {news.length === 0 ? (
                <p>No news articles found.</p>
            ) : (
                news.map((article, index) => (
                    <div key={index} className={styles.article}>
                        <h1>{article.title}</h1>
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))
            )}
        </div>
    );
};

export default RealEstateNews;
