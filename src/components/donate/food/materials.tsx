import { VarenykDefs } from "../../art/Varenyk.tsx";

/* Every material the plate is made of, in one place: what a lit surface, a
   browned one, a shaded one and a wet one are made of here. The postcard
   rasterizes this same tableau, so all of it has to live in the markup. */
export function FoodMaterials() {
  return (
    <defs>
      <radialGradient id="reserved-glow" cx="50%" cy="68%" r="60%">
        <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.6" />
        <stop offset="45%" stopColor="#e8a94e" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
      </radialGradient>
      {/* The lit surface of anything baked, carried all the way down into
        syrup: without that last stop the food has no dark and reads as
        soap rather than as something out of a pan. */}
      <linearGradient id="vd-food" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
        <stop offset="22%" style={{ stopColor: "var(--gold-light)" }} />
        <stop offset="56%" style={{ stopColor: "var(--tungsten)" }} />
        <stop offset="82%" style={{ stopColor: "var(--toast)" }} />
        <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
      </linearGradient>
      {/* Browning is warm. Laid over a pale base, toast-deep alone turns
        olive and the food looks spoiled instead of cooked. */}
      <radialGradient id="vd-sear" cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          style={{ stopColor: "var(--syrup)" }}
          stopOpacity="0.6"
        />
        <stop
          offset="55%"
          style={{ stopColor: "var(--toast)" }}
          stopOpacity="0.32"
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--toast)" }}
          stopOpacity="0"
        />
      </radialGradient>
      {/* Broth: lit where it meets the far wall, deep against the near one. */}
      <linearGradient id="vd-broth" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
        <stop offset="35%" style={{ stopColor: "var(--tungsten)" }} />
        <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
      </linearGradient>
      <linearGradient id="vd-core" x1="0.12" y1="0" x2="0.72" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--ink)" }} stopOpacity="0" />
        <stop
          offset="42%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0.05"
        />
        <stop
          offset="76%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0.26"
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0.5"
        />
      </linearGradient>
      <radialGradient id="vd-contact" cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0.8"
        />
        <stop
          offset="62%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0.42"
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--ink)" }}
          stopOpacity="0"
        />
      </radialGradient>
      {/* Dark in the well, warm where the fixture catches the rim, and rolled
        back down at the very edge. Dark ceramic, not a hole in the table. */}
      <radialGradient id="vd-plate" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "var(--ink)" }} />
        <stop offset="38%" style={{ stopColor: "var(--syrup)" }} />
        <stop offset="88%" style={{ stopColor: "var(--toast-deep)" }} />
        <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
      </radialGradient>
      {/* Warm where it leaves the food, gone by the top. */}
      <linearGradient id="vd-steam" x1="0" y1="1" x2="0" y2="0">
        <stop
          offset="0%"
          style={{ stopColor: "var(--gold-light)" }}
          stopOpacity="0.32"
        />
        <stop
          offset="55%"
          style={{ stopColor: "var(--plaster)" }}
          stopOpacity="0.14"
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--plaster)" }}
          stopOpacity="0"
        />
      </linearGradient>
      <VarenykDefs id="vd" />
    </defs>
  );
}
