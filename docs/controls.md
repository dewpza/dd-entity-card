# Controls

Controls provide interactive elements for changing or controlling an entity.

Supported controls:

- `number`
- `switch`
- `select`

Controls are defined using the `controls` section.

---

## Number

The `number` control displays minus and plus buttons.

```yaml
controls:
  - type: number
```

The control can be used with `input_number` entities and climate entities.

### Step

Use `step` to define the increment.

```yaml
controls:
  - type: number
    step: 0.5
```

For example:

```text
−   22.5   +
```

For climate entities, the control changes the target temperature.

For `input_number` entities, the control changes the input number value.

---

## Switch

The `switch` control displays a power button.

```yaml
controls:
  - type: switch
```

The main card entity is used by default.

A different entity can be specified:

```yaml
controls:
  - type: switch
    entity: switch.boiler
```

This is useful when the main entity is used for displaying information or setting a value, while a separate switch controls the power.

Example:

```yaml
entity: input_number.nastavena_teplota_bojlera

controls:
  - type: number
    step: 0.5

  - type: switch
    entity: switch.sonoff_100142bd44
```

---

## Select

The `select` control is currently used for climate HVAC modes.

```yaml
controls:
  - type: select
```

The available modes are automatically read from the climate entity.

Supported HVAC modes include:

- `auto`
- `cool`
- `dry`
- `fan_only`
- `heat`
- `off`

Each mode is displayed using an icon.

Example:

```yaml
entity: climate.living_room

controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

The currently active mode is highlighted.

---

## Climate mode icons

The following icons are currently used:

| HVAC mode | Icon |
|---|---|
| `off` | `mdi:power` |
| `heat` | `mdi:fire` |
| `cool` | `mdi:snowflake` |
| `dry` | `mdi:water-percent` |
| `fan_only` | `mdi:fan` |
| `auto` | `mdi:autorenew` |

---

## Select with another entity

A different climate entity can be specified:

```yaml
controls:
  - type: select
    entity: climate.bedroom
```

This allows the main card entity and the controlled climate entity to be different.

---

## Multiple controls

Multiple controls can be combined.

```yaml
controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

The controls are rendered in the order in which they are defined.

---

## Complete climate example

```yaml
type: custom:dd-entity-card

entity: climate.living_room

name:
  value: Obývačka

secondary:
  rows:
    - row:
        - text: "Aktuálna: "
        - attribute: current_temperature
          decimals: 1
          unit: true

value:
  decimals: 1
  unit: true

controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

This provides:

- target temperature adjustment
- power control
- HVAC mode selection
- current temperature display

---

## Boiler example

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

name:
  value: Bojler doma

secondary:
  rows:
    - row:
        - text: "Teplota: "
        - entity: sensor.teplota_bojler
          state: true
          decimals: 1
          unit: true

controls:
  - type: number
    step: 0.5

  - type: switch
    entity: switch.sonoff_100142bd44
```

The number control changes the target temperature while the switch controls the boiler.

---

## Notes

- Controls have their own click handling.
- Clicking a control does not trigger the card `tap_action`.
- `number` uses the entity's limits when available.
- `step` can be used to define the temperature or number increment.
- `switch` can control a different entity.
- `select` reads the available HVAC modes directly from the climate entity.
