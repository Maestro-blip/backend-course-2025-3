const { program } = require('commander');

program
    .name('house-price-analyzer')
    .description('Аналіз цін на нерухомість')
    .version('1.0.0');

program
    .option('-i, --input [path]', 'шлях до вхідного JSON файлу')
    .option('-o, --output [path]', 'шлях для вихідного файлу')
    .option('-d, --display', 'вивести результат у консоль')
    .option('-f, --furnished', 'відображати лише будинки з меблями')
    .option('-p, --price <number>', 'відображати лише будинки з ціною меншою за зазначену');

program.parse();

const options = program.opts();

module.exports = {
    program,
    options
};