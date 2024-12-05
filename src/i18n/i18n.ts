import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import home_en from '@/locales/en/home.json';
import product_en from '@/locales/en/product.json';
import home_vi from '@/locales/vi/home.json';
import product_vi from '@/locales/vi/product.json';
import navbar_en from '@/locales/en/navbar.json';
import navbar_vi from '@/locales/vi/navbar.json';
import footer_en from '@/locales/en/footer.json';
import footer_vi from '@/locales/vi/footer.json';




export const locales ={
    en:'English',
    vi:'Tiếng Việt'
}

const resources = {
    en: {
        home: home_en,
        product: product_en,
        navbar: navbar_en,
        footer:footer_en
    },
    vi: {
        home: home_vi,
        product: product_vi,
        navbar: navbar_vi,
        footer:footer_vi


    }
  };
const defaultNS = 'home'
  i18n.use(initReactI18next).init({
    resources,
    lng: "en", 
    fallbackLng:"vi",
    ns:['home','product','navbar','footer'],
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;