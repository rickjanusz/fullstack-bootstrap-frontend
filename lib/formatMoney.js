export default function formatMoney(amt = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(amt / 100);
}
