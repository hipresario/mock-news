export const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '1rem',
    fontFamily: 'system-ui, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  connected: {
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#e3f9e5',
    color: '#1b873f'
  },
  disconnected: {
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#ffebe6',
    color: '#d73a49',
  },
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '12px'
  },
  input: {
    flex: '1 1 250px',
    padding: '8px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minWidth: '120px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  row: {
    padding: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  headline: (isPriority) => ({
    fontSize: '1.05rem',
    fontWeight: 'bold',
    color: isPriority ? '#b10000' : '#222'
  }),
  badge: {
    backgroundColor: '#b10000',
    color: 'white',
    fontSize: '0.75rem',
    padding: '2px 6px',
    borderRadius: '4px',
    marginLeft: '10px'
  },
  details: {
    fontSize: '0.85rem',
    marginTop: '4px',
    lineHeight: 1.5,
    wordWrap: 'break-word',
    display: 'flex',
    justifyContent: 'space-between'
  },
  highlight: {
    backgroundColor: 'yellow'
  },
  button: {
    backgroundColor: '#1e88e5',
    color: 'white',
    border: 'none',
    padding: '3px',
    borderRadius: '1px',
    cursor: 'pointer'
  },
};