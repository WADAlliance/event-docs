import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import ContributorChart from '@/components/ContributorChart'; 
import StandardButton from '@/components/StandardButton';
import TeamCards from '@/components/TeamCards';
import CohortCards from '@/components/CohortCards';
import { EventCard } from '@/components/EventCard';

// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ContributorChart, 
    StandardButton,
    TeamCards,
    CohortCards,
    EventCard,
    ...components
  }
}
