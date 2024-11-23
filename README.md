# Опис предметної області та архітектури бази даних

### Предметна область

Предметна область пов’язана з університетом і має доволі складні зв’язки між сутностями. Детальніше переглянути ER-модель можна за [цим посиланням](https://dbdiagram.io/d/University-66ed66e1a0828f8aa682acc8).

---

### Чи потрібне розподілення між SQL та NoSQL базами даних?

Більшість сутностей тісно взаємопов’язані, що може створювати труднощі під час їхнього розподілу. Водночас є блоки, які можна вважати відносно незалежними, наприклад:

- **Блок "Бібліотеки"**  
  ![Блок "Бібліотеки"](https://github.com/user-attachments/assets/aba09864-ee31-48c2-a97f-89ddec678b47)
  
- **Блок із розкладом**  
  ![Блок із розкладом](https://github.com/user-attachments/assets/31ac4544-1af0-4abb-bd2e-7d611fbc111c)

---

### Мотиви для розподілення

Відокремлення сутностей може бути зумовлене створенням онлайн-платформи для студентів, де інформація розподілена за тематичними розділами або вкладками, наприклад:
- "Розклад"
- "Успішність"
- "Викладачі"

---

### Впровадження та експерименти

В межах цієї ідеї було вирішено винести частину бази даних, а саме блок **"Feedback"**, у Redis. Це пов’язано з частими запитами до цих даних, тож їх зберігання в кешованій пам’яті дозволяє покращити продуктивність системи.

Для перевірки ефективності такого підходу було створено тестовий кейс з ініціалізацією 1000 випадкових записів. Мета експерименту – порівняти швидкість роботи NoSQL бази Redis із реляційною базою MySQL.

---

### Результати

На основі вимірювань швидкості роботи:  
![Результати](https://github.com/user-attachments/assets/1de7f3ae-e0f3-4495-9747-1648fee72287)

Можна зробити висновок, що винесення частини даних до NoSQL бази має сенс, оскільки це суттєво підвищує швидкодію системи. З ростом кількості сутностей переваги такого підходу лише збільшуватимуться.