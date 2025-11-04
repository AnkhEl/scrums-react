import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { Asset, AssetStatus, mockFetchAssets } from './utils';

export const AssetList: FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssetStatus | 'ALL'>('ALL');

  const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await mockFetchAssets();
        setAssets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };
    
  useEffect(() => {
    fetchAssets();
  }, []);

  // Memoized filtering function
  const filterAssets = useCallback((items: Asset[]) => {
    return items.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Memoized filtered assets
  const filteredAssets = useMemo(() => filterAssets(assets), [assets, filterAssets]);

  if (loading) return <div className="loading">Loading assets...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="asset-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AssetStatus | 'ALL')}
          className="status-filter"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="LIQUIDATED">Liquidated</option>
        </select>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="no-results">No assets found</div>
      ) : (
        <div className="asset-grid">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="asset-card">
              <h3>{asset.name}</h3>
              <div>Type: {asset.type}</div>
              <div>Value: ${asset.value.toLocaleString()}</div>
              <div className={`status status-${asset.status.toLowerCase()}`}>
                {asset.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
