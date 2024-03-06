### Opis aplikacji:
Twoim zadaniem jest stworzenie prostego serwisu pogodowego, który wykorzystuje publiczne API pogodowe (np. OpenWeatherMap). Aplikacja powinna umożliwiać użytkownikowi wprowadzenie nazwy miasta lub automatycznie wykryć jego lokalizację, aby uzyskać informacje o aktualnej pogodzie w tym miejscu. Dodatkowo, aplikacja powinna przedstawiać ikony z odpowiednimi symbolami pogody oraz być zbudowana przy użyciu biblioteki Tailwind CSS.

### Wymagania funkcjonalne:
1. Interfejs użytkownika powinien zawierać pole tekstowe, w którym użytkownik może wpisać nazwę miasta lub przycisk do automatycznego wykrywania lokalizacji.
2. Użytkownik powinien mieć możliwość wyszukiwania pogody dla różnych miast lub automatycznego wykrycia swojej lokalizacji.
3. Po wprowadzeniu nazwy miasta lub automatycznym wykryciu lokalizacji, aplikacja powinna pobierać dane o aktualnej pogodzie dla tego miejsca z zewnętrznego API.
4. Dane o pogodzie (np. temperatura, wilgotność, prędkość wiatru, opady) powinny być czytelnie prezentowane na interfejsie użytkownika, wraz z odpowiednimi ikonami pogody.
5. W przypadku błędnej nazwy miasta, braku danych lub problemów z automatycznym wykryciem lokalizacji, aplikacja powinna wyświetlić stosowną informację użytkownikowi.

### Wymagania techniczne:
1. Wykorzystaj bibliotekę React do budowy interfejsu użytkownika.
2. Użyj odpowiednich metod do komunikacji z publicznym API pogodowym (np. Fetch API lub biblioteka Axios).
3. Aby automatycznie wykryć lokalizację użytkownika, skorzystaj z Geolokalizacji przeglądarki.
4. Wykorzystaj bibliotekę Tailwind CSS do stylizacji interfejsu użytkownika. Dostosuj style, aby aplikacja była estetyczna i przyjazna dla użytkownika.

### Dodatkowe uwagi:
- Zapewnij obsługę różnych błędów, takich jak brak połączenia z internetem, brak danych dla wprowadzonego miasta itp.
- Pamiętaj o dostosowaniu interfejsu, aby był czytelny i łatwy w obsłudze, zwłaszcza na urządzeniach mobilnych.
- Zadbaj o optymalizację aplikacji, aby działała sprawnie i responsywnie na różnych urządzeniach.
