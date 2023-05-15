# Установка базового образа
FROM node:14

# Создание и установка директории приложения
WORKDIR /app

# Копирование зависимостей приложения
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода приложения
COPY . .

# Определение порта, на котором будет работать приложение
ENV PORT=3000

EXPOSE $PORT

# Команда для запуска приложения
CMD [ "npm", "start" ]