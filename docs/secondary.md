# Secondary

The `secondary` section displays additional information below the card name.

It supports simple text, entity states, entity attributes, multiple entities, formatting and multiple rows.

---

## Simple text

```yaml
secondary:
  rows:
    - row:
        - text: "Bojler"
```

---

## Entity state

Display the state of an entity:

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.temperature
          state: true
```

Display the state together with its unit:

```yaml
secondary:
  rows:
    - row:
        - entity: sensor.temperature
          state: true
          unit: true
```

---

## Entity attributes

Attributes can be displayed directly:

```yaml
secondary:
  rows:
    - row:
        - attribute: current_temperature
          decimals: 1
          unit: true
```

This is especially useful with climate entities.

For example:

```yaml
entity: climate.living_room

secondary:
  rows:
    - row:
        - text: "Aktuálna: "
        - attribute: current_temperature
          decimals: 1
          unit: true
```

Result:

```text
Aktuálna: 22.5 °C
```

---

## Multiple items in one row

A row can contain multiple items.

```yaml
secondary:
  rows:
    - row:
        - text: "Teplota: "
          color: green
        - entity: sensor.boiler_temperature
          state: true
          decimals: 1
          unit: true
          color: green
```

---

## Multiple rows

Rows are displayed from top to bottom.

```yaml
secondary:
  rows:

    - row:
        - text: "Teplota: "
        - entity: sensor.boiler_temperature
          state: true
          decimals: 1
          unit: true

    - row:
        - text: "Výkon: "
        - entity: sensor.boiler_power
          state: true
          unit: true

    - row:
        - text: "Spotreba: "
        - entity: sensor.boiler_energy
          state: true
          decimals: 2
          unit: true
```

---

## Different entities in one card

Each item can reference a different entity.

```yaml
entity: input_number.boiler_temperature

secondary:
  rows:

    - row:
        - text: "Aktuálna: "
        - entity: sensor.boiler_temperature
          state: true
          decimals: 1
          unit: true

    - row:
        - text: "Výkon: "
        - entity: sensor.boiler_power
          state: true
          unit: true
```

---

## Formatting

Each entity or text item can be formatted independently.

### Decimal places

```yaml
decimals: 1
```

Example:

```text
22.5
```

---

### Units

```yaml
unit: true
```

The unit is taken from the entity.

For climate entities, the temperature unit is taken from the climate entity configuration.

---

### Color

```yaml
color: green
```

Example:

```yaml
- entity: sensor.temperature
  state: true
  color: green
```

Text items can also be styled:

```yaml
- text: "Teplota: "
  color: green
```

---

### Font size

```yaml
size: 14px
```

---

### Font weight

```yaml
weight: 700
```

---

## Complete example

```yaml
type: custom:dd-entity-card

entity: input_number.nastavena_teplota_bojlera

name:
  value: Bojler doma

secondary:
  rows:

    - row:
        - text: "Teplota: "
          color: green
        - entity: sensor.teplota_bojler
          state: true
          decimals: 1
          unit: true
          color: green

    - row:
        - text: "Spotreba sieť: "
        - entity: sensor.sonoff_100142bd44_power
          state: true
          decimals: 0
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

## Row structure

The basic structure is:

```yaml
secondary:
  rows:
    - row:
        - item
        - item

    - row:
        - item
```

Rows are rendered from top to bottom.

Items inside a row are rendered from left to right.

---

## Supported item properties

| Property | Description |
|---|---|
| `text` | Static text |
| `entity` | Entity to use |
| `state` | Display entity state |
| `attribute` | Display an entity attribute |
| `unit` | Display the entity unit |
| `decimals` | Number of decimal places |
| `color` | Text color |
| `size` | Font size |
| `weight` | Font weight |
