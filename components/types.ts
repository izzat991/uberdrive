export type DriverStatus = "offline" | "loading" | "online";

// Bottom sheet snap positions, expressed as the sheet's translateY from the
// bottom of the screen. "closed" = small peek, "mid" = partial, "open" = tall.
export type SnapPoint = "closed" | "mid" | "open";
