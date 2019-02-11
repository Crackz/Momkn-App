import I18n from 'i18n-js';

import en from './translations/en.json';
import ar from './translations/ar.json';

I18n.translations = { ar, en };
I18n.defaultLocale = "ar";

export default I18n;
