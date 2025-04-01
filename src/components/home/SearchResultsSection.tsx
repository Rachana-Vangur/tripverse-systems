
import { useSearch } from '@/hooks/useSearch';
import { SearchResults } from '@/components/ui/SearchResults';

export const SearchResultsSection = () => {
  const { results } = useSearch();
  
  // Only show this section if there are search results
  if (!results || results.length === 0) {
    return null;
  }
  
  return <SearchResults />;
};
