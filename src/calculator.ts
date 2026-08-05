export interface PrinterPreset {
  name: string;
  brand: string;
  wattage: number;
  cost: number;
  lifespanHours: number;
  affiliateLink?: string;
}

export const PRINTER_PRESETS: Record<string, PrinterPreset> = {
  // Bambu Lab
  bambu_x1c: { name: 'Bambu Lab X1-Carbon (350W)', brand: 'Bambu Lab', wattage: 350, cost: 1200, lifespanHours: 5000, affiliateLink: 'https://www.amazon.co.uk/s?k=bambu+lab+x1+carbon+accessories&tag=nichetools-21' },
  bambu_p1p: { name: 'Bambu Lab P1P (350W)', brand: 'Bambu Lab', wattage: 350, cost: 600, lifespanHours: 5000, affiliateLink: 'https://www.amazon.co.uk/s?k=bambu+lab+p1p+accessories&tag=nichetools-21' },
  bambu_p1s: { name: 'Bambu Lab P1S (350W)', brand: 'Bambu Lab', wattage: 350, cost: 700, lifespanHours: 5000, affiliateLink: 'https://www.amazon.co.uk/s?k=bambu+lab+p1s+accessories&tag=nichetools-21' },
  bambu_a1: { name: 'Bambu Lab A1 (150W)', brand: 'Bambu Lab', wattage: 150, cost: 400, lifespanHours: 4000, affiliateLink: 'https://www.amazon.co.uk/s?k=bambu+lab+a1&tag=nichetools-21' },
  bambu_a1_mini: { name: 'Bambu Lab A1 Mini (120W)', brand: 'Bambu Lab', wattage: 120, cost: 300, lifespanHours: 4000, affiliateLink: 'https://www.amazon.co.uk/s?k=bambu+lab+a1+mini&tag=nichetools-21' },
  
  // Creality
  ender_3_v2: { name: 'Creality Ender 3 V2 / Neo (150W)', brand: 'Creality', wattage: 150, cost: 200, lifespanHours: 3000, affiliateLink: 'https://www.amazon.co.uk/s?k=creality+ender+3+v2&tag=nichetools-21' },
  ender_3_v3: { name: 'Creality Ender 3 V3 SE / KE (200W)', brand: 'Creality', wattage: 200, cost: 250, lifespanHours: 3500, affiliateLink: 'https://www.amazon.co.uk/s?k=creality+ender+3+v3+ke&tag=nichetools-21' },
  creality_k1: { name: 'Creality K1 / K1 Max (350W)', brand: 'Creality', wattage: 350, cost: 600, lifespanHours: 4000, affiliateLink: 'https://www.amazon.co.uk/s?k=creality+k1+max&tag=nichetools-21' },
  cr_10: { name: 'Creality CR-10 Smart / Max (350W)', brand: 'Creality', wattage: 350, cost: 500, lifespanHours: 3500, affiliateLink: 'https://www.amazon.co.uk/s?k=creality+cr-10&tag=nichetools-21' },

  // Prusa
  prusa_mk4: { name: 'Prusa MK4S (200W)', brand: 'Prusa', wattage: 200, cost: 900, lifespanHours: 6000, affiliateLink: 'https://www.amazon.co.uk/s?k=prusa+mk4+accessories&tag=nichetools-21' },
  prusa_mini: { name: 'Prusa MINI+ (120W)', brand: 'Prusa', wattage: 120, cost: 450, lifespanHours: 5000, affiliateLink: 'https://www.amazon.co.uk/s?k=prusa+mini+accessories&tag=nichetools-21' },
  prusa_xl: { name: 'Prusa XL (350W)', brand: 'Prusa', wattage: 350, cost: 2000, lifespanHours: 8000, affiliateLink: 'https://www.amazon.co.uk/s?k=prusa+xl+accessories&tag=nichetools-21' },

  // Elegoo
  neptune_4: { name: 'Elegoo Neptune 4 / Pro (300W)', brand: 'Elegoo', wattage: 300, cost: 280, lifespanHours: 3500, affiliateLink: 'https://www.amazon.co.uk/s?k=elegoo+neptune+4+pro&tag=nichetools-21' },
  neptune_4_max: { name: 'Elegoo Neptune 4 Max (450W)', brand: 'Elegoo', wattage: 450, cost: 470, lifespanHours: 3500, affiliateLink: 'https://www.amazon.co.uk/s?k=elegoo+neptune+4+max&tag=nichetools-21' },
  saturn_3: { name: 'Elegoo Saturn 3 Ultra Resin (100W)', brand: 'Elegoo', wattage: 100, cost: 400, lifespanHours: 2500, affiliateLink: 'https://www.amazon.co.uk/s?k=elegoo+saturn+3+ultra&tag=nichetools-21' },
  mars_4: { name: 'Elegoo Mars 4 DLP / Ultra (60W)', brand: 'Elegoo', wattage: 60, cost: 250, lifespanHours: 2500, affiliateLink: 'https://www.amazon.co.uk/s?k=elegoo+mars+4+ultra&tag=nichetools-21' },

  // Anycubic
  kobra_2: { name: 'Anycubic Kobra 2 Pro / Max (300W)', brand: 'Anycubic', wattage: 300, cost: 300, lifespanHours: 3500, affiliateLink: 'https://www.amazon.co.uk/s?k=anycubic+kobra+2+pro&tag=nichetools-21' },
  photon_mono: { name: 'Anycubic Photon Mono M5s Resin (70W)', brand: 'Anycubic', wattage: 70, cost: 350, lifespanHours: 2500, affiliateLink: 'https://www.amazon.co.uk/s?k=anycubic+photon+mono+m5s&tag=nichetools-21' },

  // Qidi / Sovol / Voron / Flashforge
  qidi_plus4: { name: 'Qidi Tech Plus4 (400W)', brand: 'Qidi', wattage: 400, cost: 800, lifespanHours: 4500, affiliateLink: 'https://www.amazon.co.uk/s?k=qidi+tech+plus4&tag=nichetools-21' },
  sovol_sv06: { name: 'Sovol SV06 / Plus (240W)', brand: 'Sovol', wattage: 240, cost: 260, lifespanHours: 3000, affiliateLink: 'https://www.amazon.co.uk/s?k=sovol+sv06+plus&tag=nichetools-21' },
  voron_2_4: { name: 'Voron 2.4 / Trident Custom (500W)', brand: 'Voron', wattage: 500, cost: 1500, lifespanHours: 8000 },
  flashforge_5m: { name: 'Flashforge Adventurer 5M (350W)', brand: 'Flashforge', wattage: 350, cost: 380, lifespanHours: 4000, affiliateLink: 'https://www.amazon.co.uk/s?k=flashforge+adventurer+5m&tag=nichetools-21' },

  custom: { name: 'Custom Printer (Manual Input)', brand: 'Custom', wattage: 200, cost: 500, lifespanHours: 4000 },
};

