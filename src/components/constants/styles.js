/**
 * Common CSS class combinations for consistent styling
 */

export const sectionStyles = {
  container: "container mx-auto px-4",
  section: "py-16 lg:py-24",
  header: "text-center mb-16",
  title: "text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4",
  subtitle: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
};

export const cardStyles = {
  base: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
  padding: "p-6",
  paddingLarge: "p-8 lg:p-12"
};

export const buttonStyles = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white",
  secondary: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300",
  outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20",
  ghost: "text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
};

export const textStyles = {
  heading: "text-gray-900 dark:text-white",
  body: "text-gray-600 dark:text-gray-300",
  muted: "text-gray-500 dark:text-gray-400",
  accent: "text-primary-600 dark:text-primary-400"
};

export const spacingStyles = {
  section: "space-y-8",
  card: "space-y-4",
  small: "space-y-2"
};

export const gridStyles = {
  responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  twoCol: "grid grid-cols-1 lg:grid-cols-2 gap-8",
  threeCol: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
};
