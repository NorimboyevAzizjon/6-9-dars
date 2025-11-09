// Hozircha faqat JSON fayllarni import qilamiz
// react-i18next keyinroq qo'shiladi

import uzTranslation from './locales/uz/common.json';
import ruTranslation from './locales/ru/common.json';
import enTranslation from './locales/en/common.json';

// Oddiy til obyekti
export const translations = {
  uz: uzTranslation,
  ru: ruTranslation,
  en: enTranslation
};

// Oddiy tarjima funksiyasi
export const t = (key, language = 'uz') => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

// Hozirgi til
export let currentLanguage = 'uz';

// Tilni o'zgartirish funksiyasi
export const changeLanguage = (lng) => {
  currentLanguage = lng;
  localStorage.setItem('preferred-language', lng);
};

// Dastlabki sozlash
const savedLanguage = localStorage.getItem('preferred-language');
if (savedLanguage && translations[savedLanguage]) {
  currentLanguage = savedLanguage;
}

export default {
  t: (key) => t(key, currentLanguage),
  changeLanguage,
  currentLanguage
};