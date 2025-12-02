interface CalculateSubtotal {
  price: number;
  qty: number;
  discount?: number;
}

export function formatCurrency(value?: number) {
  return "Rp." + (value || 0).toLocaleString("id-ID");
}

export function calculateSubtotal(props: CalculateSubtotal) {
  const { price, qty, discount } = props;
  return (price - (price * (discount || 0)) / 100) * qty;
}
