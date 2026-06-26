export function formatIndianPrice(price: number, purpose: 'Buy' | 'Rent'): string {
  if (purpose === 'Rent') {
    // price is represented in Thousands of ₹ for rent (e.g., 25 = ₹25,000/month)
    if (price >= 100) {
      const lakhs = price / 100;
      return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakh/mo`;
    }
    return `₹${price.toLocaleString('en-IN')},000/mo`;
  } else {
    // price is represented in Lakhs for buy (e.g., 45 = ₹45 Lakhs, 120 = ₹1.2 Cr)
    if (price >= 100) {
      const cr = price / 100;
      return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
    }
    return `₹${price} Lakhs`;
  }
}