export const ELECTRICITY_PRESETS: Record<string, { name: string; rate: number }> = {
  uk_avg: { name: 'UK Average (£0.28 / kWh)', rate: 0.28 },
  us_avg: { name: 'US Average ($0.16 / kWh)', rate: 0.16 },
  eu_avg: { name: 'EU Average (€0.30 / kWh)', rate: 0.30 },
  ca_avg: { name: 'Canada Average ($0.13 / kWh)', rate: 0.13 },
  au_avg: { name: 'Australia Average ($0.30 / kWh)', rate: 0.30 },
  custom: { name: 'Custom Rate (Manual Input)', rate: 0.20 },
};

export const FILAMENT_PRESETS: Record<string, { name: string; price: number; weight: number }> = {
  pla_budget: { name: 'Budget PLA (Sunlu/eSUN) (£15 / kg)', price: 15, weight: 1000 },
  pla_standard: { name: 'Standard PLA (£20 / kg)', price: 20, weight: 1000 },
  pla_premium: { name: 'Premium PLA (Bambu/Prusament) (£28 / kg)', price: 28, weight: 1000 },
  petg_standard: { name: 'Standard PETG (£24 / kg)', price: 24, weight: 1000 },
  abs_standard: { name: 'ABS / ASA (£26 / kg)', price: 26, weight: 1000 },
  tpu_flex: { name: 'Flexible TPU 95A (£35 / kg)', price: 35, weight: 1000 },
  nylon_cf: { name: 'Carbon Fiber Nylon (PA-CF) (£75 / 500g)', price: 150, weight: 1000 },
  resin_standard: { name: 'Standard Resin (£28 / 1L)', price: 28, weight: 1000 },
  resin_abs_like: { name: 'Tough ABS-Like Resin (£38 / 1L)', price: 38, weight: 1000 },
  custom: { name: 'Custom Filament (Manual Input)', price: 20, weight: 1000 },
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  CAD: 'CA$',
  AUD: 'A$',
};

