'use strict';

const PLACEHOLDER_PREFIX = 'MATHJAXPLACEHOLDER';

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function placeholder(index) {
  return `@@${PLACEHOLDER_PREFIX}${index}@@`;
}

function restoreFormula(formula) {
  const isDisplay = formula.startsWith('$$');
  const className = isDisplay ? 'mathjax-formula mathjax-display' : 'mathjax-formula';
  const content = isDisplay ? `\\[${formula.slice(2, -2)}\\]` : formula;
  return `<span class="${className}">${escapeHtml(content)}</span>`;
}

hexo.extend.filter.register('before_post_render', function preserveMath(data) {
  if (!data.math || !data.content) return data;

  const formulas = [];

  data.content = data.content.replace(/\$\$([\s\S]+?)\$\$/g, (match) => {
    const key = placeholder(formulas.length);
    formulas.push(match);
    return key;
  });

  data.content = data.content.replace(/(^|[^\\$])\$([^\n$]+?)\$/g, (match, prefix, body) => {
    const key = placeholder(formulas.length);
    formulas.push(`$${body}$`);
    return `${prefix}${key}`;
  });

  data.mathjaxFormulas = formulas;
  return data;
}, 0);

hexo.extend.filter.register('after_post_render', function restoreMath(data) {
  if (!data.math || !Array.isArray(data.mathjaxFormulas) || !data.content) return data;

  data.mathjaxFormulas.forEach((formula, index) => {
    data.content = data.content.replaceAll(placeholder(index), restoreFormula(formula));
  });

  delete data.mathjaxFormulas;
  return data;
}, 1000);
