const { options } = require('./mycli.js');
const fs = require('fs');
const path = require('path');

//console.log(process.argv);
//console.log(options);

// Перевірка обов'язкового параметру
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// Перевірка існування файлу
if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

try {
    // Читання файлу як JSON Lines
    const fileContent = fs.readFileSync(options.input, 'utf8');
    //console.log(fileContent);
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    // Парсинг кожного рядка як JSON об'єкта
    const data = lines.map(line => {
        try {
            return JSON.parse(line);
        } catch (parseError) {
            console.error('Помилка парсингу рядка:', line);
            return null;
        }
    }).filter(item => item !== null);

    console.log(`Завантажено ${data.length} записів`);

    // Фільтрація даних
    let filteredData = data;
    
    if (options.furnished) {
        filteredData = filteredData.filter(house => house.furnishingstatus === 'furnished');
        console.log(`Знайдено ${filteredData.length} мебльованих будинків`);
    }
    
    if (options.price) {
        const maxPrice = parseFloat(options.price);
        filteredData = filteredData.filter(house => parseFloat(house.price) < maxPrice);
        console.log(`Знайдено ${filteredData.length} будинків дешевше ${options.price}`);
    }
    
    // Форматування результату (ціна та площа)
    const result = filteredData.map(house => `${house.price} ${house.area}`).join('\n');
    
    // Вивід результатів
    if (options.display) {
        console.log('\n=== РЕЗУЛЬТАТ ===');
        console.log(result);
        console.log(`\nВсього записів: ${filteredData.length}`);
    }
    
    if (options.output) {
        fs.writeFileSync(options.output, result);
        console.log(`Результат записано у файл: ${options.output}`);
    }
    
    // Якщо нічого не вказано - нічого не виводимо
    if (!options.display && !options.output) {
        // Нічого не робимо
    }
    
} catch (error) {
    console.error('Помилка обробки файлу:', error.message);
    process.exit(1);
}