export interface PrintCostInputs {
  mode: 'personal' | 'commercial' | 'batch';
  currency: string;
  printerKey: string;
  electricityKey: string;
  filamentKey: string;
  filamentPrice: number;
  spoolWeight: number;
  printWeight: number;
  printHours: number;
  printMinutes: number;
  powerWattage: number;
  electricityRate: number;
  machineCost: number;
  lifespanHours: number;
  packagingCost: number;
  extraCosts: number;
  labourRate: number;
  labourHours: number;
  batchQuantity: number;
  batchDiscount: number; // % volume discount on batch (e.g. 10%)
  vatRate: number;
  failureRate: number;
  markup: number;
}

export interface PrintCostOutputs {
  materialCost: number;
  electricityCost: number;
  depreciationCost: number;
  labourCost: number;
  packagingCost: number;
  extraCosts: number;
  failureContingency: number;
  unitBaseCost: number;
  totalBatchBaseCost: number;
  profitMargin: number;
  batchDiscountAmount: number;
  vatAmount: number;
  unitCost: number;
  totalCost: number;
}

export function calculatePrintCost(inputs: PrintCostInputs): PrintCostOutputs {
  const costPerGram = inputs.filamentPrice / (inputs.spoolWeight || 1000);
  const materialCost = costPerGram * inputs.printWeight;

  const totalHours = inputs.printHours + inputs.printMinutes / 60;
  const powerKW = inputs.powerWattage / 1000;
  const electricityCost = powerKW * totalHours * inputs.electricityRate;

  const hourlyDepreciation = inputs.machineCost / (inputs.lifespanHours || 4000);
  const depreciationCost = hourlyDepreciation * totalHours;

  const packagingCost = inputs.mode === 'personal' ? 0 : (inputs.packagingCost || 0);
  const extraCosts = inputs.extraCosts || 0;
  const labourCost = inputs.mode === 'personal' ? 0 : (inputs.labourRate || 0) * (inputs.labourHours || 0);

  const failureRateUsed = inputs.mode === 'personal' ? 0 : inputs.failureRate;
  const failureMultiplier = failureRateUsed / 100;
  const failureContingency = (materialCost + electricityCost + depreciationCost + packagingCost + extraCosts + labourCost) * failureMultiplier;

  const unitBaseCost = materialCost + electricityCost + depreciationCost + packagingCost + extraCosts + labourCost + failureContingency;
  
  const quantity = inputs.mode === 'batch' ? Math.max(1, inputs.batchQuantity || 1) : 1;
  
  // Fixed setup amortization (1 box of packaging & setup time shared across batch)
  const totalBatchBaseCost = unitBaseCost * quantity;

  const markupUsed = inputs.mode === 'personal' ? 0 : inputs.markup;
  const markupMultiplier = markupUsed / 100;
  const profitMargin = totalBatchBaseCost * markupMultiplier;
  
  const rawSubtotal = totalBatchBaseCost + profitMargin;

  // Batch Volume Discount (e.g. 10% off for bulk)
  const discountRateUsed = inputs.mode === 'batch' ? (inputs.batchDiscount || 0) : 0;
  const batchDiscountAmount = rawSubtotal * (discountRateUsed / 100);
  const discountedSubtotal = rawSubtotal - batchDiscountAmount;

  const vatRateUsed = inputs.mode === 'personal' ? 0 : (inputs.vatRate || 0);
  const vatAmount = discountedSubtotal * (vatRateUsed / 100);

  const totalCost = discountedSubtotal + vatAmount;
  const unitCost = totalCost / quantity;

  return {
    materialCost,
    electricityCost,
    depreciationCost,
    labourCost,
    packagingCost,
    extraCosts,
    failureContingency,
    unitBaseCost,
    totalBatchBaseCost,
    profitMargin,
    batchDiscountAmount,
    vatAmount,
    unitCost,
    totalCost,
  };
}
