import { combineReducers } from '@reduxjs/toolkit';
import slots from './Slots/Slots';
import user from './User/User';
import purchases from './Purchases/Purchases';
import notifications from './notifications/notifications';
import pubSubSocket from './PubSubSocket/PubSubSocket';
import aucSettings from './AucSettings/AucSettings';

const rootReducer = combineReducers({
  slots,
  user,
  purchases,
  notifications,
  pubSubSocket,
  aucSettings,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;