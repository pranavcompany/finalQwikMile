import { Navigation } from 'react-native-navigation';

import App  from '../../App';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './PushedScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.App', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
}