import { RANDOM_VIEW_PERCENTAGE } from '../constants/productsView';

export const getRandomViewType = () => {
  return Math.random() > RANDOM_VIEW_PERCENTAGE ? 'grid' : 'list';
};
