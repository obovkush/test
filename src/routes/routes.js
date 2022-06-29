import MainPage from '../pages/MainPage/MainPage';
// import ContentPage from '../pages/ContentPage/ContentPage';

import { MAIN_ROUTE } from '../utils/consts';

export const authRoutes = [
  // {
  //   path: CONTENT_ROUTE,
  //   Component: ContentPage,
  // },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
];
