
export function toBengaliDigits(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d)])
    .replace(/,/g, ","); // keep comma separator
}


export function formatPriceBn(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return toBengaliDigits(formatted);
}

export function getUnitLabel(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? `প্রতি ${unit}`;
}

export function getBengaliDate(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();

  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];

  return `${toBengaliDigits(day)} ${months[month]}, ${toBengaliDigits(year)}`;
}


export function calcAverage(markets: { min: number; max: number }[]): number {
  if (!markets.length) return 0;
  const total = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0);
  return Math.round(total / markets.length);
}

export function calcMin(markets: { min: number }[]): number {
  return Math.min(...markets.map((m) => m.min));
}


export function calcMax(markets: { max: number }[]): number {
  return Math.max(...markets.map((m) => m.max));
}
