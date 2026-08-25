# Configuration

DD Entity Card is configured using YAML.

## Basic configuration

```yaml
type: custom:dd-entity-card

entity: sensor.temperature
```

The `entity` option is required.

---

# Main options

| Option | Required | Description |
|---|:---:|---|
| `type` | ✅ | Must be `custom:dd-entity-card` |
| `entity` | ✅ | Main entity used by the card |
| `icon` | ❌ | Custom icon configuration |
| `name` | ❌ | Card name configuration |
| `secondary` | ❌ | Secondary information |
| `value` | ❌ | Main value configuration |
| `controls` | ❌ | Interactive controls |
| `tap_action` | ❌ | Action executed when the card is tapped |
| `hold_action` | ❌ | Action executed when the card is held |
| `double_tap_action` | ❌ | Action executed on double tap |

---

# Entity

The main entity is configured using `entity`.

```yaml
entity: sensor.temperature
```

The entity is used as the default source for:

- icon
- name
- secondary information
- value
- controls

Individual sections can reference different entities where supported.

---

# Icon

The icon can be specified directly:

```yaml
icon: mdi:water-boiler
```

The icon can also be configured as an object:

```yaml
icon:
  value: mdi:water-boiler
  color: orange
```

---

# Name

A simple name:

```yaml
name: Bojler doma
```

Or using configuration options:

```yaml
name:
  value: Bojler doma
  color: primary
  size: 18px
  weight: 700
```

The `name` can also reference an entity value or attribute where supported by the value resolver.

---

# Secondary

Secondary information is displayed below the name.

```yaml
secondary:
  rows:
    - row:
        - text: "Teplota: "
        - entity: sensor.temperature
          state: true
          decimals: 1
          unit: true
```

See [Secondary](secondary.md) for the complete reference.

---

# Value

The main value is displayed on the right side of the card when no number control is active.

```yaml
value:
  decimals: 1
  unit: true
```

Styling can also be applied:

```yaml
value:
  decimals: 1
  unit: true
  color: orange
  size: 24px
  weight: 700
```

For climate entities, the default value is the target temperature.

---

# Controls

Controls are configured as an array.

```yaml
controls:
  - type: number
    step: 0.5

  - type: switch

  - type: select
```

Supported controls:

- `number`
- `switch`
- `select`

See [Controls](controls.md) for details.

---

# Number control

```yaml
controls:
  - type: number
    step: 0.5
```

The `step` option controls the increment.

For example:

```text
−  22.5  +
```

---

# Switch control

```yaml
controls:
  - type: switch
```

A different switch entity can be specified:

```yaml
controls:
  - type: switch
    entity: switch.boiler
```

---

# Climate select

```yaml
controls:
  - type: select
```

The available HVAC modes are automatically read from the climate entity.

A different climate entity can be specified:

```yaml
controls:
  - type: select
    entity: climate.bedroom
```

---

# Tap action

By default, tapping the card opens the main entity's more-info dialog.

```yaml
tap_action:
  action: more-info
```

A different entity can be opened:

```yaml
tap_action:
  action: more-info
  entity: sensor.temperature
```

For example, a boiler can use an `input_number` as its main entity while opening the actual temperature sensor:

```yaml
entity: input_number.nastavena_teplota_bojlera

tap_action:
  action: more-info
  entity: sensor.teplota_bojler
```

See [Actions](actions.md) for more information.

---

# Hold and double tap

```yaml
hold_action:
  action: more-info

double_tap_action:
  action: none
```

---

# Complete example

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

icon:
  value: mdi:water-boiler
  color: orange

name:
  value: Bojler doma
  weight: 700

secondary:
  rows:

    - row:
        - text: "Teplota: "
          color: secondary

        - entity: sensor.teplota_bojler
          state: true
          decimals: 1
          unit: true
          color: green

    - row:
        - text: "Spotreba sieť: "

        - entity: sensor.sonoff_100142bd44_power
          state: true
          unit: true

value:
  decimals: 1
  unit: true

controls:
  - type: number
    step: 0.5

  - type: switch
    entity: switch.sonoff_100142bd44

tap_action:
  action: more-info
  entity: sensor.teplota_bojler
```

---

# Configuration structure

A typical configuration looks like this:

```yaml
type: custom:dd-entity-card

entity: sensor.example

icon:
  value: mdi:thermometer
  color: primary

name:
  value: Temperature
  color: primary

secondary:
  rows:
    - row:
        - text: "Outside: "
        - entity: sensor.outside_temperature
          state: true
          unit: true

value:
  decimals: 1
  unit: true

controls:
  - type: number
    step: 0.5

tap_action:
  action: more-info
```

---

# Related documentation

- [Controls](controls.md)
- [Secondary](secondary.md)
- [Styling](styling.md)
- [Actions](actions.md)
- [Examples](examples.md)
