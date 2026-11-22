import { UserSettingsModel } from 'src/users/graphql/models/UserSettings.model';

export const UsersSettingsMocks: UserSettingsModel[] = [
  {
    userId: 1,
    receiveEmails: false,
    receiveNotifications: false,
  },
  {
    userId: 3,
    receiveEmails: false,
    receiveNotifications: true,
  },
];
