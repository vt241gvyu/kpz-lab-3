// Для порівняння пам'яті у Flyweight можна також запускати так:
// node --expose-gc main.js

const { runAdapterDemo } = require('./task1_adapter');
const { runDecoratorDemo } = require('./task2_decorator');
const { runBridgeDemo } = require('./task3_bridge');
const { runProxyDemo } = require('./task4_proxy');
const { runCompositeDemo } = require('./task5_composite');
const { runFlyweightDemo } = require('./task6_flyweight');

function printTaskTitle(number, name) {
    console.log('\n==============================');
    console.log('Завдання ' + number + ': ' + name);
    console.log('==============================');
}

console.log('Лабораторна робота 3. Структурні шаблони проєктування');
console.log('Студент: Герасимчук Владислав');
console.log('Група: ВТ-24-1, підгрупа: 1, варіант: 7');

printTaskTitle(1, 'Адаптер');
runAdapterDemo();

printTaskTitle(2, 'Декоратор');
runDecoratorDemo();

printTaskTitle(3, 'Міст');
runBridgeDemo();

printTaskTitle(4, 'Проксі');
runProxyDemo();

printTaskTitle(5, 'Компонувальник');
runCompositeDemo();

printTaskTitle(6, 'Легковаговик');
runFlyweightDemo();
