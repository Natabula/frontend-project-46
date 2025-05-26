import _ from 'lodash';

const status = {
    added: '+',
    deleted: '-',
    unchanged: ' ',
    nested: ' ',
};
// отступы
const getIndent = (depth, correctSize = 0) => {
    const replacer = '  ';
    const indentSize = depth * 2;
    const currenrIndent = replacer.repeat(indentSize - correctSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    return { currenrIndent, bracketIndent };
};

// скобки
const formatBraces = (lines, depth) => {
    const { bracketIndent } = getIndent(depth);
    return [
        '{',
        ...lines,
        `${bracketIndent}}`,
    ].join('\n');
};

// строковое представление объекта 
const stringify = (value, depth) => {
    if (!_.isObject(value)) {
        return `${value}`;
    }
    const { currenrIndent } = getIndent(depth);
    const lines = Object.entries(value).map(
        ([key, val]) => `${currenrIndent}${key}: ${stringify(val, depth + 1)}`,
    );
    return formatBraces(lines, depth);
};

const stylish = (node, depth = 1) => {
    const result = node.map(({
        key, value, type, value1, children,
    }) => {
        const { currenrIndent } = getIndent(depth, 1);

        switch(type) {
            case 'added':
                return `${currenrIndent}${status.added} ${key}: ${stringify(value, depth + 1)}`;
            case 'deleted':
                return `${currenrIndent}${status.deleted} ${key}: ${stringify(value, depth + 1)}`;
            case 'changed':
                return [
                    `${currenrIndent}${status.deleted} ${key}: ${stringify(value1, depth + 1)}`,
                    `${currenrIndent}${status.added} ${key}: ${stringify(value, depth + 1)}`,
                ].join('\n');
            case 'nested':
                return `${currenrIndent}${status.nested} ${key}: ${stylish(children, depth + 1)}`;
            case 'unchanged':
                return `${currenrIndent}${status.unchanged} ${key}: ${stringify(value, depth + 1)}`;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    });
    return formatBraces(result, depth);
};

export default stylish;

