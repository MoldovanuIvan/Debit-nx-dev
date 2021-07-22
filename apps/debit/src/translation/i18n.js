import i18n from "i18next";
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'

const resources = {
  en: {
    translation: {
      "title": "Data",
      "description": {
        "part1": "Transaction",
        "part2": "Charts",
        "part3": "Debit per sender",
        "part4": "Credit per sender",
        "part5": "Data grid",
        "part6": "Language",
        "part7": "Transaction ID",
        "part8": "Date",
        "part9": "Debit, $",
        "part10": "Credit, $",
        "part11": "Sender, ID",
        "part12": "Receiver, ID",
        "part13": "Send",
        "part14": "Data Grid"
      }
    }
  },
  heb: {
    translation: {
      "title": "עִסקָה",
      "description": {
        "part1": "עִסקָה",
        "part2": "תרשימים",
        "part3": "חיוב לשולח",
        "part4": "זיכוי לשולח",
        "part5": "רשת נתונים",
        "part6": "שפה",
        "part7": "מזהה עסקה",
        "part8": "תַאֲרִיך",
        "part9": "חיוב, $",
        "part10": "אשראי, $",
        "part11": "מספר זהות השולח",
        "part12": "מקלט, תעודת זהות",
        "part13": "לִשְׁלוֹחַ",
        "part14": "רשת נתונים"
      }
    }
  }
}

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: true,
  detection: {
    order: ['querystring', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n
