import React, { useContext, useState, useCallback, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { NewsContext } from '../context/NewsContext';
import debounce from 'lodash/debounce';
import { styles } from './styles';
import { APP_CONFIG } from '../config';

const NewsFeed = () => {
  const { filteredNews, filters, setFilters, isConnected } = useContext(NewsContext);
  const displayItems = filteredNews.slice(0, APP_CONFIG.MAX_VISIBLE_ITEMS);

  const [searchInput, setSearchInput] = useState(filters.globalSearch);

  const debouncedSetGlobalSearch = useCallback(
    debounce((value) => {
      setFilters(f => ({ ...f, globalSearch: value }));
    }, 300),
    [setFilters]
  );

  useEffect(() => {
    debouncedSetGlobalSearch(searchInput);
    return debouncedSetGlobalSearch.cancel;
  }, [searchInput, debouncedSetGlobalSearch]);

  const highlightMatch = (text, query) => {
    if (!query) {
      return text;
    }
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={styles.highlight}>{part}</mark>
        : part
    );
  };

  const handleClick = (e) => {
    const id = e.target.getAttribute('data-id');
    if (displayItems[id]) {
      console.log(displayItems[id]);
    }
  };

  const Row = ({ index, style }) => {
    const item = displayItems[index];
    const isHighPriority = item.priority === 'high';
    const query = filters.globalSearch.toLowerCase();

    return (
      <div className={ item.flash ? 'flash' : '' } style={{ ...style, ...styles.row, backgroundColor: isHighPriority ? '#fff6f6' : '#fff' }}>
        <div style={{ borderLeft: isHighPriority ? '6px solid red' : '4px solid transparent', paddingLeft: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
             <small>{highlightMatch(item.source, query)}</small>
            </div>
            <div>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={styles.headline(isHighPriority)}>
              {highlightMatch(item.headline, query)}
            </span>
            {isHighPriority && <span style={styles.badge}>ALERT</span>}
          </div>
          <div style={styles.details}>
            <div>
              {item.assets.map((a, i) => <span key={i}>{highlightMatch(a, query)}{i < item.assets.length - 1 ? ', ' : ''}</span>)}
            </div>
            <div>
              {item.keywords.map((k, i) => <span key={i}>{highlightMatch(k, query)}{i < item.keywords.length - 1 ? ', ' : ''}</span>)}
            </div>
            {!!item.link &&
              (<div>
                <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>)
            }
            <div>
              <button style={styles.button} data-id={index}>Log to Console</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Live News Feed</h2>
        <div style={ isConnected ? styles.connected : styles.disconnected }>
           {isConnected ? 'Connected' : 'Disconnected'}
         </div>
      </div>
      <div style={styles.filterGroup}>
        <input
          type="text"
          placeholder="Search all news..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          style={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Filter by source"
          value={filters.source}
          onChange={e => setFilters(f => ({ ...f, source: e.target.value }))}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Filter by assets"
          value={filters.asset}
          onChange={e => setFilters(f => ({ ...f, asset: e.target.value }))}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Filter by keywords"
          value={filters.keyword}
          onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
          style={styles.input}
        />
      </div>

      {displayItems.length === 0 ? (
        <p>No matching news.</p>
      ) : (
        <div onClick={handleClick}>
          <List
            height={540}
            itemCount={displayItems.length}
            itemSize={APP_CONFIG.NEWS_ITEM_HEIGHT}
            width="100%"
          >
            {Row}
          </List>

          <div className="footer">
            <span>Showing top 100 news from last two hours, total {filteredNews.length} news received.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
