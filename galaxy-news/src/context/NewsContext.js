import React, { createContext, useEffect, useRef, useState } from 'react';

import { APP_CONFIG } from '../config';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [filters, setFilters] = useState({
    source: '',
    asset: '',
    keyword: '',
    globalSearch: ''
  });

  const socketRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(APP_CONFIG.WS_HOST);
      ws.onopen = () => {
        ws.send(APP_CONFIG.WS_HANDSHAKE_MESSAGE);
        console.log('WebSocket sent handshake message.');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const item = {
            id: data.id,
            headline: data.headline,
            source: data.source,
            timestamp: data.timestamp || Date.now(),
            assets: data.assets || [],
            keywords: data.keywords || [],
            link: data.link,
            priority: data.priority || null,
            flash: true,
          };

          // TODO should do a binary search/insert
          setNewsItems(prev => {
            if (prev.some(existing => existing.id === item.id)) {
              return prev;
            }

            const index = prev.findIndex(existing => existing.timestamp < item.timestamp);
            const updated = index === -1
                ? [...prev, item]
                : [...prev.slice(0, index), item, ...prev.slice(index)];

            return updated.map(n => ({ ...n, flash: n.flash && n.id !== item.id ? false : n.flash }));
          });
        } catch (error) {
          console.log(event.data);
          console.error(error);
        }
      };

      ws.onerror = (err) => {
        console.error(err);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, APP_CONFIG.WS_RECONNECT_TIMEOUT_MS);
      };

      socketRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // Periodically remove old news (older than 2 hours)
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsItems(prev =>
        prev.filter(item => Date.now() - item.timestamp < APP_CONFIG.NEWS_MAX_AGE_MS)
      );
    }, APP_CONFIG.CLEANUP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const filteredNews = newsItems.filter(item => {
    const source = (filters.source + '').trim().toLowerCase();
    const asset = (filters.asset + '').trim().toLowerCase();
    const keyword = (filters.keyword + '').trim().toLowerCase();
    const matchSource = filters.source ? item.source.toLowerCase().includes(source) : true;
    const matchAsset = filters.asset ? item.assets.some(a => a.toLowerCase().includes(asset)) : true;
    const matchKeyword = filters.keyword ? item.keywords.some(k => k.toLowerCase().includes(keyword)) : true;

    const globalSearch = (filters.globalSearch + '').trim().toLowerCase();
    const matchGlobal = globalSearch
      ? (
          item.headline.toLowerCase().includes(globalSearch) ||
          item.source.toLowerCase().includes(globalSearch) ||
          item.assets.some(a => a.toLowerCase().includes(globalSearch)) ||
          item.keywords.some(k => k.toLowerCase().includes(globalSearch))
        )
      : true;

    return matchSource && matchAsset && matchKeyword && matchGlobal;
  });

  return (
    <NewsContext.Provider value={{
      isConnected,
      newsItems,
      filteredNews,
      filters,
      setFilters
    }}>
      {children}
    </NewsContext.Provider>
  );
};
