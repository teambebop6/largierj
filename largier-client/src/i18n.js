import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import moment from 'moment';
import en from './i18n_translation/en.json';
import de from './i18n_translation/de.json';

i18next
  .use(reactI18nextModule)
  .init(
    {
      interpolation: {
        formatSeparator: ',',
        format: (value, formatting) => {
          if (value instanceof Date) return moment(value).format(formatting);
          return value.toString();
        },
        // React already does escaping
        escapeValue: false,
      },
      lng: 'en',
      resources: {
        en: {
          translation: en,
        },
        de: {
          translation: de,
        },
      },
    },
    () => null,
  );

export default i18next;
