import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyOptions] = useState([
    { flag: "🇦🇪", code: "AED", name: "UAE Dirham" },
    { flag: "🇺🇸", code: "USD", name: "US Dollar" },
    { flag: "🇮🇳", code: "INR", name: "Indian Rupee" },
    { flag: "🇪🇺", code: "EUR", name: "Euro" },
    { flag: "🇬🇧", code: "GBP", name: "British Pound" },
    { flag: "🇯🇵", code: "JPY", name: "Japanese Yen" },
    { flag: "🇨🇦", code: "CAD", name: "Canadian Dollar" },
    { flag: "🇦🇺", code: "AUD", name: "Australian Dollar" },
    { flag: "🇨🇭", code: "CHF", name: "Swiss Franc" },
    { flag: "🇸🇬", code: "SGD", name: "Singapore Dollar" },
    { flag: "🇳🇿", code: "NZD", name: "New Zealand Dollar" },
    { flag: "🇸🇦", code: "SAR", name: "Saudi Riyal" },
    { flag: "🇨🇳", code: "CNY", name: "Chinese Yuan" },
    { flag: "🇧🇷", code: "BRL", name: "Brazilian Real" },
    { flag: "🇿🇦", code: "ZAR", name: "South African Rand" },
    { flag: "🇲🇽", code: "MXN", name: "Mexican Peso" },
    { flag: "🇹🇷", code: "TRY", name: "Turkish Lira" },
    { flag: "🇷🇺", code: "RUB", name: "Russian Ruble" },
    { flag: "🇰🇷", code: "KRW", name: "South Korean Won" },
    { flag: "🇮🇩", code: "IDR", name: "Indonesian Rupiah" },
    { flag: "🇲🇾", code: "MYR", name: "Malaysian Ringgit" },
    { flag: "🇵🇭", code: "PHP", name: "Philippine Peso" },
    { flag: "🇹🇭", code: "THB", name: "Thai Baht" },
    { flag: "🇻🇳", code: "VND", name: "Vietnamese Dong" },
    { flag: "🇵🇰", code: "PKR", name: "Pakistani Rupee" },
    { flag: "🇧🇩", code: "BDT", name: "Bangladeshi Taka" },
    { flag: "🇳🇬", code: "NGN", name: "Nigerian Naira" },
    { flag: "🇰🇪", code: "KES", name: "Kenyan Shilling" },
    { flag: "🇹🇿", code: "TZS", name: "Tanzanian Shilling" },
    { flag: "🇪🇬", code: "EGP", name: "Egyptian Pound" },
    { flag: "🇮🇱", code: "ILS", name: "Israeli New Shekel" },
    { flag: "🇦🇷", code: "ARS", name: "Argentine Peso" },
    { flag: "🇨🇱", code: "CLP", name: "Chilean Peso" },
    { flag: "🇵🇪", code: "PEN", name: "Peruvian Sol" },
    { flag: "🇺🇾", code: "UYU", name: "Uruguayan Peso" },
    { flag: "🇺🇦", code: "UAH", name: "Ukrainian Hryvnia" },
    { flag: "🇵🇱", code: "PLN", name: "Polish Zloty" },
    { flag: "🇸🇪", code: "SEK", name: "Swedish Krona" },
    { flag: "🇳🇴", code: "NOK", name: "Norwegian Krone" },
    { flag: "🇩🇰", code: "DKK", name: "Danish Krone" },
    { flag: "🇭🇰", code: "HKD", name: "Hong Kong Dollar" },
    { flag: "🇨🇿", code: "CZK", name: "Czech Koruna" },
    { flag: "🇭🇺", code: "HUF", name: "Hungarian Forint" },
    { flag: "🇷🇴", code: "RON", name: "Romanian Leu" },
    { flag: "🇧🇬", code: "BGN", name: "Bulgarian Lev" },
    { flag: "🇬🇭", code: "GHS", name: "Ghanaian Cedi" },
  ]);

  const [toCurrency, setToCurrency] = useState("AED");
  const [exchangeRates, setExchangeRates] = useState({});

  // http://v6.exchangerate-api.com/v6/98b38dacb2a0f0f2eb22818d/latest/AED    old
  // `https://v6.exchangerate-api.com/v6/91237a451caab0801528ef10/latest/AED`
  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/4654fd89b40f68ba8572d422/latest/AED`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          console.log("✅ Exchange rates fetched:", data.conversion_rates); // ✅ LOG
          setExchangeRates(data.conversion_rates);
        } else {
          console.error("❌ Failed to fetch exchange rates:", data);
        }
      })
      .catch((err) => console.error("❌ Error fetching exchange rates:", err));
  }, []);

  const convertFromAED = (amountInAED) => {
    const rate = exchangeRates[toCurrency];
    if (!rate) {
      console.warn(`⚠️ Exchange rate for ${toCurrency} is not available`);
      return 0;
    }
    const result = amountInAED * rate;
    console.log(
      `💱 Converted ${amountInAED} AED to ${result} ${toCurrency} (Rate: ${rate})`
    );
    return result;
  };
  return (
    <CurrencyContext.Provider
      value={{
        currencyOptions,
        toCurrency,
        setToCurrency,
        convertFromAED,
        exchangeRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
