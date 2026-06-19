export type VehicleType = "car" | "moto";

export type Profile = {
  name: string;
  photo: string | null; // data URL
  vehicle: string;
  plate: string;
  vehicleType: VehicleType;
};

export const DEFAULT_PROFILE: Profile = {
  name: "EDUARDO",
  photo: null,
  vehicle: "Yamaha YBR110",
  plate: "TUC5I23",
  vehicleType: "moto",
};

const KEY = "driver-profile";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    /* ignora */
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(p: Profile) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignora (quota/privado) */
  }
}
