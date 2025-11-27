export function formatCurrency(value?: number) {
  return "Rp." + (value || 0).toLocaleString("id-ID");
}
