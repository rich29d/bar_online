exports.formatPrice = (value) => {
  const val = (value / 1).toFixed(2).replace('.', ',');
  const formated = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formated}`;
};
