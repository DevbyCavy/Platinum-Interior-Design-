import { Tv, CookingPot, BedDouble, UtensilsCrossed, Clapperboard, PaintRoller, LampCeiling, Sparkles } from 'lucide-react';

/** Icon component for each service's "icon" name in services.json. */
export const SERVICE_ICONS = { Tv, CookingPot, BedDouble, UtensilsCrossed, Clapperboard, PaintRoller, LampCeiling, Sparkles };
export const serviceIcon = (name) => SERVICE_ICONS[name] || Sparkles;
