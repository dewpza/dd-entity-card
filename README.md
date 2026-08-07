# DD Entity Card

A modern, highly configurable Home Assistant Lovelace card focused on compact entity control.

## Features

- ✅ Native Home Assistant look
- ✅ Number controls (+ / -)
- ✅ Switch control
- ✅ Climate mode selection
- ✅ Multiple secondary rows
- ✅ Entity references
- ✅ Colors
- ✅ Units
- ✅ Icons
- ✅ More Info support

---

## Installation

### HACS

1. Add this repository as a custom frontend repository.
2. Install **DD Entity Card**.
3. Restart Home Assistant.
4. Add the resource if it wasn't added automatically.

### Manual

Copy

```
dd-entity-card.js
```

to

```
config/www/
```

and add:

```yaml
resources:
  - url: /local/dd-entity-card.js
    type: module
```

---

# Basic example

```yaml
type: custom:dd-entity-card

entity: sensor.temperature
```

---

# Climate example

```yaml
type: custom:dd-entity-card

entity: climate.living_room

name:
  value: Living room

controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

---

# Boiler example

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

icon: mdi:water-boiler

name:
  value: Boiler

secondary:
  rows:

    - row:
        - text: "Temperature: "
        - entity: sensor.teplota_bojler
          unit: true
          color: green

    - row:
        - text: "Power: "
        - entity: sensor.sonoff_power
          unit: true

controls:

  - type: number
    step: 0.5

  - type: switch
    entity: switch.boiler
```

---

# Roadmap

- Climate icons
- Fan modes
- Preset modes
- Cover controls
- Better styling
- Localization

---

# License

MIT
