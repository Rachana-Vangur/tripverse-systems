
import { useSearch } from '@/hooks/useSearch';
import { SearchResults } from '@/components/ui/SearchResults';

export const SearchResultsSection = () => {
  const { results, isLoading } = useSearch();
  
  // Only show this section if there are search results
  if (!results || results.length === 0) {
    return null;
  }
  
  return (
    <section id="search-results" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SearchResults />
      </div>
    </section>
  );
};
