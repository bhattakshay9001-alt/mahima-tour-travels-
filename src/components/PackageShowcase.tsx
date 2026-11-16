import React, { useState, useMemo } from 'react';
import { TourPackage } from '../types/yatra';
import { PackageCard } from './PackageCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface PackageShowcaseProps {
  packages: TourPackage[];
  onSelectPackage: (tour: TourPackage) => void;
  onViewItinerary: (tour: TourPackage) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  cityFilter: string;
  onResetFilters: () => void;
}

export const PackageShowcase: React.FC<PackageShowcaseProps> = ({
  packages,
  onSelectPackage,
  onViewItinerary,
  selectedCategory,
  onCategoryChange,
  cityFilter,
  onResetFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');

  const categories = [
    { id: 'All', label: 'All Pilgrimage Packages' },
    { id: 'Chardham Yatra', label: 'Chardham Yatra' },
    { id: '12 Jyotirlinga', label: '12 Jyotirlinga Specials' },
    { id: 'River Ghats & Shrines', label: 'Kashi, Ayodhya & Prayagraj' },
    { id: 'South India Circuit', label: 'South India Shrines' },
    { id: 'Customized Family', label: 'Customized Family Yatras' },
  ];

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesCategory =
        selectedCategory === 'All' || pkg.category === selectedCategory;

      const matchesCity =
        cityFilter === 'All' ||
        pkg.startingCities.some((c) =>
          c.toLowerCase().includes(cityFilter.toLowerCase())
        );

      const matchesSearch =
        searchQuery === '' ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.startingCities.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesCity && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
      if (sortBy === 'duration') return b.itinerary.length - a.itinerary.length;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [packages, selectedCategory, cityFilter, searchQuery, sortBy]);

  return (
    <section id="packages" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Curated Pilgrimage Circuits</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-spiritual font-bold text-slate-900 tracking-tight text-balance mb-4">
          Sacred Pilgrimage Packages for 2026
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Each yatra is planned with deep reverence. Enjoy verified accommodation, 100% Satvik dining, pre-reserved VIP temple passes, and comprehensive support for elderly pilgrims.
        </p>
      </div>

      {/* Interactive Category Filter Tabs (Section 1.A DO: interactive segmented buttons) */}
      <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-3 mb-8 gap-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 mb-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by shrine, city or dham..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Filters info & Sort */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredPackages.length}</span> pilgrimage tours
            {cityFilter !== 'All' && (
              <span className="ml-1 text-amber-700 font-medium">
                (Hub: {cityFilter})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((tour) => (
            <PackageCard
              key={tour.id}
              tour={tour}
              onSelectPackage={onSelectPackage}
              onViewItinerary={onViewItinerary}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            No pilgrimage packages found
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search criteria or resetting filters to see all available yatras.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onResetFilters();
            }}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
